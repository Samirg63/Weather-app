import { useState } from "react"



export default function AccuWeather(){
    
    const [data,setData] = useState<any>({})
    const [nextdaysData,setNextdaysData]= useState<any>({})
    const [nexthoursData,setNexthoursData]= useState<any>([])
    const [loading,setLoading] = useState<boolean>(false)
    const [nextdaysLoading,setNextdaysLoading] = useState<boolean>(false)
    const [nextHoursLoading,setNextHoursLoading] = useState<boolean>(false)
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
                  
        })
        .catch((e)=>{
            console.log(e)
        })
        .finally(()=>{
            setLoading(false)
        })
    }

    const getNextDaysInfo = async(key?:number)=>{

        setNextdaysLoading(true)

        if(key){
            await fetch(url+`/forecasts/v1/daily/5day/${key}?apikey=${apiKey}&metric=true`,{
                method:"GET"
            })
            .then((response)=>response.json())
            .then((result)=>{
                setNextdaysData(result)
                      
            })
            .catch((e)=>{
                console.log(e)
            })
            .finally(()=>{
                setNextdaysLoading(false)
            })
        }else{
            navigator.geolocation.getCurrentPosition(async (position)=>{
                let lat = position.coords.latitude
                let long = position.coords.longitude

                await fetch(url+`/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${long}&language=pt-BR`,{
                    method:"GET"
                })
                .then((response)=>response.json())
                .then(async (result)=>{
                    if(result.Key){
                        
                        getNextDaysInfo(result.Key)
                    }
                })
                .catch((e)=>{
                    console.log(e)
                })
                
        })
    }}

    const getNextHoursInfo = async(key?:number)=>{
        setNextHoursLoading(true)

        if(key){
            await fetch(url+`/forecasts/v1/hourly/12hour/${key}?apikey=${apiKey}&metric=true`,{
                method:"GET"
            })
            .then((response)=>response.json())
            .then((result)=>{
                setNexthoursData(result)
                    
            })
            .catch((e)=>{
                console.log(e)
            })
            .finally(()=>{
                setNextHoursLoading(false)
            })
        }else{
            navigator.geolocation.getCurrentPosition(async (position)=>{
                let lat = position.coords.latitude
                let long = position.coords.longitude

                await fetch(url+`/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${long}&language=pt-BR`,{
                    method:"GET"
                })
                .then((response)=>response.json())
                .then(async (result)=>{
                    if(result.Key){
                        
                        getNextHoursInfo(result.Key)
                    }
                })
                .catch((e)=>{
                    console.log(e)
                })
                
        })
    }
    }

    return {data,getDataByLatLong,getNextDaysInfo,loading,nextdaysLoading,nextHoursLoading,nextdaysData,nexthoursData,getNextHoursInfo}
}