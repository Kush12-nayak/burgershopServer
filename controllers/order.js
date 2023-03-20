import { asyncError } from "../middlewears/errorMidlleware.js";
import { Order } from "../models/Order.js";
import ErrorHandler from "../utills/errorHanlder.js";

export const placeOrder=asyncError(

    async(req,res,next)=>{


        const {
            shippingInfo,
            orderItems,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingCharges,
            totalAmount
        }
        =req.body;
    
        const user=req.user._id;
    
        const orderOptions={
            shippingInfo,
            orderItems,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingCharges,
            totalAmount,
            user
        }
    
        await Order.create(orderOptions);
    
        res.status(201).json({
            success:true,
            message:"Order placed successfullt via COD"
        })
    }

)

export const placeOrderOnline=asyncError(

    async(req,res,next)=>{


        const {
            shippingInfo,
            orderItems,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingCharges,
            totalAmount
        }
        =req.body;
    
        const user=req.user._id;
    
        const orderOptions={
            shippingInfo,
            orderItems,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingCharges,
            totalAmount,
            user
        }
    
        await Order.create(orderOptions);
    
        res.status(201).json({
            success:true,
            message:"Order placed successfullt via COD"
        })
    }

)

export const getmyOrders=asyncError(

    async(req,res,next)=>{

        const orders=await Order.find({
            user:req.user._id,
        }).populate("user","name")

        res.status(200).json({
            success:true,
            orders
        })
    }
)


export const getOrderDeatails=asyncError(

    async(req,res,next)=>{

        const order=await Order.findById(req.params.id).populate("user","name")

        if(!order) return next(new ErrorHandler("Invalid order id",404))

        res.status(200).json({
            success:true,
            order
        })
    }
)

export const getAdminorders=asyncError(

    async(req,res,next)=>{

        const order=await Order.find({}).populate("user","name")

        res.status(200).json({
            success:true,
            order
        })
    }
)


export const processOrder=asyncError(

    async(req,res,next)=>{

        const order=await Order.findById(req.params.id)

        if(!order) return next(new ErrorHandler("Invalid order id",404))

        if(order.orderStats==="Preparing")  order.orderStats="OutforDelivery"

        else if(order.orderStats==="OutforDelivery"){

            order.orderStats="Delivered";
            order.deliveredAt=new Date(Date.now());
        }

        else if(order.orderStats==="Delivered") return next(new ErrorHandler("Already Delivered",400))


        await order.save()

        res.status(200).json({
            success:true,
            message:"Order state updated successfully"
        })
    }
)

