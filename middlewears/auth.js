import ErrorHandler from "../utills/errorHanlder.js";

export const isAuthincated=(req,res,next)=>{

    const token=req.cookies["connect.sid"];
    if(!token){

        return next(new ErrorHandler("Not Logged In",401))
    }
    next();
}



export const adminauthantication=(req,res,next)=>{

    if(req.user.role !== "admin"){

        return next(new ErrorHandler("Only Admin Allowed",405))
    }
    next();
}