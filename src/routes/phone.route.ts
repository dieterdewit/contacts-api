import { Router } from 'express';
import {addPhone} from "../controllers/phone.controller";

const router = Router();

router.route('/:id')
    .post(addPhone)

export default router;