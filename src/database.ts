import { createPool } from 'mysql2/promise';
import "reflect-metadata";

export async function connect() {

    return createPool({
        host: process.env.DB_HOST_CONTACTS,
        user: process.env.DB_USER_CONTACTS,
        password: process.env.DB_PASSWORD_CONTACTS,
        database: 'contacts_management',
        connectionLimit: 50
    });
}