import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserRepository } from '../users/user.repository';
import { User } from '../users/entities/user.entity';

const ACCESS_TOKEN_EXPIRY = '1d';
const REFRESH_TOKEN_EXPIRY = '7d';

const generateTokens = (userId: string, email: string) => {
    const accessToken = jwt.sign(
        { userId, email },
        process.env.JWT_SECRET as string,
        { expiresIn: ACCESS_TOKEN_EXPIRY },
    );

    const refreshToken = jwt.sign(
        { userId },
        process.env.JWT_REFRESH_SECRET as string,
        { expiresIn: REFRESH_TOKEN_EXPIRY },
    );

    return { accessToken, refreshToken };
};

export class AuthService {
    async register(payload: any) {
        const existingUser =
            await UserRepository.findOne({
                where: { email: payload.email },
            });

        if (existingUser) {
            throw new Error('Email already exists');
        }

        const hashedPassword =
            await bcrypt.hash(payload.password, 10);

        const user = UserRepository.create({
            ...payload,
            password: hashedPassword,
        }) as unknown as User;

        await UserRepository.save(user);

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async login(payload: any) {
        const user = await UserRepository.findOne({
            where: { email: payload.email },
        });

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isPasswordMatched = await bcrypt.compare(
            payload.password,
            user.password,
        );

        if (!isPasswordMatched) {
            throw new Error('Invalid credentials');
        }

        const tokens = generateTokens(user.id, user.email);
        const { password, ...userInfo } = user;

        return { user: userInfo, ...tokens };
    }

    async refresh(token: string) {
        let decoded: any;

        try {
            decoded = jwt.verify(
                token,
                process.env.JWT_REFRESH_SECRET as string,
            );
        } catch {
            throw new Error('Invalid or expired refresh token');
        }

        const user = await UserRepository.findOne({
            where: { id: decoded.userId },
        });

        if (!user) {
            throw new Error('Invalid or expired refresh token');
        }

        return generateTokens(user.id, user.email);
    }
}