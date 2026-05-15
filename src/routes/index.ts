import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import postsRoutes from '../modules/posts/posts.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/posts', postsRoutes);

export default router;