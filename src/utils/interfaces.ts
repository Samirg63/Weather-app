export interface IuserData{
        username?:string,
        email?:string,
        password?:string | number,
        confirmPassword?:string | number,
        home?:string,
        _id?:string,
        pins?:string[]
        _doc?:any
    
}

export interface IdbResponse{
        status:number,
        success:boolean,
        msg:any,
        body?:any,
        token?:string
}