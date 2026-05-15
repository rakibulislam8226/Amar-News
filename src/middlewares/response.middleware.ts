import { Request, Response, NextFunction } from 'express';

export const responseInterceptor = (
    _req: Request,
    res: Response,
    next: NextFunction,
) => {
    const originalJson = res.json.bind(res);

    res.json = (body: any) => {
        const isSuccess =
            res.statusCode >= 200 && res.statusCode < 400;

        let normalized: {
            success: boolean;
            message: string;
            data: any;
        };

        if (body && typeof body === 'object' && 'success' in body) {
            const { success, message, data, errors, ...rest } = body;

            normalized = {
                success: Boolean(success),
                message: message ?? '',
                data: data !== undefined
                    ? data
                    : errors !== undefined
                        ? { errors }
                        : Object.keys(rest).length > 0
                            ? rest
                            : null,
            };
        } else {
            // Responses without a `success` field (e.g. from auth middleware)
            normalized = {
                success: isSuccess,
                message: body?.message ?? '',
                data: isSuccess ? (body ?? null) : null,
            };
        }

        return originalJson(normalized);
    };

    next();
};
