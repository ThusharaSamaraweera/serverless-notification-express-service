import { Router } from "express";

import emailRouter from "./email.route";

const router = Router();

router.use("/email", emailRouter);

export default router;