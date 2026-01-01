import Employee from "../models/employee.model.js";
import axiosInstance from "../configs/axiosInstance.js";

export const addEmployeePage = (req, res) => {
    return res.render("./pages/add-employee.ejs");
};

export const addEmployee = async (req, res) => {
    try {
        // await Employee.create(req.body);

        axiosInstance.post('/userApi',req.body);
        console.log("Employee Added.");
        return res.redirect("/api/add-employee");
    } catch (error) {
        console.log(error.message);
        return res.redirect("/add-employee");
    }
};

export const viewEmployeePage = async (req, res) => {
    try {
        // const employees = await Employee.find();
        // return res.render("./pages/view-employee.ejs", {
        //     data: employees
        // });

        const response = await axiosInstance.get('/userApi/employees')
        const employees = response.data.data
        return res.render("./pages/view-employee.ejs", {
            data: employees
        });

    } catch (error) {
        console.log(error.message);
        return res.render("./pages/view-employee.ejs", {
            data: []
        });
    }
};

export const deleteEmployee = async (req, res) => {
    try {
        // await Employee.findByIdAndDelete(req.params.id);
        // return res.redirect("/api/view-employee"); 

        const {id} = req.params

        await axiosInstance.delete(`/userApi/${id}`);
        console.log('User Deleted.')

        return res.redirect('./pages/view-employee.ejs');

    } catch (error) {
        return res.redirect("/view-employee"); 
    }
};

export const updateEmployeePage = async (req, res) => {
    try {
        // const employee = await Employee.findById(req.params.id);
        // return res.render("./pages/view-employee.ejs", {
        //     data: employee
        // });

        const {id} = req.params;

        const employee = await axiosInstance.get(`/userApi/${id}`);

        return res.render('./pages/view-employee.ejs',{
            employee : employee.data
        });

    } catch (error) {
        console.log(error.message);
        return res.redirect('./pages/view-employee.ejs');
    }
};

export const updateEmployee = async (req, res) => {
    try {
        // await Employee.findByIdAndUpdate(req.params.id, req.body);
        // return res.redirect("/view-employee");

        const {id} = req.params;

        await axiosInstance.patch(`/userApi/${id}`,req.body);

        console.log('User Updated.');

        return res.redirect("/view-employee");

    } catch (error) {
        return res.redirect("/view-employee");
    }
};