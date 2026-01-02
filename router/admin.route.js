import { Router } from "express";
import { addEmployeePage, addManager, addManagerPage, changePassword, changePasswordPage, dashboard, deleteManager, login, loginPage, logout, myProfilePage, updateManager, updateManagerPage, viewManagerPage } from "../controllers/admin.controller.js";
import userAuth from "../middlewares/userAuth.middleware.js";
import checkUserRole from "../middlewares/userRole.middleware.js";

const adminRouter = Router();

adminRouter.get('/login',loginPage);
adminRouter.post('/login',login);

adminRouter.get('/logout', logout);

adminRouter.use(userAuth);

adminRouter.get('/',dashboard);

adminRouter.get('/profile', myProfilePage)

adminRouter.get('/add-manager',checkUserRole,addManagerPage);
adminRouter.post('/add-manager',checkUserRole,addManager);
adminRouter.get('/update/:id',checkUserRole,updateManagerPage);
adminRouter.post('/update/:id',checkUserRole,updateManager);
adminRouter.get('/delete/:id',checkUserRole,deleteManager);
adminRouter.get('/view-manager',checkUserRole,viewManagerPage);
adminRouter.get('/change-password',checkUserRole, changePasswordPage);
adminRouter.post('/change-password',checkUserRole, changePassword);

export default adminRouter;