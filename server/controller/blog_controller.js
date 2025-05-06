import userSchema from "../models/user_model.js"
import BlogSchema from "../models/blog_model.js"



export const write = async function write(req,res){


    console.log(req.body)
   

    try{

       const file = req.file

       const {title,description,id} = req.body


       if(!title ||!description){

        return res.status(404).json({message:"Please fill all the fileds"})
       }

       

       const userdata = await userSchema.findById(id)

       console.log("usedata is ",userdata)

       const {profile_pic,username} = userdata

       const data = BlogSchema.create({profile_pic,blog:file.path,description,username,userid:id,title})

       res.status(201).json({message:"Post Uploaded Successfully"})
       
    }

    catch(err){

        console.log(err)

        res.status(500).json({message:err})
    }
}



export async function loadblogs(req,res){


    try {


        const blogs = await BlogSchema.find()

        if(blogs){

            return res.status(200).json({message:"success",blogs})
        }


    } catch (error) {
        

        return res.status(500).json({message:"Sever side error"})
    }
}