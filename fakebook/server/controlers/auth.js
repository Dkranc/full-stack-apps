import { db } from "../connect.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register=(req,res)=>{

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword=bcrypt.hashSync(req.body.password, salt)

    const q2="INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)"
    const values=[req.body.username,req.body.email,hashedPassword,req.body.name]
    //check if user exists

       const q1="SELECT * FROM users WHERE username = ?"

       db.query(q1,[req.body.username],(err,data)=>{
             if(err) return res.status(500).json(err)
             else if(data.length) {
                return res.status(409).json("user already exists")
            }
            else{
                db.query(q2,[values],(err,data)=>{
                    if(err) return res.status(500).json(err)
                    else return res.status(200).json("User has been created")
                 })
            }
       })
    //create new user
      //hash the password
}

export const login=(req,res)=>{
    
    const q= "SELECT * FROM users WHERE username = ?"
    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.status(500).json(err);
        else if(data.length===0) return res.status(404).json("wrong password or username");

         
        const checkPassword = bcrypt.compareSync(req.body.password,data[0].password);

        if(!checkPassword) return res.status(400).json("wrong password or username");
         
        const token=jwt.sign({id:data[0].id},"secretkey");

        const {password,...others} = data[0];

        res.cookie("accessToken",token,{
            httpOnly : true,
        }).status(200).json(others);
    });
    
};

export const logout=(req,res)=>{
    res.clearCookie("accessToken",{
        secure:true,
        sameSite:"none"
    }).status(200).json("User has been logged out");
    
}

