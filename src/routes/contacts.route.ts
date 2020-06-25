import { Router } from 'express';
import { getContacts, addContact } from "../controllers/contacts.controller";

const router = Router();

router.route('/:id')
    .get(getContacts)
    .post(addContact)

export default router;