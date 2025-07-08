import { HiMagnifyingGlass } from "react-icons/hi2";
import { FaRegBell } from "react-icons/fa";
import { CiUser,CiLogin } from "react-icons/ci";
import { Link, useLocation } from 'react-router'
import React, { useEffect } from "react";

import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useState } from "react";



const Header = () => {
  const location = useLocation()

  if(location.pathname !== '/auth'){

    const [username,setUsername] = useState<string>()
    const [userPopper,setUserPopper] = useState<null | HTMLElement>(null)

    useEffect(()=>{
      let info:any = JSON.parse(localStorage.getItem('auth')!)
      if(info){
        setUsername(info.user.username)
      }
    },[])
    
    
    function handleShowPopper(e:React.MouseEvent<HTMLElement>){
      setUserPopper(userPopper ? null : e.currentTarget)
    }

    function hidePopper(){
      setUserPopper(null)
    }

  return (
    <header className="p-6 flex justify-between w-full border-b-1 border-zinc-300">
      <form className="flex gap-2 items-center">
        <HiMagnifyingGlass/>
        <input type="search" className="outline-0" placeholder="Search something here" name="" id="" />
      </form>

      <div className="flex gap-4">
        <button className=" cursor-pointer"><FaRegBell className="text-xl"/></button>
        <ClickAwayListener onClickAway={hidePopper}>
          <div id="user" onClick={handleShowPopper} aria-describedby="userPopper" className="cursor-pointer w-10 h-10 rounded-full bg-zinc-200 flex justify-center items-center">
          <CiUser className="text-xl"/>
        </div>
        </ClickAwayListener>
      </div>
      <Popper id="userPopper" open={Boolean(userPopper)} anchorEl={userPopper} placement="left"
        className="bg-[rgb(235,235,235)] rounded-xl border-1 border-zinc-500"
      >
       <div id="arrow" data-popper-arrow ></div>
        <div className="py-2 px-4">
          {
            (username)?
            <h3>Welcome {username}</h3>
            :
            <Link to={'/auth'} className="flex items-center gap-1"><CiLogin/> <span className="font-semibold">LogIn</span></Link>
          }
        </div>
      </Popper>
    </header>
  )
}
}



export default Header