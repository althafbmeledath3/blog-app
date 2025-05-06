import mongoose from "mongoose";

//create a schema for posts

const BlogSchema = new mongoose.Schema({
  profile_pic: [{ type: String,required:true }],
  blog: [{ type: String,required:true }],
  title:{type:String,required:true},
  description: { type: String, required: true },
  username: { type: String, required: true },
  userid: { type: String, required: true },
  likes: [{ type: String}]
});

export default mongoose.model.Blogs || mongoose.model("Blogs", BlogSchema);

