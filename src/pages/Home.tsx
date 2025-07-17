//MyComponents
import Container from '../components/Container'
import NextDaysInfo from '../components/NextDaysInfo'

//Components
import { LineChart } from '@mui/x-charts/LineChart';
import { IoLocationSharp,IoWaterOutline,IoHeart,IoHeartOutline } from "react-icons/io5";
import { FaWind } from "react-icons/fa";
import { LuWindArrowDown } from "react-icons/lu";
import { Gauge,GaugeContainer,GaugeValueArc,GaugeReferenceArc, GaugeValueText,useGaugeState } from '@mui/x-charts/Gauge';
import CircularProgress from '@mui/material/CircularProgress';

//Function
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

//MyFunction
import AccuWeather from '../services/AccuWeather';
import convertData from '../utils/convertData';
import UserServices from '../services/User';


const Home = () => {

  const {data, getDataByLatLong,getAllDataByKey,loading,chartData,getNextHoursInfo} = AccuWeather()
  const {rainChance,getImage} = convertData()
  
  const [actTime,setActTime] = useState<string>('00:00')
  const [userData,setUserData] = useState<any>(null)
  const [isPinned,setIsPinned] = useState<boolean>(false)
  const params = useParams()
  const {updatePin} = UserServices()


 function verifyPin(){
  
    

      if(userData){
      
      let result:boolean = false
      userData.user.pins.map((key:string)=>{
        if(key === data.Key){
          result = true
        }
      })
      return result
    }else{
      return false
    }
  
     
 }
  
  

  useEffect(()=>{
   
    if(params.key){
      async function fetchData(){
        await getAllDataByKey(params.key!)
        await getNextHoursInfo(params.key!)   
      }
        fetchData()    
          
      
    }else{
      if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition((position)=>{
        let lat = position.coords.latitude
        let long = position.coords.longitude
        async function fetchData(){
          await getDataByLatLong(lat,long)
          await getNextHoursInfo()   
        }
          fetchData()
        
        })
      }else{
        alert("Serviço de geolocalização indisponivel!")
      }
    }

    
    
    

    const date = new Date()
    if(date.getHours() >= 12){
      setActTime(String(date.getHours()).padStart(2,'0')+':'+String(date.getMinutes()).padStart(2,'0')+' PM')
    }else{
      setActTime(String(date.getHours()).padStart(2,'0')+':'+String(date.getMinutes()).padStart(2,'0')+' AM')
    }
    

    let userAuth = JSON.parse(localStorage.getItem('auth')!)
      if(userAuth){
        setUserData(userAuth)
      }
  },[])
  
  function attTime(){
    const date = new Date()
    if(date.getHours() >= 12){
      setActTime(String(date.getHours()).padStart(2,'0')+':'+String(date.getMinutes()).padStart(2,'0')+' PM')
    }else{
      setActTime(String(date.getHours()).padStart(2,'0')+':'+String(date.getMinutes()).padStart(2,'0')+' AM')
    }
  }
  setInterval(() => {attTime()}, 1000*20);


