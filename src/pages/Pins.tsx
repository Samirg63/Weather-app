import { useEffect, useState } from "react"
import Widget from "../components/Widget"
import AccuWeather from "../services/AccuWeather"
import CircularProgress from "@mui/material/CircularProgress"
import LoginMessage from "../components/LoginMessage"

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

  function renderLoadings(){
    if(widgetsLoading){
      return(
        <div className="mt-6 text-center">
          <CircularProgress />
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