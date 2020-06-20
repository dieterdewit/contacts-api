import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface IPayload {
    _id: string,
    iat: number,
    exp: number
}


export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('token');
    if (!token) return res.status(401).json({
        message: 'Access Denied',
        status: 401
    });

    const payload = jwt.verify(token, process.env.TOKEN_SECRET_CONTACTS || 'OnErrorNonSecret') as IPayload;

    const translated_payload = payload._id[0][0]
    const json_payload = JSON.stringify(translated_payload);

    req.user_id = JSON.parse(json_payload).user_id;

    next();
}

export const UserValidation = (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.originalUrl;

    const actual_user = user_id.split("/").pop();

    if (actual_user != req.user_id) return res.status(401).json({
        message: 'Access Denied',
        status: 401
    });

    next();
}