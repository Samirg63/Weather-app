import { useState } from "react"
import dotenv from 'dotenv'

dotenv.config()



export default function AccuWeather(){
    
    const [data,setData] = useState<any>({})
    const [nextdaysData,setNextdaysData]= useState<any>({})
    const [nexthoursData,setNexthoursData]= useState<any[]>([])
    const [chartData,setChartData] = useState<any>({})
    const [widgetsData,setWidgetsData] = useState<any[]>([])
    const [searchData,setSearchData] = useState<any[]>([])
    
    const [loading,setLoading] = useState<boolean>(false)
    const [nextdaysLoading,setNextdaysLoading] = useState<boolean>(false)
    const [nextHoursLoading,setNextHoursLoading] = useState<boolean>(false)
    const [widgetsLoading,setWidgetsLoading] = useState<boolean>(false)
    const [searchLoading,setSearchLoading] = useState<boolean>(false)

    


    const url = "https://dataservice.accuweather.com"
    const apiKey = process.env.API_KEY;
    


    //Get city key by IP adress
    const getDefaultCity = async()=>{
        setLoading(true)
        return await fetch('https://api.ipify.org?format=json',{
            
            method:'GET'
            
        })
        .then(response=>response.json())
        .then(async (result)=>{
            return await fetch(`${url}/locations/v1/cities/ipaddress?apikey=${apiKey}&q=${result.ip}`,{
                method:'GET',
                
            })
            .then(response=>response.json())
            .then((result)=>{
                return result.Key;
            })
            .catch((e:any)=>{
                throw e
            })
        })
        .catch((e)=>{
            throw e;
        })
    }

    //Only get the city key and city name -> redirect to Get pressure
    //Return: city name, Key        
    const getDataByLatLong = async (lat:number,long:number)=>{
        setLoading(true)
        await fetch(url+`/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${long}&language=pt-BR`,{
            method:"GET",
            
        })
        .then((response)=>response.json())
        .then(async (result)=>{
            if(result.Key){
                
                getPressure(result.Key,{LocalizedName:result.LocalizedName,Key:result.Key})
            }
        })
        .catch((e)=>{
            console.log(e)
        })
    }
    
    // Only get the city key and city name-> redurect to getpressure
    //Return: city name, Key    
    const getAllDataByKey = async (key:string)=>{

        setLoading(true)
        await fetch(url+`/locations/v1/${key}?apikey=${apiKey}&language=pt-BR`,{
            method:"GET",
            
        })
        .then((response)=>response.json())
        .then(async (result)=>{
            if(result.Key){
                
                await getPressure(result.Key,{LocalizedName:result.LocalizedName,Key:result.Key})
            }
        })
        .catch((e)=>{
            console.log(e)
        })
    }
    
    //Only get the city pressure -> need the city key -> redirect to getData by key
    //Return: pressure and Pressure Unit
    const getPressure = async(key:string,addInfo?:any)=>{
        await fetch(url+`/currentconditions/v1/${key}?apikey=${apiKey}&details=true&language=en-US`,{
            method:"GET",
            
        })
        .then((response)=>response.json())
        .then(async (result)=>{ 
            await getDataByKey(key,{Pressure:result[0].Pressure,...addInfo})   
        })
        .catch((e)=>{
            console.log(e)
        })
    }

    //Get the forescast data (dont get pressure) -> need city key
    //Return: IconPhrase, IsDayLight,LocalzedName,Pressure (value and unit), Wind (Value and unit), RainProbabiity(percentage),Temperature(value and unit), UVIndex
    const getDataByKey = async(key:string,addInfo?:any)=>{
        await fetch(url+`/forecasts/v1/hourly/1hour/${key}?apikey=${apiKey}&details=true&language=en-US&metric=true`,{
            method:"GET",
            
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

    //Get the next five days forecast -> can use city key or Lat/Long
    //Return: Datetime, IconPhrase,Temperature, Unit
    const getNextDaysInfo = async(key?:string)=>{

        setNextdaysLoading(true)

        if(key){
            await fetch(url+`/forecasts/v1/daily/5day/${key}?apikey=${apiKey}&metric=true`,{
                method:"GET",
                
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
                    method:"GET",
                    
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

    //Get the next 12 hours forecast -> can use city key ot lat/Long
    //Return: Temperature
    const getNextHoursInfo = async(key?:string)=>{
        setNextHoursLoading(true)

        if(key){
            await fetch(url+`/forecasts/v1/hourly/12hour/${key}?apikey=${apiKey}&metric=true`,{
                method:"GET",
                
            })
            .then((response)=>response.json())
            .then((result)=>{
                setNexthoursData(result)
                
                let arrData = []
                  
                    for (let index = 1; index <= result.length; index++) {
                      if(index % 3 === 0){
                        let hour = result[index-1].DateTime.slice(11,13)
                        let complement = (parseInt(hour) >=12)? 'PM' : 'AM'
                        result[index-1].formatedTime = hour+' '+complement
                        arrData.push(result[index-1])
                      }
                    }
                setChartData(arrData)
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
                    method:"GET",
                    
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

    //Widgets need : key,cityName,IconPhrase,AdministrativeArea,Temperature, Unit,IsDaylight
    //Get basic data (city name and administrative area) of many citys -> need city keys
    const getWidgetsData = async(keys:string[])=>{
        setWidgetsLoading(true)
        let requests:any[] = []
        keys.map((key:string)=>{
            requests.push(
                fetch(url+`/locations/v1/${key}?apikey=${apiKey}`,{method:'GET',})
            )
        })

        await Promise.all(requests)
        .then((responseArr)=>{
            let responseJson:any = []
            responseArr.map((item:any)=>{
                responseJson.push(item.json())
            })
            
            return responseJson
        })
        .then(async(resultArr)=>{
            await Promise.all(resultArr)
            .then((result)=>{

                //Resume Arr
                let arr:any[] = []
                result.map((item:any)=>{
                    arr.push({LocalizedName:item.LocalizedName,AdministrativeArea:item.AdministrativeArea})
                })
                
                getWidgetsForecastData(keys,arr)
            })
            .catch((e:any)=>{
                console.log(e)
            })
        })

        
        
    }

    //Get basic forecast data of many citys -> need city keys
    const getWidgetsForecastData = async(keys:string[],addInfo:any[])=>{
        let requests:any[] = []
        keys.map((key:string)=>{
            requests.push(
                fetch(url+`/forecasts/v1/hourly/1hour/${key}?apikey=${apiKey}&metric=true`,{
                    method:'GET',
                    })
            )
        })

        await Promise.all(requests)
        .then((responseArr)=>{
            let responseJson:any = []
            responseArr.map((item:any)=>{
                responseJson.push(item.json())
            })
            
            return responseJson
        })
        .then(async(resultArr)=>{
            await Promise.all(resultArr)
            .then((result)=>{
                
                //Resume Arr
                let arr:any[] = []
                result.map((item:any,index:number)=>{
                    arr.push({...addInfo[index],IconPhrase:item[0].IconPhrase,Temperature:item[0].Temperature.Value,Unit:item[0].Temperature.Unit,IsDaylight:item[0].IsDaylight})
                })
                setWidgetsData(arr)
            })
            .catch((e:any)=>{
                console.log(e)
            })
            .finally(()=>{
                setWidgetsLoading(false)
            })
        })
    }

    //Autocomplete search
    const searchByText = async(text:string)=>{
        await fetch(url+`/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${text}&language=pt-br`,{
            method:"GET",
            
        })
        .then(response=>response.json())
        .then((result)=>{
            setSearchData(result)
        })
        .catch((e)=>{
            console.log(e)
        })
        .finally(()=>{
            setSearchLoading(false)
        })
    }


    

    return {
        getWidgetsData,getDataByLatLong,getAllDataByKey,getNextDaysInfo,getNextHoursInfo,searchByText, getDefaultCity,
        data,chartData,widgetsData,nextdaysData,nexthoursData,searchData,
        loading,widgetsLoading,nextdaysLoading,nextHoursLoading,searchLoading,
        setSearchLoading
        
    }
}