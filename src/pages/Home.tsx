import Container from '../components/Container'
import NextDaysInfo from '../components/NextDaysInfo'


import { LineChart } from '@mui/x-charts/LineChart';
import { IoLocationSharp,IoWaterOutline } from "react-icons/io5";
import { FaWind } from "react-icons/fa";
import { LuWindArrowDown } from "react-icons/lu";

import { Gauge,GaugeContainer,GaugeValueArc,GaugeReferenceArc, GaugeValueText,useGaugeState } from '@mui/x-charts/Gauge';

const Home = () => {
  
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
      <div className='w-9/12 grid grid-cols-2 grid-rows-4 py-2 px-24 gap-4'>
      
        <div className='rounded-xl relative bg-[url(/assets/Backgrounds/Snow.jpg)] flex justify-between text-zin-900 bg-no-repeat bg-cover row-span-2 col-span-2 p-4'>
                   
            <div className=' w-1/2 pr-4 flex flex-col justify-between'>
            
              <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center text-lg'>
                  <IoLocationSharp/>
                  <h3 className='font-semibold'>Gothan</h3>
                </div>

                <span>Today 19:04 PM</span>
              </div>

              <div className='text-center font-semibold'>
                <h2 className='text-[80px]'>16º</h2>
                <p className='capitalize'>mostly clear</p>
              </div>

              <div className='flex justify-between '>

                <div className="flex items-center gap-2">
                  <LuWindArrowDown/>
                  <p>720 Hpa</p>
                </div>
                <div className="flex items-center gap-2">
                  <IoWaterOutline/>
                  <p>32%</p>
                </div>
                <div className="flex items-center gap-2 text-zinc-900">
                  <FaWind/>
                  <p>12km/h</p>
                </div>

              </div>
            </div>

            <div  className='bg-[rgba(228,228,231,.75)] text-zinc-900 rounded-xl w-1/2 p-4 flex flex-col justify-between'>
              
        
              <div className='font-semibold text-xl'>
                <h3>Temperature</h3>
              </div>
              <LineChart
              className='ml-[-25px]'
                series={[{data:[15,14,16,12]}]}
                height={130}
                width={370}
              />
              <div className='flex justify-between gap-4'>
                <div className='text-center'>
                  <p>Morning</p>
                  <p className='font-semibold'>15º</p>
                </div>
                <div className='text-center'>
                  <p>Afternoon</p>
                  <p className='font-semibold'>14º</p>
                </div>
                <div className='text-center'>
                  <p>Evening</p>
                  <p className='font-semibold'>16º</p>
                </div>
                <div className='text-center'>
                  <p>Night</p>
                  <p className='font-semibold'>12º</p>
                </div>
              </div>    
              
            </div>
          
        </div>
        <div className='rounded-xl bg-zinc-300 py-4 px-8 flex justify-between relative'>
          <div className='flex flex-col justify-between h-full'>
            <h3 className='font-semibold text-xl'>Wind</h3>
            <p>Today wind speed</p>
            <h3 className='font-semibold text-xl'>12km/h</h3>
          </div>
          <img src="/assets/Compass.png" width={140} height={140} className='absolute right-0 top-0' alt="" />
        </div>
        <div className='rounded-xl bg-zinc-300 py-4 px-8 flex justify-between'>
        <div id='rain-chance' className='flex flex-col justify-between h-full'>
            <h3 className='font-semibold text-xl'>Rain Chance</h3>
            <p>Today rain chance</p>
            <h3 className='font-semibold text-xl'>32%</h3>
          </div>
          <Gauge 
          width={100} 
          height={100} 
          value={32} 
          text={'Low'} 
          outerRadius={45} 
          innerRadius={50} 
          cornerRadius={100} 
          className='font-bold'/>
        </div>

        <div className='rounded-xl bg-zinc-300 py-4 px-8 flex justify-between'>
        <div className='flex flex-col justify-between h-full'>
            <h3 className='font-semibold text-xl'>Pressure</h3>
            <p>Today pressure</p>
            <h3 className='font-semibold text-xl'>720 hpa</h3>
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

        <div id='uv-gauge' className='rounded-xl bg-zinc-300 py-4 px-8 flex justify-between'>
          <div className='flex flex-col justify-between h-full'>
            <h3 className='font-semibold text-xl'>UV Index</h3>
            <p>Today UV index</p>
            <h3 className='font-semibold text-xl'>2</h3>
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
            <stop offset="25%" stop-color="oklch(62.7% 0.194 149.214)" />
            <stop offset="50%" stop-color="oklch(85.2% 0.199 91.936)" />
            <stop offset="75%" stop-color="oklch(64.6% 0.222 41.116)" />
            <stop offset="100%" stop-color="oklch(57.7% 0.245 27.325)" />
          </linearGradient>
          <GaugeValueText text={"Low"}/>
        </GaugeContainer>
        </div>
      
      </div>
      <NextDaysInfo />
    </Container>
  )
}

export default Home