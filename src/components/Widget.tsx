import convertData from "../utils/convertData"
import { useNavigate } from "react-router"


interface Props{
  temperature:number,
  unit:string,
  city:string,
  state:string,
  iconPhrase:string,
  IsDaylight:boolean,
  cityKey:string
}

const Widget = ({temperature,unit,city,state,iconPhrase,IsDaylight,cityKey}:Props) => {
  const navigate = useNavigate()
  const {getWidget} = convertData()

  function redirect(){
    return navigate('/'+cityKey)
  }

  return (
    <div onClick={redirect} className="relative w-[150px] h-[150px] rounded-2xl cursor-pointer">
      <img src={getWidget(iconPhrase,IsDaylight)} className="w-full h-full" alt="" />
        <div className="absolute top-0 w-full h-full rounded-2xl bg-[rgba(0,0,0,.3)] hover:bg-[rgba(0,0,0,.1)] duration-200 text-white p-2 flex flex-col justify-between">
            <h2 className="text-3xl">{temperature.toFixed(0)}º{unit}</h2>
            <p className="text-lg">{city.slice(0,10)} - {state}</p>
        </div>
    </div>
  )
}

export default Widget