import jwt from "jsonwebtoken";
import dotenv from "../configs/dotenv.js";

const userAuth = (req,res,next) => {
    const {token} = req.cookies;

    if(!token){
        return res.redirect('/login');
    }

    const decoded = jwt.verify(token,dotenv.JWT_SECRET);
    req.user = decoded;

    return next();
}

export default userAuth;