import multer from "multer";

const storage = multer.diskStorage({

    destination:(req,file,cb)=>cb(null,"images/"),

    filename:(req,file,cb)=>{

        cb(null,Date.now()+ "-" +file.originalname)

       console.log("hello muklter here")
        
    }
    
})


const upload = multer({storage})

export default upload
