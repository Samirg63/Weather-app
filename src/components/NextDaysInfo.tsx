import { useEffect } from "react"
import AccuWeather from "../services/AccuWeather"
import CircularProgress from "@mui/material/CircularProgress"
import convertData from "../utils/convertData"

const NextDaysInfo = () => {

  const {nextdaysLoading,getNextDaysInfo,nextdaysData, nextHoursLoading,nexthoursData,getNextHoursInfo} = AccuWeather()
  const {getIcon} = convertData()
  

  useEffect(()=>{
    async function getData(){
      await getNextDaysInfo()
      await getNextHoursInfo()
    }

    getData()
  },[])
  

  return (
    <div className='w-3/12 p-4 border-l border-zinc-300 h-screen '>
        <h3 className='font-semibold text-center text-xl'>This Week</h3>
{
  (nextHoursLoading ||  nexthoursData.length === 0)?
  <div className="mt-2 text-center">
    <CircularProgress/>
  </div>
  :
        <div className='mt-2'>

          <h3 className='font-semibold'>Today</h3>

          <div className='flex flex-nowrap gap-1 mt-4'>
            {
              nexthoursData.map((data:any,index:number)=>{
                let hour = data.DateTime.slice(11,13)
                let complement = (parseInt(hour) >=12)? 'PM' : 'AM'
                if(index <4){
                  return(
                  <div key={index} className={`w-1/4 h-[100px]  rounded-xl font-semibold text-center flex flex-col justify-between py-1
                  ${(index === 0) ? 'bg-blue-200': null }`}>

                    <p className="text-[.8em]">{hour} {complement}</p>
                    <img src={getIcon(data.IconPhrase)} width={40} height={40} className="mx-auto" alt="" />
                    <p className="text-lg">{data.Temperature.Value.toFixed(0)}º{data.Temperature.Unit}</p>
                  </div>)
                }
              })
            }
            
          </div>
        </div>
}

{
  (nextdaysLoading ||  nextdaysData.DailyForecasts === undefined)?
  <div className="mt-6 text-center">
    <CircularProgress/>
  </div>
  :

  <div className='mt-6'>

  {
    
     nextdaysData.DailyForecasts.map((data:any,index:number)=>{
       
       if(index === 1){
        let day = data.Date.slice(8,10)
        let month = new Date(data.Date).toLocaleString('en-US',{month:'long'}).slice(0,3)
        
        return(

          <div className='flex items-center justify-between py-1' key={index}>
          <div>
          <h4 className='font-semibold'>Tomorrow</h4>
          <p className='text-zinc-400'>{day} {month}</p>
          </div>
          <div className="flex items-center">
            <h3 className='font-semibold text-2xl'>{((data.Temperature.Maximum.Value + data.Temperature.Minimum.Value)/2).toFixed(0)}º{data.Temperature.Minimum.Unit}</h3>
  
            <img className="ml-10" src={getIcon(data.Day.IconPhrase)} width={45} height={45} alt="" />
          </div>
        </div>
        )

      }else if(index > 1){
        let weekDay = new Date(data.Date).toLocaleDateString('en-US',{weekday:'long'})
        let day = data.Date.slice(8,10)
        let month = new Date(data.Date).toLocaleString('en-US',{month:'long'}).slice(0,3)

        return(
  
          <div className='flex items-center justify-between py-1' key={index}>
          <div>
          <h4 className='font-semibold'>{weekDay}</h4>
          <p className='text-zinc-400'>{day} {month}</p>
          </div>
          <div className="flex items-center">
            <h3 className='font-semibold text-2xl'>{((data.Temperature.Maximum.Value + data.Temperature.Minimum.Value)/2).toFixed(0)}º{data.Temperature.Minimum.Unit}</h3>
            <img className="ml-10" src={getIcon(data.Day.IconPhrase)} width={45} height={45} alt="" />
          </div>
        </div>
        )
      }
    
    }
  )   
  }
   
    

  </div>
}
      </div>
  )
}

export default NextDaysInfo