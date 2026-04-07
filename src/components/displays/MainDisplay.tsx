import { useEffect, useState} from "react"

import UserServices from "../../services/User"
import convertData from "../../utils/convertData"

import { IoLocationSharp,IoHeartOutline,IoHeart,IoWaterOutline } from "react-icons/io5"
import { TiHome,TiHomeOutline } from "react-icons/ti";
import { LuWindArrowDown } from "react-icons/lu"
import { FaWind } from "react-icons/fa"
import { LineChart } from "@mui/x-charts"
import CircularProgress from "@mui/material/CircularProgress"
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import LoginMessage from "../LoginMessage";
import type { IuserData } from "../../utils/interfaces";

type Props = {
    IconPhrase:string,
    IsDaylight:boolean,
    LocalizedName:string,
    Temperature:{Unit:string,Value:number},
    Pressure:{Metric:{Unit:string,Value:number}},
    RainProbability:number,
    Wind:{Speed:{Unit:string,Value:number}},
    cityKey:string,
    chartData:any[]

}

const MainDisplay = ({IconPhrase,IsDaylight,LocalizedName,Temperature,Pressure,RainProbability,Wind,cityKey,chartData}: Props) => {
  
  const [isPinned,setIsPinned] = useState<boolean>(false)
  const [isHome,setIsHome] = useState<boolean>(false)
  const [userData,setUserData] = useState<IuserData|null>(null)
  const [actTime,setActTime] = useState<string>('00:00')
  const [popperAnchor,setPopperAnchor] = useState<null | HTMLElement>(null)

  const {updatePin, updateHome,tokenToData} = UserServices()
  const {getImage} = convertData()


  useEffect(()=>{

    function verifyPin(data:IuserData) :boolean{
      if(data){
        
        let result:boolean = false;
        data.pins!.map((item:string)=>{
          
          if(item === cityKey){
            result = true;
          }
        })

        return result
      }else{
        return false;
      }
    }

    function verifyHome(data:IuserData) :boolean{
         
      if(data){
        return (cityKey === data.home)? true : false
      }else{
        return false;
      }
    }


    async function fetchUserData(){
      let user = await tokenToData(JSON.parse(localStorage.getItem('token')!).token)
      let data = JSON.parse(localStorage.getItem('userData')!)
      setIsPinned(verifyPin(data))
      setIsHome(verifyHome(data))
      setUserData({...user,...data})


    }

    if(localStorage.getItem('token')){
      fetchUserData()
    }

    const date = new Date()
    if(date.getHours() >= 12){
      setActTime(String(date.getHours()).padStart(2,'0')+':'+String(date.getMinutes()).padStart(2,'0')+' PM')
    }else{
      setActTime(String(date.getHours()).padStart(2,'0')+':'+String(date.getMinutes()).padStart(2,'0')+' AM')
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
  

  async function pinCity(e:MouseEvent){
    if(userData){    
      if(isPinned){
        let pinnedCitys:string[] = userData.pins!.filter((key:string) => key !== cityKey) 
        if(await updatePin(pinnedCitys,userData._id!)){
          let newUserData = userData
          newUserData.pins = pinnedCitys
          setUserData(newUserData)
          localStorage.setItem('userData',JSON.stringify({home:newUserData.home,pins:newUserData.pins}))
          setIsPinned(false)    
        }
      }else{
        let pinnedCitys:string[] = userData.pins!
        pinnedCitys.push(cityKey)
  
        if(await updatePin(pinnedCitys,userData._id!)){
          let newUserData = userData
          newUserData.pins = pinnedCitys
          setUserData(newUserData)
          localStorage.setItem('userData',JSON.stringify({home:newUserData.home,pins:newUserData.pins}))
          setIsPinned(true)  
        }
        
      }
    }else{
      handlePopper(e.target!)
    }
  }

  async function pinHome(e:any){
    
    if(userData){    
      if(isHome){    
        if(await updateHome('',userData._id!)){
          let newUserData = userData
          newUserData.home = ''
          setUserData(newUserData)
          localStorage.setItem('userData',JSON.stringify({home:newUserData.home,pins:newUserData.pins}))
          setIsHome(false)    
        }
      }else{
        if(await updateHome(cityKey,userData._id!)){
          let newUserData = userData
          newUserData.home = cityKey
          setUserData(newUserData)
          localStorage.setItem('userData',JSON.stringify({home:newUserData.home,pins:newUserData.pins}))
          setIsHome(true)  
        }
        
      }
    }else{
      handlePopper(e.target!)
      
    }
  }

  
  function handlePopper(element:any){
      setPopperAnchor(element)
  }
  
  return (
    <div className={`rounded-xl relative bg-zinc-400  text-zin-900 col-span-2 row-span-2
        ${(IconPhrase.toLocaleLowerCase().includes('clear') || IconPhrase.toLocaleLowerCase().includes('hot') ) && !IsDaylight ? 'text-white' : 'text-zinc-900'}
        `}>
          <img src={getImage(IconPhrase,IsDaylight)} alt="" className='absolute h-full w-full rounded-[inherit] brightness-[85%]' />

          <div className='flex justify-between p-4 absolute top-0 z-10 w-full h-full'>
              
            <div className=' w-1/2 max-[1280px]:w-full pr-4 flex flex-col justify-between'>
            
              <div className='flex justify-between items-center'>
                   
                  <div className='flex gap-2 items-center text-lg relative'>
                    <IoLocationSharp/>
                    <h3 className='font-semibold'>{LocalizedName}</h3>
                  </div>
                

                <span>Today {actTime}</span>
              </div>

                <ClickAwayListener onClickAway={()=>(setPopperAnchor(null))}>
                <div className="relative -top-5 max-[1025px]:-top-[5%]">
                  <div className='cursor-pointer' aria-describedby="LogInPopper" onClick={(e:any)=>{pinCity(e)}}>
                      <IoHeartOutline className='text-2xl absolute top-1 z-[1]'/> 
                      <IoHeart 
                      className={`text-2xl absolute top-1 z-[0] duration-200
                      ${(isPinned)? 'fill-red-400' : "fill-[rgba(240,240,240,.5)]"}
                        `}/>
                  </div>
                  <div className=' cursor-pointer ml-6' onClick={(e:any)=>{pinHome(e)}}>
                      <TiHomeOutline className='text-2xl absolute top-1 z-[1] '/> 
                      <TiHome 
                      className={`text-2xl absolute top-1 z-[0] duration-200
                        ${(isHome)? 'fill-fuchsia-300 ' : "fill-[rgba(240,240,240,.5)]"}
                        `}/>
                        
                  </div>
                </div>
                </ClickAwayListener>
              <Popper id="LogInPopper" open={Boolean(popperAnchor)} anchorEl={popperAnchor} placement="bottom" className="bg-[rgb(235,235,235)] rounded-xl border-1 border-zinc-500 popper mt-4 absolute z-20">
                <div className="arrow" data-popper-arrow ></div>
                <LoginMessage/>
              </Popper>

              <div className='text-center font-semibold'>
                <h2 className='text-[80px]'>{Temperature.Value.toFixed(0)}º{Temperature.Unit}</h2>
                <p className='capitalize'>{IconPhrase}</p>
              </div>

              <div className='flex justify-between '>

                <div className="flex items-center gap-2">
                  <LuWindArrowDown/>
                  <p>{Pressure.Metric.Value} {Pressure.Metric.Unit}</p>
                </div>
                <div className="flex items-center gap-2">
                  <IoWaterOutline/>
                  <p>{RainProbability}%</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaWind/>
                  <p>{Wind.Speed.Value} {Wind.Speed.Unit}</p>
                </div>

              </div>
            </div>

            <div  className='max-[1280px]:hidden bg-[rgba(228,228,231,.75)] text-zinc-900 rounded-xl w-1/2 p-4 flex flex-col justify-between'>
              
        
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
  )
}

export default MainDisplay