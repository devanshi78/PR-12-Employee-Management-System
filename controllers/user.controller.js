import Usermodel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axiosInstance from "../configs/axiosInstance.js";

export const createUser = async(req,res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password,10);
        let data = await Usermodel.create(req.body);
        return res.json({message : 'User Created.',data})
    } catch (error) {
        return res.json({error:error.message});
    }
}

export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Usermodel.find({ role: 'employee' });
        return res.json({
            success: true,
            data: employees
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getAllUser = async(req,res) => {
    try {
        let data = await Usermodel.find({});
        return res.json(data);
    } catch (error) {
        return res.json({error:error.message});
    }
}

export const getUser = async(req,res) => {
    try {
        const {id} = req.params;
        let data = await Usermodel.findById(id);
        return res.json(data);
    } catch (error) {
        return res.json({error:error.message})
    }   
}

export const deleteUser = async(req,res) => {
    try {
        const {id} = req.params;
        let data = await Usermodel.findByIdAndDelete(id);
        return res.json({message: 'User Deleted.'});
    } catch (error) {
        return res.json({error:error.message});
    }
}

export const updateUser = async(req,res) => {
    try {
        const {id} = req.params;
        let data = await Usermodel.findByIdAndUpdate(id,req.body);
        return res.json({message:'User Updated Successfully.',data})
    } catch (error) {
        return res.json({error:error.message});
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await Usermodel.findOne({ email });

        if (user) {

            let isValid = await bcrypt.compare(password,user.password);
            if(isValid){
                let payload = {
                    id : user.id,
                    role : user.role
                }

            const token = jwt.sign(payload,process.env.JWT_SECRET)            
            return res.json({message:'login success',token:token});
            }else{
                return res.json({message:"Password not match."});
            }
        } else {
            return res.json({ message: "User not found" });
        }

    } catch (error) {
        return res.json({ error: error.message });
    }
}

export const logout = async(req,res) => {
    return res.clearCookie('token').json({message : 'User Logout Successfully.'});
}