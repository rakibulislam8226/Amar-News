import { Router } from 'express';

import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { PostsController } from './posts.controller';
import { createPostSchema, updatePostSchema } from './posts.validation';

const router = Router();
const postsController = new PostsController();

router.use(authMiddleware);

router.post('/', validate(createPostSchema), postsController.create);
router.get('/', postsController.findAll);
router.get('/:id', postsController.findOne);
router.patch('/:id', validate(updatePostSchema), postsController.update);
router.delete('/:id', postsController.delete);

export default router;
