export function ok(statusCode:number,msg:string){
    return{
        status:statusCode,
        success:true,
        msg:msg
    }
}

export function httpError(statusCode:number,msg:string){
    return{
        status:statusCode,
        success:false,
        msg:'erro: '+msg
    }
}