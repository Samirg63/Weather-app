import { useEffect, useState } from "react"
import Widget from "../components/Widget"
import AccuWeather from "../services/AccuWeather"
import CircularProgress from "@mui/material/CircularProgress"
import LoginMessage from "../components/loginMessage"

const Pins = () => {
  const {getWidgetsData,widgetsData,widgetsLoading} = AccuWeather()
  const [userData,setUserData] = useState<any>(null)
  useEffect(()=>{

    if(localStorage.getItem('auth')){
      let user = JSON.parse(localStorage.getItem('auth')!)

      setUserData(user)
      fetchData(user)
         
    }
    async function fetchData(userInfo:any){
      
        await getWidgetsData(userInfo.user.pins)
      
    }
  },[])

  if(!userData){
    return (
      <LoginMessage/>
    )
  }

  return (
    <div className="p-4 flex flex-wrap gap-2">
  {
    (widgetsLoading || widgetsData.length === 0)?
    <div className="mt-6 text-center">
      <CircularProgress />
    </div>
    :
    (widgetsData).map((data:any,index:number)=>(
      <Widget 
      cityKey={userData.user.pins[index]} 
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