import type { Request, Response, NextFunction } from 'express';

export const errorHandler = (
    err: Error & { status?: number },
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (err instanceof SyntaxError && err.status === 400) {
        res.status(400).json({ message: 'Invalid JSON format' });
        return;
    }

    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
};