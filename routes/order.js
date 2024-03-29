import express from "express";
import { isAuthincated,adminauthantication } from "../middlewears/auth.js";
import { getAdminorders, placeOrder, processOrder,placeOrderOnline } from "../controllers/order.js";
import {getmyOrders} from "../controllers/order.js"
import {getOrderDeatails} from "../controllers/order.js"
import {paymentverification} from "../controllers/order.js"

const router=express.Router();

router.post("/createorder",isAuthincated,placeOrder)

router.post("/createorderonline",isAuthincated,placeOrderOnline)

router.post("/paymentverification",isAuthincated,paymentverification)

router.get("/myorders",isAuthincated,getmyOrders)

router.get("/order/:id",isAuthincated,getOrderDeatails)

//Admin route

router.get("/admin/orders",isAuthincated,adminauthantication,getAdminorders)

router.get("/admin/order/:id",isAuthincated,adminauthantication,processOrder)

export default router;
