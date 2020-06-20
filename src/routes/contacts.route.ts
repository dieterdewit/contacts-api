import { Router } from 'express';
import { getContacts, addContact, deleteContact, updateContact } from "../controllers/contacts.controller";

const router = Router();

router.route('/:id')
    .get(getContacts)
    .post(addContact)
    .delete(deleteContact)
    .put(updateContact)

export default router;