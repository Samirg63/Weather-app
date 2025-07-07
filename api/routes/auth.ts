import express from "express";
import { authController } from "../controllers/auth";
const authRouter = express.Router();

const auth = new authController()

interface registerData{
    username?:string,
    password?:string | string,
    confirmPassword?:string | string
    email?:string,
}

interface loginData{
    email?:string,
    password?:string | string
}
authRouter.post('/register',async (req,res)=>{

    const data:registerData = req.body

    if(!data.username){
        res.status(403).send('Username is required')
    }else if(!data.password){
        res.status(403).send('Password is required')
    }else if(!data.email){
        res.status(403).send('Email is required')
    }else if(data.password !== data.confirmPassword){
        res.status(403).send("Password don't match!")
    }else{
        delete data.confirmPassword   
        const result = await auth.register(data)
        
        res.status(result.status).send(result) 
    }
})

authRouter.post('/login',async (req,res)=>{

    const data:loginData = req.body

    if(!data.password){
        res.status(403).send('Password is required')
    }else if(!data.email){
        res.status(403).send('Email is required')
    }else{
         
        const result = await auth.login(data)
        
        res.status(result!.status).send(result) 
    }
})

export default authRouter