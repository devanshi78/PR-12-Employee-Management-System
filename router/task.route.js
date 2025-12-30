import { Router } from "express";
import {
    addTaskPage,
    addTask,
    viewTaskPage,
    deleteTask,
    updateTaskPage,
    updateTask
} from "../controllers/task.controller.js";
import userAuth from "../middlewares/userAuth.middleware.js";
import checkUserRole from "../middlewares/userRole.middleware.js";

const taskRouter = Router();

taskRouter.use(userAuth);

taskRouter.get('/add-task',checkUserRole , addTaskPage);  
taskRouter.post('/add-task',checkUserRole, addTask);     

taskRouter.get('/view-task', viewTaskPage);
taskRouter.get('/delete-task/:id',checkUserRole, deleteTask);
taskRouter.get('/update-task/:id',checkUserRole, updateTaskPage);
taskRouter.post('/update-task/:id',checkUserRole, updateTask);

export default taskRouter;