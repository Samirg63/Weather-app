import { userModel } from "../db/schemas/userSchema";

interface userData{
    username?:string,
    email?:string,
    password?:string | number
} 

export class UserController{

    static async getUserBy(method:string,data:string|number):Promise<userData | null>{
        let requestData:userData | null = await userModel.findOne({[method]:data})
        

        return requestData;
    }

    static async addUser(data:{}){
        let request = await userModel.create(data)
        .then((response)=>{
            return response
        })
        .catch((e)=>{
            return false;
        })

        return request
    }
}