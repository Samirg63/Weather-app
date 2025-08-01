//MyComponents
import Container from '../components/Container'
import NextDaysInfo from '../components/NextDaysInfo'
import MainDisplay from '../components/displays/MainDisplay';

//Components

import { Gauge,GaugeContainer,GaugeValueArc,GaugeReferenceArc, GaugeValueText,useGaugeState } from '@mui/x-charts/Gauge';
import CircularProgress from '@mui/material/CircularProgress';

//Function
import { useEffect } from 'react';
import { useParams } from 'react-router';

//MyFunction
import AccuWeather from '../services/AccuWeather';
import convertData from '../utils/convertData';


const Home = () => {
  const {data, getDataByLatLong,getAllDataByKey,loading,chartData,getNextHoursInfo, getDefaultCity} = AccuWeather()
  const {rainChance} = convertData()
  const params = useParams()
  const userAuthData = JSON.parse(localStorage.getItem('auth')!);
  
  
  
  

  useEffect(()=>{
   
    if(params.key){
      async function fetchData(){
        await getAllDataByKey(params.key!)
        await getNextHoursInfo(params.key!)   
      }
        fetchData()    
    }else if(userAuthData && userAuthData.user.home){
      async function fetchData(){
        await getAllDataByKey(userAuthData.user.home)
        await getNextHoursInfo(userAuthData.user.home)   
      }
        fetchData()   
    }else{
      try {
        async function fetchData(){
          let Key = await getDefaultCity()
          await getAllDataByKey(Key)
          await getNextHoursInfo(Key)
        }
        fetchData()
      } catch (error) {
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
     
       
    }
      
  },[params])

  
  function getNextDaysKey(){
    if(params.key){
      return params.key
    }else if(userAuthData.user.home){
      return userAuthData.user.home
    }
     else{
      return ''
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

        <div className='w-9/12 max-md:w-full grid grid-cols-2 grid-rows-4 py-2 px-24 gap-4 h-full'>
        
        {/* Main Display */}
        <MainDisplay IconPhrase={data.IconPhrase} IsDaylight={data.IsDaylight} LocalizedName={data.LocalizedName} Pressure={data.Pressure} RainProbability={data.RainProbability} Temperature={data.Temperature} Wind={data.Wind} chartData={chartData} cityKey={data.Key} />

        {/*Wind Display  */}
          <div className='rounded-xl bg-zinc-300 py-4 px-8 flex justify-between relative'>
            <div className='flex flex-col justify-between h-full'>
              <h3 className='font-semibold text-xl'>Wind</h3>
              <p>Today wind speed</p>
              <h3 className='font-semibold text-xl'>{data.Wind.Speed.Value} {data.Wind.Speed.Unit}</h3>
            </div>
            <img src="/assets/Compass.png" width={140} height={140} className='max-md:hidden absolute right-0 top-0' alt="" />
          </div>

        {/*Rain chance Display  */}
          <div className='rounded-xl bg-zinc-300 py-4 px-8 flex justify-between'>
          <div id='rain-chance' className='flex flex-col justify-between h-full'>
              <h3 className='font-semibold text-xl'>Rain Chance</h3>
              <p>Next hour rain chance</p>
              <h3 className='font-semibold text-xl'>{data.RainProbability}%</h3>
            </div>
            <div className='max-md:hidden'>
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
          </div>

        {/*Pressure Display  */}
          <div className='rounded-xl bg-zinc-300 py-4 px-8 flex justify-between'>
          <div className='flex flex-col justify-between h-full'>
              <h3 className='font-semibold text-xl'>Pressure</h3>
              <p>Today pressure</p>
              <h3 className='font-semibold text-xl'>{data.Pressure.Metric.Value} {data.Pressure.Metric.Unit}</h3>
            </div>
            <div className='max-md:hidden'>
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
          </div>

        {/* UV Display */}
          <div id='uv-gauge' className='rounded-xl bg-zinc-300 py-4 px-8 flex justify-between'>
            <div className='flex flex-col justify-between h-full'>
              <h3 className='font-semibold text-xl'>UV Index</h3>
              <p>Today UV index</p>
              <h3 className='font-semibold text-xl'>{data.UVIndex}</h3>
            </div>
            <div className='max-md:hidden'>            
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
        
        </div>
      }


      <NextDaysInfo cityKey={getNextDaysKey()} />
    </Container>
  )
}

export default Home