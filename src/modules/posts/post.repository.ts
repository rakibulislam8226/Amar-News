import { AppDataSource } from '../../database/data-source';
import { Post } from './entities/posts.entity';

export const PostRepository = AppDataSource.getRepository(Post);
