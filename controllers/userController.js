
// login user 

import bcrypt from 'bcrypt'
import validator from "validator"
import userModel from "../Models/userModel.js"
import jwt from "jsonwebtoken"


const createToken =(id)=>{

  return jwt.sign({id},process.env.JWT_SECRET)




  
}

const loginUser = async (req,res) =>{

  try {

    const {email,password}=req.body

    const user = await userModel.findOne({email})

    if (!user) {
      return res.status(404).json({ message: "User not found" });


      
    }


     const isMatch =await bcrypt.compare(password,user.password)

  if (isMatch){

    const token =createToken(user._id)
    
    return res.status(200).json({token})



  }else{
    return res.status(401).json({message:"Invalid password"})


  }

    
  } catch (error) {

    console.log(error);
    return res.status(500).json({ message: "Internal Server Error"+ error.message });
    
    
  }







}


const registerUser = async (req,res) =>{

   try {

    const {name,email,password} =req.body

    const existingUser =await userModel.findOne({email})

    if(existingUser){
        return res.status(200).json({message:"User already exists"})
    }

      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email" });
        
      }
      

      if (password.length < 8) {
        return res.status(400).json({ message: "Please enter a strong Password" });
        
      }

        
      // hashing password

      const salt = await bcrypt.genSalt(10)

      const hashedPassword = await bcrypt.hash(password,salt);


      const  newUser= new userModel({

        name,
        email,
        password:hashedPassword




      })


       const user = await newUser.save()

        const token= createToken(user._id)
        res.status(200).json({user,token})

        

      



      
      

      



    
   } catch (error) {


    console.log(error);
    res.status(500).json({ message: "Failed to create user" + error.message });
    
    
   }




}
  

 // Route for admin Login

 const adminLogin = async (req,res) =>{

  try {
    const {email,password}=req.body

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

      const token = jwt.sign(email+password,process.env.JWT_SECRET)
      res.status(200).json({token})

     
      
    }else{
      res.status(401).json({message:"Invalid email or password"})
    }
    
  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Failed to create user" + error.message });
    
  }

  




 }


export  {loginUser,registerUser,adminLogin};