async function pinCity(){
  if(userData){
    
    if(verifyPin()){
      let pinnedCitys:string[] =userData.user.pins.filter((key:string) => key !== data.Key) 
      if(await updatePin(pinnedCitys,userData.user._id)){
        let newUserData = userData
        newUserData.user.pins = pinnedCitys
        setUserData(newUserData)
        localStorage.setItem('auth',JSON.stringify(newUserData))
        setIsPinned(false)
      }
    }else{
      let pinnedCitys:string[] = userData.user.pins
      pinnedCitys.push(data.Key)

      if(await updatePin(pinnedCitys,userData.user._id)){
        let newUserData = userData
        newUserData.user.pins = pinnedCitys
        setUserData(newUserData)
        localStorage.setItem('auth',JSON.stringify(newUserData))   
        setIsPinned(true)  
      }
      
    }
  }else{
    alert('You need to log in!')
  }
}



  function GaugePointer(){
    const { valueAngle, outerRadius, cx, cy } = useGaugeState();

    if (valueAngle === null) {
        return null;
      }
    
      const target = {
        x: cx + outerRadius * Math.sin(valueAngle),
        y: cy - outerRadius * Math.cos(valueAngle),
      };
  
      return (
        <g>
          <circle cx={cx!} cy={cy!} r={5} fill="#142733" />
          <path
            d={`M ${cx} ${cy} L ${target.x-5} ${target.y}`}
            stroke="#142733"
            strokeWidth={3}
          />
        </g>
      );
  }

  
  return (
    <Container customClass="flex ">
      {
        (loading || Object.keys(data).length === 0)?
        <div className='text-center w-9/12'>
          <CircularProgress/>
        </div>
        :

        <div className='w-9/12 grid grid-cols-2 grid-rows-4 py-2 px-24 gap-4 h-full'>
        
        {/* Main Display */}
          <div className={`rounded-xl relative bg-zinc-400  text-zin-900 col-span-2 row-span-2
            ${(data.IconPhrase.includes('clear') ||data.IconPhrase.includes('hot') )&& !data.IsDaylight ? 'text-white' : 'text-zinc-900'}
            `}>
              <img src={getImage(data.IconPhrase,data.IsDaylight)} alt="" className='absolute h-full w-full rounded-[inherit] brightness-[85%]' />

              <div className='flex justify-between p-4 absolute top-0 z-10 w-full h-full'>
                  
                <div className=' w-1/2 pr-4 flex flex-col justify-between'>
                
                  <div className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center text-lg relative'>
                      <IoLocationSharp/>
                      <h3 className='font-semibold'>{data.LocalizedName}</h3>
                      <div className=' cursor-pointer' onClick={pinCity}>
                        <IoHeartOutline className='text-2xl absolute top-1 z-[1]'/> 
                        <IoHeart 
                        className={`text-2xl absolute top-1 z-[0] duration-200
                        ${(verifyPin() || isPinned)? 'fill-red-400' : "fill-[rgba(240,240,240,.5)]"}
                          `}/>
                      </div>
                    </div>

                    <span>Today {actTime}</span>
                  </div>

                  <div className='text-center font-semibold'>
                    <h2 className='text-[80px]'>{data.Temperature.Value.toFixed(0)}º{data.Temperature.Unit}</h2>
                    <p className='capitalize'>{data.IconPhrase}</p>
                  </div>

                  <div className='flex justify-between '>

                    <div className="flex items-center gap-2">
                      <LuWindArrowDown/>
                      <p>{data.Pressure.Metric.Value} {data.Pressure.Metric.Unit}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <IoWaterOutline/>
                      <p>{data.RainProbability}%</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaWind/>
                      <p>{data.Wind.Speed.Value} {data.Wind.Speed.Unit}</p>
                    </div>

                  </div>
                </div>

                <div  className='bg-[rgba(228,228,231,.75)] text-zinc-900 rounded-xl w-1/2 p-4 flex flex-col justify-between'>
                  
            
                  <div className='font-semibold text-xl'>
                    <h3>Temperature</h3>
                  </div>
                  {
                    (chartData.length > 0)?
                    <LineChart
                    className='ml-[-25px]'
                      series={[{data:[chartData[0].Temperature.Value,chartData[1].Temperature.Value,chartData[2].Temperature.Value,chartData[3].Temperature.Value]}]}
                      height={130}
                      width={370}
                    />
                    :
                    <div className='text-center'>
                      <CircularProgress/>
                    </div>
                  }
                  <div className='flex justify-between gap-4'>
                    {
                      (chartData.length > 0)?
                        chartData.map((data:any,index:number)=>{

                          return(
                            <div className='text-center' key={index}>
                              <p className='font-semibold'>{data.formatedTime}</p>
                              <p >{data.Temperature.Value.toFixed(0)}º{data.Temperature.Unit}</p>
                            </div>
                          )
                        })
                      :
                      null
                    }
                    
                  </div>    
                  
                </div>
              </div>   
            
          </div>

        {/*Wind Display  */}
          <div className='rounded-xl bg-zinc-300 py-4 px-8 flex justify-between relative'>
            <div className='flex flex-col justify-between h-full'>
              <h3 className='font-semibold text-xl'>Wind</h3>
              <p>Today wind speed</p>
              <h3 className='font-semibold text-xl'>{data.Wind.Speed.Value} {data.Wind.Speed.Unit}</h3>
            </div>
            <img src="/assets/Compass.png" width={140} height={140} className='absolute right-0 top-0' alt="" />
          </div>

        {/*Rain chance Display  */}
          <div className='rounded-xl bg-zinc-300 py-4 px-8 flex justify-between'>
          <div id='rain-chance' className='flex flex-col justify-between h-full'>
              <h3 className='font-semibold text-xl'>Rain Chance</h3>
              <p>Next hour rain chance</p>
              <h3 className='font-semibold text-xl'>{data.RainProbability}%</h3>
            </div>
            <Gauge 
            width={100} 
            height={100} 
            value={data.RainProbability} 
            text={rainChance(data.RainProbability)} 
            outerRadius={45} 
            innerRadius={50} 
            cornerRadius={100} 
            className='font-bold'/>
          </div>

        {/*Pressure Display  */}
          <div className='rounded-xl bg-zinc-300 py-4 px-8 flex justify-between'>
          <div className='flex flex-col justify-between h-full'>
              <h3 className='font-semibold text-xl'>Pressure</h3>
              <p>Today pressure</p>
              <h3 className='font-semibold text-xl'>{data.Pressure.Metric.Value} {data.Pressure.Metric.Unit}</h3>
            </div>
            <GaugeContainer
              width={100}
              height={100}
              startAngle={-110}
              endAngle={110}
              value={20}
              outerRadius={45} innerRadius={50}
              cornerRadius={100}
            >
              <GaugeReferenceArc />
              <GaugeValueArc />
              <GaugePointer/>
            
            </GaugeContainer>
          </div>

        {/* UV Display */}
          <div id='uv-gauge' className='rounded-xl bg-zinc-300 py-4 px-8 flex justify-between'>
            <div className='flex flex-col justify-between h-full'>
              <h3 className='font-semibold text-xl'>UV Index</h3>
              <p>Today UV index</p>
              <h3 className='font-semibold text-xl'>{data.UVIndex}</h3>
            </div>
          <GaugeContainer
            width={100}
            height={100}
            startAngle={-110} 
            endAngle={110} 
            value={100}  
            outerRadius={47} 
            innerRadius={50} 
            cornerRadius={100}  
            className='font-bold'>
            <GaugeReferenceArc />
            <GaugeValueArc />
            <linearGradient id="Uv-Gradient">
              <stop offset="25%" stopColor="oklch(62.7% 0.194 149.214)" />
              <stop offset="50%" stopColor="oklch(85.2% 0.199 91.936)" />
              <stop offset="75%" stopColor="oklch(64.6% 0.222 41.116)" />
              <stop offset="100%" stopColor="oklch(57.7% 0.245 27.325)" />
            </linearGradient>
            <GaugeValueText text={data.UVIndexText}/>
          </GaugeContainer>
          </div>
        
        </div>
      }
      <NextDaysInfo cityKey={(params.key)? params.key : ''} />
    </Container>
  )
}

export default Home