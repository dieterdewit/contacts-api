import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { connect } from "../database";
import bcrypt from "bcryptjs";

export async function register(req: Request, res: Response) {
    const conn = await connect();

    try {
        const username = req.body.username;
        const password = req.body.password;

        if (username == ''){
            return res.json({
                message: "Incomplete or Duplicated Fields",
                status: 400
            })
        }
        else if (password == ''){
            return res.json({
                message: "Incomplete or Duplicated Fields",
                status: 400
            })
        }

        const salt = await bcrypt.genSalt(10);
        const epass = await bcrypt.hash(password, salt);

        await conn.query('INSERT INTO users (username, password) VALUES (?,?)', [username, epass]);

        return res.json({
            message: "User Created",
            status: 200
        })
    }
    catch (e) {
        return res.json({
            message: "Incomplete or Duplicated Fields",
            status: 400
        })
    }
}

export async function login(req: Request, res: Response) {
    const conn = await connect();
    const conn2 = await connect();

    let epass = false;
    let token: string;
    let json_user;

    try {
        const username = req.body.username;
        const password = req.body.password;

        const user_id = await conn.query('SELECT user_id FROM users WHERE username = ?', [username]);
        const string_user = JSON.stringify(user_id[0]);
        json_user = JSON.parse(string_user);
        token = jwt.sign({ _id: user_id}, process.env.TOKEN_SECRET_CONTACTS  || 'OnErrorNonSecret', {
            expiresIn: 60 * 60
        });

        const db_pass = await conn2.query('SELECT password FROM users WHERE username = ?', [username]);
        const string_pass = JSON.stringify(db_pass[0]);
        const json_pass = JSON.parse(string_pass);

        epass = await bcrypt.compare(password, json_pass[0].password);
    }
    catch (e) {
        return res.json({
            message: "Username does not Exist",
            status: 400
        })
    }

    if (epass){
        return res.header('token', token).json({
            message: "User Authenticated",
            status: 200,
            token: token,
            userId: json_user[0].user_id
        })
    } else {
        return res.json({
            message: "Password does not match",
            status: 400
        })
    }
}