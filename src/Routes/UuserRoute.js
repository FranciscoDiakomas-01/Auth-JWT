import { Router } from "express";
import VerifyToken from "../middlewares/veryfyToke.js";
import User from "../controllers/UserController.js";


const UserRoute = Router()
UserRoute.get("/",VerifyToken ,User.List)
UserRoute.post("/", VerifyToken ,User.Insert)
UserRoute.delete("/:id",VerifyToken,User.Delete)
UserRoute.put("/",VerifyToken,User.Update)
UserRoute.post("/login" , User.Login)
export default UserRoute