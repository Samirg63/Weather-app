import { Link } from "react-router"
import { LuLayoutDashboard } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";

import { useLocation } from "react-router";
import AuthServices from "../../services/Auth";


interface Props{
  isOpen?:boolean,
  setOpen?:Function
}

const Navigation = ({isOpen = false,setOpen}:Props) => {
  const location = useLocation()
  const {logout} = AuthServices()


  return (
    <div className={` border-r-2 h-screen border-gray-300 bg-primary text-white flex flex-col justify-between py-6 
      ${(!isOpen) && 'max-[1190px]:hidden'}
    `}>
      <div> 
        <div className="flex items-center px-8" >
          <img src="https://placehold.co/40" alt="" />
          <h1 className="font-bold ml-2">Weather app</h1>
        </div>

        <nav className=" space-y-2 font-semibold pl-8 mt-24">
          <Link onClick={()=>{(setOpen)? setOpen() : null}} className={`flex gap-2 items-center py-2 border-secondary ${(location.pathname === '/')?"border-r-2" :null }`} to={'/'}><LuLayoutDashboard/> Dashboard</Link>
          <Link onClick={()=>{(setOpen)? setOpen() : null}} className={`flex gap-2 items-center py-2 border-secondary ${(location.pathname === '/pins')?"border-r-2" :null }`} to={'/pins'}><FaRegHeart/> Favorites</Link>
        </nav>
      </div>

      <div className="pl-8">
        <button onClick={logout} className="flex gap-2 items-center cursor-pointer" ><CiLogout/> Logout</button>
      </div>
    </div>
  )
}

export default Navigation