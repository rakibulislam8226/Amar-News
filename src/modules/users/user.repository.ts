import { AppDataSource } from '../../database/data-source';
import { User } from '../users/entities/user.entity';

export const UserRepository =
    AppDataSource.getRepository(User);