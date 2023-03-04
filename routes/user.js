import express from "express";
import passport from "passport";
import { myProfile,logout, getallUsers,getAdminStat } from "../controllers/user.js";
import { adminauthantication, isAuthincated } from "../middlewears/auth.js";

const router=express.Router();

router.get("/googlelogin",passport.authenticate("google",{
    scope:["profile"],
}));

router.get("/login",
passport.authenticate("google",{
    successRedirect:process.env.FRONTEND_URL
})
);

router.get("/me",isAuthincated,myProfile)

router.get("/logout",logout)

//all admin Userget

router.get("/admin/users",isAuthincated,adminauthantication,getallUsers)

router.get("/admin/stats",isAuthincated,adminauthantication,getAdminStat)

export default router;