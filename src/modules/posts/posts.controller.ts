import { Response } from 'express';

import { AuthRequest } from '../../middlewares/auth.middleware';
import { PostsService } from './posts.service';

const postsService = new PostsService();

export class PostsController {
    async create(req: AuthRequest, res: Response) {
        try {
            const result = await postsService.create(req.user.userId, req.body);

            return res.status(201).json({
                success: true,
                message: 'Post created successfully.',
                data: result,
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async findAll(req: AuthRequest, res: Response) {
        try {
            const result = await postsService.findAll();

            return res.status(200).json({
                success: true,
                message: 'Posts retrieved successfully.',
                data: result,
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async findOne(req: AuthRequest, res: Response) {
        try {
            const result = await postsService.findOne(req.params.id as string);

            return res.status(200).json({
                success: true,
                message: 'Post retrieved successfully.',
                data: result,
            });
        } catch (error: any) {
            const status = error.message === 'Post not found' ? 404 : 400;

            return res.status(status).json({
                success: false,
                message: error.message,
            });
        }
    }

    async update(req: AuthRequest, res: Response) {
        try {
            const result = await postsService.update(req.params.id as string, req.user.userId, req.body);

            return res.status(200).json({
                success: true,
                message: 'Post updated successfully.',
                data: result,
            });
        } catch (error: any) {
            const status =
                error.message === 'Post not found' ? 404 :
                    error.message.startsWith('Forbidden') ? 403 : 400;

            return res.status(status).json({
                success: false,
                message: error.message,
            });
        }
    }

    async delete(req: AuthRequest, res: Response) {
        try {
            await postsService.delete(req.params.id as string, req.user.userId);

            return res.status(200).json({
                success: true,
                message: 'Post deleted successfully.',
            });
        } catch (error: any) {
            const status =
                error.message === 'Post not found' ? 404 :
                    error.message.startsWith('Forbidden') ? 403 : 400;

            return res.status(status).json({
                success: false,
                message: error.message,
            });
        }
    }
}
