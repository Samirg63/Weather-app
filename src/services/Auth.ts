import { useState } from "react"
import { useNavigate } from "react-router"
import UserServices from "./User"


//Interfaces
import type { IdbResponse } from "../utils/interfaces"

interface Data{
    username?:string,
    password?:string | number,
    confirmPassword?:string | number,
    email?:string
}

export default function AuthServices(){
    
     const url:string = import.meta.env.VITE_API_URL;

    
    
    const [authLoading,setAuthLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const {findUser} = UserServices();

    const register = (formData:Data)=>{
        setAuthLoading(true)
        fetch(url+'/auth/register',{
            method:"POST",
            body:JSON.stringify(formData),
            headers:{
                "Content-Type":"application/JSON",
                "Access-Control-Allow-Origin":"*"
            }
        })
        .then((response)=>response.json())
        .then((result:IdbResponse)=>{
            if(result.token && result.success){
                localStorage.setItem(
                    'token',
                    JSON.stringify({token:result.token})
                )

                localStorage.setItem('userData',
                    JSON.stringify({
                        pins:result.body.pins,
                        home:result.body.home
                    })
                )

                
            }
        })
        .catch((e:any)=>{
            console.log(e)
        })
        .finally(()=>{
            setAuthLoading(false)
            return navigate('/',{replace:true,})
        })
    }

    const login = async (formData:Data)=>{
        setAuthLoading(true)
        fetch(url+'/auth/login',{
            method:"POST",
            body:JSON.stringify(formData),
            headers:{
                "Content-Type":"application/JSON",
                "Access-Control-Allow-Origin":"*"
            }
        })
        .then((response)=>response.json())
        .then(async (result:IdbResponse)=>{
            console.log(result)
            if(result.token && result.success){
                localStorage.setItem(
                    'token',
                    JSON.stringify({token:result.token})
                )
                 
                localStorage.setItem('userData',
                    JSON.stringify({
                        pins:result.body.pins,
                        home:result.body.home
                    })
                )
            }
        })
        .catch((e:any)=>{
            console.log(e)
        })
        .finally(()=>{
            setAuthLoading(false)
            return navigate('/',{replace:true})
        })
    }

    const logout = ()=>{
        localStorage.removeItem('token')
        location.reload()
    }

    const OAuth = async (email:string,username:string)=>{
        if(await findUser({email:email,type:'google'})){
            googleLogin(email,username) //Login -> criação de token e localstorage
        }else{
            //register + login -> adicionar ao banco de dados + criação de token e localstorage
            googleRegister(email,username) 
        }
    }

    const googleRegister = async(email:string,username:string)=>{
        setAuthLoading(true)
        fetch(url+'/auth/google/register',{
            method:"POST",
            body:JSON.stringify({email:email,username:username}),
            headers:{
                "Content-Type":"application/JSON",
                "Access-Control-Allow-Origin":"*"
            }
        })
        .then((response)=>response.json())
        .then((result:IdbResponse)=>{
            if(result.token && result.success){
                localStorage.setItem(
                    'token',
                    JSON.stringify({token:result.token})
                )
            }
        })
        .catch((e:any)=>{
            console.log(e)
        })
        .finally(()=>{
            setAuthLoading(false)
            return navigate('/',{replace:true})
        })
    }

    const googleLogin = async(email:string,username:string)=>{
        setAuthLoading(true)
        fetch(url+'/auth/google/login',{
            method:"POST",
            body:JSON.stringify({email:email,username:username}),
            headers:{
                "Content-Type":"application/JSON",
            }
        })
        .then((response)=>response.json())
        .then(async (result:IdbResponse)=>{
            if(result.token && result.success){
                localStorage.setItem(
                    'token',
                    JSON.stringify({token:result.token})
                )
                 
            }
        })
        .catch((e:any)=>{
            console.log(e)
        })
        .finally(()=>{
            setAuthLoading(false)
            return navigate('/',{replace:true})
        })
    }

    return {authLoading, register, login, logout,OAuth}
}