import { Router } from 'express';
import { sign_s3 } from "../controllers/image.controller";

const router = Router();

router.route('/')
    .post(sign_s3)

export default router;