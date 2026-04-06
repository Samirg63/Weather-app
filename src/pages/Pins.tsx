import { useEffect, useState } from "react"
import Widget from "../components/Widget"
import AccuWeather from "../services/AccuWeather"
import CircularProgress from "@mui/material/CircularProgress"
import LoginMessage from "../components/LoginMessage"
import UserServices from "../services/User"
import type { IuserData } from "../utils/interfaces"
import AuthServices from "../services/Auth"

const Pins = () => {
  const {getWidgetsData,widgetsData,widgetsLoading} = AccuWeather()
  const {logout} = AuthServices()
  const [userData,setUserData] = useState<IuserData|null>(null)
  const {tokenToData} = UserServices()

  useEffect(()=>{

    async function fetchData(){
      try {
        let user = await tokenToData(JSON.parse(localStorage.getItem('token')!).token)
        let data = JSON.parse(localStorage.getItem('userData')!)
        setUserData({...user,...data})
        await getWidgetsData(data.pins)     
      } catch (error) {
        //logout()
      }
    }

    if(localStorage.getItem('token')){
      fetchData()
    }
  },[])

  if(!userData){
    return (
      <LoginMessage/>
    )
  }

  function renderLoadings(){
    if(widgetsLoading){
      return(
        <div className="mt-6 text-center ">
          <CircularProgress className='absolute top-1/3 left-7/12 -translate-y-1/2 -translate-x-full'/>
        </div>
      )
    }else if(widgetsData.length === 0){
      return(
       <h1>You don't have pins!</h1>
      )
    }
  }

  return (
    <div className="p-4 flex flex-wrap gap-2">
  {
    (widgetsLoading || widgetsData.length === 0)?
    renderLoadings()
    :
    (widgetsData).map((data:any,index:number)=>(
      
        <Widget 
        cityKey={userData!.pins![index]} 
        city={data.LocalizedName} 
        iconPhrase={data.IconPhrase} 
        state={data.AdministrativeArea.ID} 
        temperature={data.Temperature} 
        unit={data.Unit} 
        IsDaylight={data.IsDaylight} 
        key={index}/>
      ))
  }

    </div>
  )
}

export default Pins