import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('token');
    if (!token) return res.status(401).json({
        message: 'Access Denied',
        status: 401
    });

    const payload = jwt.verify(token, process.env.TOKEN_SECRET_CONTACTS || 'OnErrorNonSecret');
    console.log(payload);

    next();
}