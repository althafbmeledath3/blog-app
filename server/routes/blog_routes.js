import express from "express"

import { signUp ,getuser,logIn,editprofile} from "../controller/user_controller.js"

import { write ,loadblogs,deleteblog} from "../controller/blog_controller.js"

import auth from "../middlewares/auth.js"
import upload from "../multer/multer.config.js"


const blog_routes = express.Router()

blog_routes.post("/signup",upload.single('file'),signUp)


blog_routes.get("/getuser/:id",getuser)

blog_routes.post("/login",logIn)

blog_routes.post("/write",upload.single('file'),write)

blog_routes.get("/loadblogs",loadblogs)


blog_routes.post('/editprofile/:id',upload.single('file'),editprofile)


blog_routes.get("/deleteblog/:id",deleteblog)


// blog_routes.get("/loadhome")

// blog_routes.post("/addPost",upload.array("file",10),addPost)




export default blog_routes