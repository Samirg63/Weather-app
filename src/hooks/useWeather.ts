import AccuWeather from "../services/AccuWeather";



export default function useWeather(){
    const {data,setData, getDataByLatLong,getAllDataByKey,loading,chartData,setChartData,getNextHoursInfo, getDefaultCity} = AccuWeather()
    const useCache:boolean = Boolean(import.meta.env.VITE_ENABLE_CACHE)

    async function getWeatherData(key?:string){
        if(key){
            await getAllDataByKey(key)
            await getNextHoursInfo(key)  
        }else{
    
            //Cache
                const dataCacheKey:string = 'weather'
                const chartCacheKey:string = 'weatherChart'
                const duration:number = 1000*60*60*24 //1 day
                if(sessionStorage.getItem(dataCacheKey) && sessionStorage.getItem(chartCacheKey) && useCache){
                    const cacheData = JSON.parse(sessionStorage.getItem(dataCacheKey)!)
                    const cacheChartData = JSON.parse(sessionStorage.getItem(chartCacheKey)!)
    
                    if(Date.now() - cacheData.timestamp < duration && Date.now() - cacheChartData.timestamp < duration){
                        setData(cacheData)
                        setChartData(cacheChartData)
                        return;
                    }
                }else{
                    //Try with Ip
                    try {
                    let key = await getDefaultCity()
                      await getAllDataByKey(key)
                      await getNextHoursInfo(key)
                    } catch {
                        //Try with geolocation
                        try {
                            
                            navigator.geolocation.getCurrentPosition(async (position)=>{
                                let lat = position.coords.latitude
                                let long = position.coords.longitude
                                await getDataByLatLong(lat,long)
                                await getNextHoursInfo()           
                            })
            
                        } catch {
                            //Absolute Fallback - São Paulo city key = 2736082
                            await getAllDataByKey('2736082')
                            await getNextHoursInfo('2736082')
                        }
                    
                    }
                }
        }
    }
    
    return {
        data,
        chartData,
        loading,
        getWeatherData
    }
}