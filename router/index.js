import { Router } from "express";
import userRouter from "./user.route.js"
import taskRouter from "./task.route.js";
import employeeRouter from "./employee.route.js";

const router = Router();

router.use('/userApi',userRouter);
router.use('/', taskRouter);
router.use('/', employeeRouter);

export default router;