import axiosInstance from "../configs/axiosInstance.js";
import bcrypt from "bcrypt";
import Usermodel from "../models/user.model.js";
import TaskModel from "../models/task.model.js";

export const dashboard = async(req, res) => {
    try {
        const totalManager = await Usermodel.countDocuments({role : "manager"});
        const totalEmployee = await Usermodel.countDocuments({role : "employee"});
        const totalTask = await TaskModel.countDocuments();

        return res.render("index.ejs",{
            totalManager,
            totalEmployee,
            totalTask
        })
    } catch (error) {
        console.log(error.message);
        return res.render("index.ejs", {
            totalManagers: 0,
            totalEmployees: 0,
            totalTasks: 0
        });
    }
}

export const addManagerPage = (req, res) => {
    return res.render('./pages/add-manager.ejs')
}

export const addManager = async (req, res) => {
    try {
        // let responce = await fetch('http://localhost:8081/api/userApi/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(req.body)
        // })
        await axiosInstance.post('/userApi',req.body);
        console.log("User Created.");
        return res.redirect(req.get('Referrer') || '/');
    } catch (error) {
        console.log(error.message);
        return res.redirect(req.get('Referrer') || '/');
    }
}

export const viewManagerPage = async (req, res) => {
    try {
        // let response = await fetch('http://localhost:8081/api/userApi', {
        //     method: 'GET'
        // });
        // let data = await response.json();
        let response = await axiosInstance.get('/userApi');
        return res.render('./pages/view-manager.ejs',{
            data : response.data
        })
    } catch (error) {
        console.error(error.message);
        return res.render('./pages/view-manager.ejs',{
            data : []
        })
    }
}

export const deleteManager = async (req,res) => {
    try {
        const {id} = req.params;
        // await fetch(`http://localhost:8081/api/userApi/${id}`,{
        //     method : 'DELETE'
        // });
        await axiosInstance.delete(`/userApi/${id}`);
        console.log('User Deleted.');
        return res.redirect(req.get('Referrer') || '/');
    } catch (error) {
        console.log(error.message);
        return res.redirect(req.get('Referrer') || '/');
    }
}

export const updateManagerPage = async (req, res) => {
    try {
        const { id } = req.params;

        const response =  await axiosInstance.get(`/userApi/${id}`);

        return res.render('./pages/update-manager.ejs',{
            data : response.data
        })
    } catch (error) {
        console.log(error.message);
        return res.redirect('/view-manager');
    }
}

export const updateManager = async (req, res) => {
    try {
        const { id } = req.params;

        await axiosInstance.patch(`/userApi/${id}`, req.body);

        console.log("User Updated.");
        return res.redirect('/view-manager');
    } catch (error) {
        console.log(error.message);
        return res.redirect('/view-manager');
    }
};

export const loginPage = (req,res) => {
    return res.render('./pages/login.ejs')
}

export const login = async(req,res) => {
    try {
        res.clearCookie('token');
        const response = await axiosInstance.post('/userApi/login',req.body);
        if (!response.data || !response.data.token ) {
            console.log(response.data?.message ||"Login failed");
            return res.redirect('/login');
        }
        res.cookie('token',response.data.token);
        console.log('Login Successfully.');
        return res.redirect('/');
    } catch (error) {
        console.log(error.message);
        return res.redirect('/login');
    }
}

export const addEmployeePage = (req, res) => {
    return res.render('./pages/add-employee.ejs');
}

export const viewEmployeePage = (req, res) => {
    return res.render('./pages/view-employee.ejs');
}

export const myProfilePage = async(req, res) => {
    try {
        const userId = req.user.id;

        const user = await Usermodel.findById(userId).select("name email role createdAt"); 

        if (!user) {
            return res.redirect('/login');
        }

        return res.render('./pages/profile.ejs', {
            user
        });
    } catch (error) {
        console.log(error.message);
        return res.redirect('/');
    }
}

export const changePasswordPage = (req,res) => {
    return res.render('./pages/change-password.ejs');
}

export const changePassword = async (req,res) => {
    try {
        const userId = req.user.id;

        const { currentPassword, newPassword } = req.body;

        const user = await Usermodel.findById(userId);
        console.log(user.password);

        if(!user){
            console.log("User not found");
            return res.redirect('/change-password');
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            console.log("Current password is wrong");
            return res.redirect('/change-password');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        console.log(user.password);
        return res.redirect('/logout');

    } catch (error) {
        console.log(error.message);
        return res.redirect('/change-password');
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie('token');

        console.log('Admin logged out successfully.');
        return res.redirect('/login');
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
};