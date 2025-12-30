import { Router } from "express";
import {
    addEmployeePage,
    addEmployee,
    viewEmployeePage,
    deleteEmployee,
    updateEmployeePage,
    updateEmployee
} from "../controllers/employee.controller.js";
import userAuth from "../middlewares/userAuth.middleware.js";
import checkUserRole from "../middlewares/userRole.middleware.js";

const employeeRouter = Router();

employeeRouter.use(userAuth);

employeeRouter.get("/add-employee",checkUserRole, addEmployeePage);
employeeRouter.post("/add-employee",checkUserRole, addEmployee);

employeeRouter.get("/view-employee",checkUserRole, viewEmployeePage);

employeeRouter.get("/delete/:id",checkUserRole, deleteEmployee);

employeeRouter.get("/update/:id",checkUserRole, updateEmployeePage);
employeeRouter.post("/update/:id",checkUserRole, updateEmployee);

export default employeeRouter;