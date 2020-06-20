import { Request, Response } from 'express'
import { connect } from "../database";

export async function getContacts(req: Request, res: Response): Promise<Response> {
    const conn = await connect();

    const id = req.params.id;
    const contacts = await conn.query('SELECT * FROM contacts WHERE user_id = ?', [id]);

    return res.json(contacts[0]);
}

export async function addContact(req: Request, res: Response) {
    const conn = await connect();

    try {
        const id = req.params.id;
        const name = req.body.full_name;
        const email = req.body.email;

        await conn.query('INSERT INTO contacts (user_id, full_name, email) VALUES (?,?,?)', [id, name, email]);

        return res.json({
            message: "Contact Created",
            status: 200
        })
    }
    catch (e) {
        return res.json({
            message: "Error",
            status: 200
        })
    }
}

export async function deleteContact(req: Request, res: Response) {
    const conn = await connect();

    const id = req.params.id;
    await conn.query('DELETE FROM contacts WHERE contact_id = ?', [id])

    return res.json({
        message: "Contact Deleted",
        status: 200
    })
}

export async function updateContact(req: Request, res: Response) {
    const conn = await connect();

    const id = req.params.id;
    const update_contact = req.body;
    await conn.query('UPDATE contacts SET ? WHERE contact_id = ?', [update_contact, id]);

    return res.json({
        message: "Contact Updated"
    })
}