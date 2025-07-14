import { useState } from "react"



export default function AccuWeather(){
    
    const [data,setData] = useState<any>({})
    const [loading,setLoading] = useState<boolean>(false)
    const url = "http://dataservice.accuweather.com"
    const apiKey = '7tC9vLQ5WGPbaLw0V3BHJt2NXZpZ0wXA'
    


    const getDataByLatLong = async (lat:number,long:number)=>{
        setLoading(true)
        await fetch(url+`/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${long}&language=pt-BR`,{
            method:"GET"
        })
        .then((response)=>response.json())
        .then(async (result)=>{
            if(result.Key){
                
                getPressure(result.Key,{LocalizedName:result.LocalizedName})
            }
        })
        .catch((e)=>{
            console.log(e)
        })
    }

    const getPressure = async(key:string,addInfo?:any)=>{
        await fetch(url+`/currentconditions/v1/${key}?apikey=${apiKey}&details=true&language=en-US`,{
            method:"GET"
        })
        .then((response)=>response.json())
        .then((result)=>{ 
            getDataByKey(key,{Pressure:result[0].Pressure,...addInfo})   
        })
        .catch((e)=>{
            console.log(e)
        })
    }

    const getDataByKey = async(key:string,addInfo?:any)=>{
        await fetch(url+`/forecasts/v1/hourly/1hour/${key}?apikey=${apiKey}&details=true&language=en-US&metric=true`,{
            method:"GET"
        })
        .then((response)=>response.json())
        .then((result)=>{
            setData({...result[0],...addInfo})
            console.log({...result[0],...addInfo})       
        })
        .catch((e)=>{
            console.log(e)
        })
        .finally(()=>{
            setLoading(false)
        })
    }

    return {data,getDataByLatLong,loading}
}