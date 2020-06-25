import { Router } from 'express';
import { deleteContact, updateContact } from "../controllers/uncontact.controller";

const router = Router();

router.route('/:id')
    .delete(deleteContact)
    .post(updateContact)

export default router;