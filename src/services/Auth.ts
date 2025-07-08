import { useState } from "react"
import { useNavigate } from "react-router"

//Interfaces
import type { IdbResponse } from "../utils/interfaces"

interface Data{
    username?:string,
    password?:string | number,
    confirmPassword?:string | number,
    email?:string
}

export default function AuthServices(){
    const [authLoading,setAuthLoading] = useState<boolean>(false)
    const url:string = "http://localhost:2000/auth";
    const navigate = useNavigate()

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
            if(result.body.token && result.success){
                localStorage.setItem(
                    'auth',
                    JSON.stringify({token:result.body.token,user:result.body.user})
                )
                 return navigate('/')
            }
        })
        .catch((e:any)=>{
            console.log(e)
        })
        .finally(()=>{
            setAuthLoading(false)
        })
    }

    const login = (formData:Data)=>{
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
        .then((result:IdbResponse)=>{
            if(result.token && result.success){
                localStorage.setItem(
                    'auth',
                    JSON.stringify({token:result.token,user:result.body.user})
                )
                 return navigate('/')
            }
        })
        .catch((e:any)=>{
            console.log(e)
        })
        .finally(()=>{
            setAuthLoading(false)
        })
    }

    return {authLoading, register, login}
}