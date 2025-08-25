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
    // Development URL
    // const url:string = "http://localhost:2000/auth";

    //Production URL
    const url:string = "https://api-weather-murex.vercel.app/auth";
    
    const [authLoading,setAuthLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const {findUser} = UserServices();

    const register = (formData:Data)=>{
        setAuthLoading(true)
        fetch(url+'/register',{
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
                    'auth',
                    JSON.stringify({token:result.token,user:result.body})
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
        fetch(url+'/login',{
            method:"POST",
            body:JSON.stringify(formData),
            headers:{
                "Content-Type":"application/JSON",
                "Access-Control-Allow-Origin":"*"
            }
        })
        .then((response)=>response.json())
        .then(async (result:IdbResponse)=>{
            if(result.token && result.success){
                localStorage.setItem(
                    'auth',
                    JSON.stringify({token:result.token,user:result.body})
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
        localStorage.removeItem('auth')
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
        fetch(url+'/google/register',{
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
                    'auth',
                    JSON.stringify({token:result.token,user:result.body})
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
        fetch(url+'/google/login',{
            method:"POST",
            body:JSON.stringify({email:email,username:username}),
            headers:{
                "Content-Type":"application/JSON",
                "Access-Control-Allow-Origin":"*"
            }
        })
        .then((response)=>response.json())
        .then(async (result:IdbResponse)=>{
            if(result.token && result.success){
                localStorage.setItem(
                    'auth',
                    JSON.stringify({token:result.token,user:result.body})
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