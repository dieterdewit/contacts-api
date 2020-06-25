import { Router } from 'express';
import {addPhone, getPhones} from "../controllers/phone.controller";

const router = Router();

router.route('/:id')
    .post(addPhone)
    .get(getPhones)

export default router;