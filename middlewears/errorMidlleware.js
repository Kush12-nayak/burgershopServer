export const errorMiddleware=(err,req,res,next)=>{

    err.message=err.message || "Internal Server Error";
    err.statusCode= err.statusCode || 500;

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    })
}

export const asyncError=(passedfun)=>(req,res,next)=>{

    Promise.resolve(passedfun(req,res,next)).catch(next);
}