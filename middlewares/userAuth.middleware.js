const userAuth = (req,res,next) => {
    const {token} = req.cookies;

    if(!token){
        return res.redirect('/login');
    }

    return next();
}

export default userAuth;