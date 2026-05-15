import { PostRepository } from './post.repository';
import { buildMeta, PaginationOptions } from '../../utils/pagination';

export class PostsService {
    async create(userId: string, payload: { title: string; content: string }) {
        const post = PostRepository.create({ ...payload, userId });
        await PostRepository.save(post);
        return post;
    }

    async findAll({ page, limit }: PaginationOptions) {
        const [data, total] = await PostRepository.findAndCount({
            order: { createdAt: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });

        return { data, meta: buildMeta(total, page, limit) };
    }

    async findOne(id: string) {
        const post = await PostRepository.findOne({ where: { id } });

        if (!post) {
            throw new Error('Post not found');
        }

        return post;
    }

    async update(id: string, userId: string, payload: { title?: string; content?: string }) {
        const post = await PostRepository.findOne({ where: { id } });

        if (!post) {
            throw new Error('Post not found');
        }

        if (post.userId !== userId) {
            throw new Error('Forbidden: You can only update your own posts');
        }

        Object.assign(post, payload);
        await PostRepository.save(post);

        return post;
    }

    async delete(id: string, userId: string) {
        const post = await PostRepository.findOne({ where: { id } });

        if (!post) {
            throw new Error('Post not found');
        }

        if (post.userId !== userId) {
            throw new Error('Forbidden: You can only delete your own posts');
        }

        await PostRepository.remove(post);
    }
}
