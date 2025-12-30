import express from "express";
import db from "./configs/database.js";
import dotenv from "./configs/dotenv.js";
import bodyParser from "body-parser";
import router from "./router/index.js"
import cookieParser from "cookie-parser";
import adminRouter from "./router/admin.route.js";

import TaskModel from "./models/task.model.js";

const app = express();
const port = dotenv.PORT || 3000;

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine','ejs');

app.use('/api',router);
app.use('/',adminRouter);

app.get('/check-tasks', async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.json(tasks);  // Will show all tasks in DB
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port,(error) => {
    if(!error){
        console.log('Server start');
        console.log('http://localhost:'+port)
    }
})