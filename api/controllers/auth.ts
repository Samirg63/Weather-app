import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { UserController } from './User'
import { ok, httpError } from '../utils/httpResponse'

interface userData{
    username?:string,
    email?:string,
    password?:string | number,
    _doc?:any
} 

interface dbResponse{
    status:number,
    success:boolean,
    msg:any,
    body?:any,
    token?:string
}

dotenv.config()

export class authController{

    async register(data:userData):Promise<dbResponse>{
        //Verify if user already exists
        let user = await UserController.getUserBy('email',data.email!)
        if(user !== null){
            return httpError(400,'User already exists')
        }
        
        
        
        try {
            //hash password
            const salt = await bcrypt.genSalt(12)
            const hashedPass = await bcrypt.hash(String(data.password),salt)
            
            

            await UserController.addUser({...data,password:hashedPass})
            return ok(201,'usuário adicionado')
        } catch (error) {
            return httpError(400,error)
        }
    }

    async login(data:userData):Promise<dbResponse>{
        let user:userData | null = await UserController.getUserBy('email',data.email!)
        if(user === null){
            return httpError(400,"User don't exists")
        }

        try {
            if(await bcrypt.compare(String(data.password),String(user.password))){
                let secret:string|undefined = process.env.SECRET
                const {password,...rest} = user._doc
                let token = jwt.sign({...rest},secret!)
                return {...ok(200,"Correct credentials!"),
                    body:rest,
                    token:token
                }
            }else{
                return httpError(400,'wrong Credentials')
            }
            
        } catch (error) {
            return httpError(400,error)
        }
    }
}