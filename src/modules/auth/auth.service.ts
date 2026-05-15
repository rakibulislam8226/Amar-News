import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserRepository } from '../users/user.repository';

export class AuthService {
    async register(payload: any) {
        const existingUser =
            await UserRepository.findOne({
                where: {
                    email: payload.email,
                },
            });

        if (existingUser) {
            throw new Error('Email already exists');
        }

        const hashedPassword =
            await bcrypt.hash(payload.password, 10);

        const user = UserRepository.create({
            ...payload,
            password: hashedPassword,
        });

        await UserRepository.save(user);

        return user;
    }

    async login(payload: any) {
        const user =
            await UserRepository.findOne({
                where: {
                    email: payload.email,
                },
            });

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isPasswordMatched =
            await bcrypt.compare(
                payload.password,
                user.password,
            );

        if (!isPasswordMatched) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: '7d',
            },
        );

        return {
            accessToken: token,
        };
    }
}