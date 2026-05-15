import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate =
    (schema: ZodSchema) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse(req.body);

                next();
            } catch (error: any) {
                const errors = (error.issues ?? error.errors ?? []).map(
                    (issue: any) => ({
                        label: issue.path.join('.'),
                        message: issue.message,
                    }),
                );

                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors,
                });
            }
        };