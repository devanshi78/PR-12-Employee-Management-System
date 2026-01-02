import EmployeeModel from "../models/employee.model.js";
import TaskModel from "../models/task.model.js";

export const addTaskPage = async (req, res) => {
    try {
        const employees = await EmployeeModel.find({ role: "employee" });

        return res.render("./pages/add-task.ejs", {
            employees
        });
    } catch (error) {
        console.log(error.message);
        return res.render("./pages/add-task.ejs", {
            employees: []
        });
    }
};

export const addTask = async (req, res) => {
    try {
        const { title, description, assignedTo, status, dueDate, priority } = req.body;

        const task = new TaskModel({
            title,
            description,
            assignedTo,
            status,
            dueDate,
            priority
        });

        await task.save();
        console.log("Task Saved");

        return res.redirect('/api/add-task');
    } catch (error) {
        console.log(error.message);
        return res.redirect('/api/add-task');
    }
};

export const viewTaskPage = async (req, res) => {
    try {
        const tasks = await TaskModel
            .find()
            .populate('assignedTo', 'name email');

        return res.render('./pages/view-task.ejs', {
            data: tasks
        });
    } catch (error) {
        console.error(error.message);
        return res.render('./pages/view-task.ejs', {
            data: []
        });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        await TaskModel.findByIdAndDelete(id);
        console.log("Task Deleted");

        return res.redirect('/api/view-task');
    } catch (error) {
        console.log(error.message);
        return res.redirect('/api/view-task');
    }
};

export const updateTaskPage = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await TaskModel
            .findById(id)
            .populate('assignedTo');

        const employees = await EmployeeModel.find({ role: "employee" });

        return res.render('./pages/update-task.ejs', {
            data: task,
            employees
        });
    } catch (error) {
        console.log(error.message);
        return res.redirect('/api/view-task');
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        await TaskModel.findByIdAndUpdate(id, req.body);
        console.log("Task Updated");

        return res.redirect('/api/view-task');
    } catch (error) {
        console.log(error.message);
        return res.redirect('/api/view-task');
    }
};