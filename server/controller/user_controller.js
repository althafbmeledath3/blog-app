
import userSchema from "../models/user_model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false,
  auth: {
    user: "c02c2fd894074a",
    pass: "e21d18254c39d7",
  },
});



export const signUp = async function signUp(req, res) {

    console.log("hello from signup")
   
    try {
        

      if (!req.file) {
        return res.status(400).json({ message: "Profile picture is required" });
      }
  
      const profile_pic = req.file.path;
      const { username, email, password } = req.body;
  
      if (!(profile_pic && username && email  && password)) {
        return res.status(400).json({ message: "Please fill all the details" ,profile_pic});
      }
  
      const hashed_pwd = await bcrypt.hash(password, 10);
  
      const data = await userSchema.create({
        profile_pic,
        username,
        email,
        password: hashed_pwd,
      });


      const id = data._id.toString()

      const token = await jwt.sign({ id: id}, process.env.JWT_KEY, {
        expiresIn: "24h",

      });

  
      res.status(201).json({ message: "User Created Successfully",token,id });
  
    } 
    
    catch (err) {
      res.status(400).json({ message: "Error in creating user", error: err.message });
    }

  };



  export const logIn = async function logIn(req, res) {

    try {
      const { email, password } = req.body.formData;
  
      const userExist = await userSchema.findOne({ email });
  
      if (!userExist) {
        return res.status(400).json({ message: "User not found" });
      }

      const id = userExist._id
      const ispassMatch = await bcrypt.compare(password, userExist.password);
  
      if (!ispassMatch) {
        return res.status(400).json({ message: "Passwords is wrong" });
      }
  
      const token = await jwt.sign({ id: userExist._id }, process.env.JWT_KEY, {
        expiresIn: "24h",
      });

      res.status(200).json({ message: "Logged in success" ,token,id});
  
    } catch (err) {

      res.status(400).json({ error: err });
    }
  };
  


export const getuser = async function getuser(req,res) {

  // console.log("Inside getuser")

  const id = req.params.id

  const data = await userSchema.findById(id)

  if(!data)
    return res.status(404).json({message:"Not Found"})

  res.status(200).json(data)

}



export const editprofile = async function editprofile(req, res) {
  console.log("hello from editprofile");

  try {
    const { id } = req.params; 
    const { username, email } = req.body;

  
    if (!username || !email) {
      return res.status(400).json({ message: "Username and email are required" });
    }

   
    const updateData = {
      username,
      email,
    };

    if (req.file) {
      updateData.profile_pic = req.file.path; 
    }

   
    const updatedUser = await userSchema.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Error in updating profile:", err);
    res.status(400).json({ message: "Error in updating profile", error: err.message });
  }
};








