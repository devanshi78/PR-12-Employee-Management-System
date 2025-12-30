import axiosInstance from "../configs/axiosInstance.js";
import EmployeeModel from "../models/employee.model.js";
import TaskModel from "../models/task.model.js";

/* =========================
   TASK DASHBOARD / PAGE
========================= */

/* =========================
   ADD TASK PAGE
========================= */
export const addTaskPage = async (req, res) => {
    const employees = await EmployeeModel.find();
    return res.render("./pages/add-task.ejs", { employees });
};

/* =========================
   ADD TASK (POST)
========================= */
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

/* =========================
   VIEW ALL TASKS
========================= */
export const viewTaskPage = async (req, res) => {
    try {
        const tasks = await TaskModel.find(); // get tasks directly from DB
        return res.render('./pages/view-task.ejs', { data: tasks });
    } catch (error) {
        console.error(error.message);
        return res.render('./pages/view-task.ejs', { data: [] });
    }
};

/* =========================
   DELETE TASK
========================= */
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await TaskModel.findByIdAndDelete(id);
        console.log("Task Deleted.");

        return res.redirect(req.get('Referrer') || '/api/view-task');
    } catch (error) {
        console.log(error.message);
        return res.redirect('/api/view-task');
    }
};

export const updateTaskPage = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TaskModel.findById(id).populate('assignedTo');

        return res.render('./pages/update-task.ejs', {
            data: task
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
        console.log("Task Updated.");

        return res.redirect('/api/view-task');
    } catch (error) {
        console.log(error.message);
        return res.redirect('/api/view-task');
    }
};