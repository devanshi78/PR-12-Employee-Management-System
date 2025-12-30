import jwt from "jsonwebtoken";

const checkUserRole = (req,res,next) => {

    const {token} = req.cookies;
    const decode = jwt.verify(token,process.env.JWT_SECRET);

    if(decode.role != 'admin'){
        if(req.params.id){
            if(decode.id != req.params.id){
                return res.json({message : 'Unauthorized access!!!'});
            } else {
                return next();
            }
        }
        return res.json({message : 'Unauthorized access!!!'});
    }
    return next();
}

export default checkUserRole;