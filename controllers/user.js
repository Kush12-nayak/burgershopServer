import { asyncError } from "../middlewears/errorMidlleware.js";
import {User} from "../models/User.js"
import {Order} from "../models/Order.js"

export const myProfile=(req,res,next)=>{

    res.status(200).json({
        success:true,
        user:req.user,
    })

}

export const logout=(req,res,next)=>{

    req.session.destroy((err)=>{
        if(err) return next(err)
        
        res.clearCookie("connect.sid",{
            secure:process.env.NODE_ENV === "development"?false:true,
            httpOnly:process.env.NODE_ENV === "development"?false:true,
            sameSite:process.env.NODE_ENV === "development"?false:"none"
        });
        res.status(200).json({
            message:"Logged Out"
        })
    })
}

export const getallUsers=asyncError(

    async(req,res,next)=>{

        const users=await User.find({})

        res.status(200).json({
            success:true,
            users,
        })

    }
)

export const getAdminStat=asyncError(

    async(req,res,next)=>{

        const userCount=await User.countDocuments();

        const orders=await Order.find({});

        const preparingOrder=orders.filter((i)=>i.orderStats==="Preparing");
        const outfordeliveryOrder=orders.filter((i)=>i.orderStats==="OutforDelivery");
        const DeliveredOrder=orders.filter((i)=>i.orderStats==="Delivered");

        let totalincome=0;

        orders.forEach((i)=>{
            totalincome+=i.totalAmount;
        })


        res.status(201).json({
            success:true,
            userCount,
            ordersCount:{
                total:orders.length,
                prepaing:preparingOrder.length,
                outfordeleivery:outfordeliveryOrder.length,
                deleivered:DeliveredOrder.length,
            },
            totalincome,
        })

    }

)
