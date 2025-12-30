import Employee from "../models/employee.model.js";

export const addEmployeePage = (req, res) => {
    return res.render("./pages/add-employee.ejs");
};

export const addEmployee = async (req, res) => {
    try {
        await Employee.create(req.body);
        return res.redirect("/api/add-employee");
    } catch (error) {
        console.log(error.message);
        return res.redirect("/api/add-employee");
    }
};

export const viewEmployeePage = async (req, res) => {
    try {
        const employees = await Employee.find();
        return res.render("./pages/view-employee.ejs", {
            data: employees
        });
    } catch (error) {
        return res.render("./pages/view-employee.ejs", {
            data: []
        });
    }
};

export const deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        return res.redirect("/api/view-employee"); 
    } catch (error) {
        return res.redirect("/api/view-employee"); 
    }
};

export const updateEmployeePage = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        return res.render("./pages/view-employee.ejs", {
            data: employee
        });
    } catch (error) {
        return res.redirect("/view-employee");
    }
};

export const updateEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndUpdate(req.params.id, req.body);
        return res.redirect("/view-employee");
    } catch (error) {
        return res.redirect("/view-employee");
    }
};