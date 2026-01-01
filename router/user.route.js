import { Router } from "express";
import { createUser, deleteUser, getAllUser, getUser, login, updateUser, logout, getAllEmployees } from "../controllers/user.controller.js";
import userAuth from "../middlewares/userAuth.middleware.js";
import checkUserRole from "../middlewares/userRole.middleware.js";

const userRouter = Router();

userRouter.post('/',createUser);

userRouter.post('/login',login);

userRouter.get('/logout',logout);

// userRouter.use(userAuth);

userRouter.get('/employees', getAllEmployees);

userRouter.get('/',getAllUser);

userRouter.get('/:id',getUser);

userRouter.patch('/:id',updateUser);

userRouter.delete('/:id',deleteUser);

export default userRouter;