import { userModel } from "../db/schemas/userSchema";

export class UserController{

    static async getUserBy(method:string,data:string|number){
        let requestData = await userModel.findOne({[method]:data})
        .then((item)=>{
            return item
        })
        .catch((e)=>{
            console.log(e)
        })

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