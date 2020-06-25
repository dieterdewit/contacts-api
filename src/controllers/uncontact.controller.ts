import { Request, Response } from 'express'
import { connect } from "../database";

export async function deleteContact(req: Request, res: Response) {
    const conn = await connect();
    const conn2 = await connect();

    const id = req.params.id;

    await conn.query('DELETE FROM phones WHERE contact_id = ?', [id])
    await conn2.query('DELETE FROM contacts WHERE contact_id = ?', [id])

    return res.json({
        message: "Contact Deleted",
        status: 200
    })
}

export async function updateContact(req: Request, res: Response) {
    const conn = await connect();

    const id = req.params.id;
    const name = req.body.name;

    await conn.query('UPDATE contacts SET full_name = ? WHERE contact_id = ?', [name, id]);

    return res.json({
        message: "Contact Updated"
    })
}