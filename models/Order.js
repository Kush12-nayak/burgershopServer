import mongoose from "mongoose";

const schema=new mongoose.Schema({

    shippingInfo:{
        hNo:{
            type:String,
            required:true,
        },
        city:{
            type:String,
            required:true,
        },
        state:{
            type:String,
            required:true,
        },
        country:{
            type:String,
            required:true,
        },
        pinCode:{
            type:Number,
            required:true,
        },
        phNo:{
            type:Number,
            required:true,
        },
    },

    orderItems:[{
                name:{
                    type:String,
                    required:true,
        
                },
                price:{
                    type:Number,
                    required:true
                },
                quantity:{
                    type:Number,
                    required:true
                }
            }   
    ],

    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },

    paymentMethod:{
        type:String,
        enum:["COD","ONLINE"],
        default:"COD"
    },

    paymentInfo:{
        type:mongoose.Schema.ObjectId,
        ref:"Payment",
    },

    paidAt:Date,

    itemsPrice:{
        type:Number,
        default:0,
    },

    taxPrice:{
        type:Number,
        default:0,
    },

    shippingCharges:{
        type:Number,
        default:0,
    },

    totalAmount:{
        type:Number,
        default:0,
    },

    orderStats:{
        type:String,
        enum:["Preparing","OutforDelivery","Delivered"],
        default:"Preparing"
    },

    deliveredAt:Date,

    createdAt:{
        type:Date,
        default:Date.now, 
    }


})

export const Order=mongoose.model("Order",schema)
