import express from "express"

import { signUp ,getuser} from "../controller/user_controller.js"

import auth from "../middlewares/auth.js"
import upload from "../multer/multer.config.js"


const blog_routes = express.Router()

blog_routes.post("/signup",upload.single('file'),signUp)


blog_routes.get("/getuser/:id",getuser)


// blog_routes.post("/logIn",logIn)

// blog_routes.post("/addPost",upload.array("file",10),addPost)




export default blog_routes