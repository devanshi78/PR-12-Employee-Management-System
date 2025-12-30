import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    department: {
        type: String
    },
    status: {
        type: String,
        default: "Active"
    },
    role : {
        type : String,
        enum : ['admin','manager','employee'],
        default : 'employee'
    }
}, { timestamps: true });

const EmployeeModel = mongoose.model('employee',employeeSchema);

export default EmployeeModel;