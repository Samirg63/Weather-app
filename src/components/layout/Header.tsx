import { HiMagnifyingGlass } from "react-icons/hi2";
import { FaRegBell } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { useLocation } from 'react-router'
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Drawer from "@mui/material/Drawer";
import Navigation from "./Navigation";

import SearchBox from "../SearchBox";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useState } from "react";
import AccuWeather from "../../services/AccuWeather";
import UserActionList from "../UserActionList";




const Header = () => {
  const location = useLocation()
  const {searchByText,searchData,searchLoading,setSearchLoading} = AccuWeather()
  const [isSearchOpen,setIsSearchOpen] = useState<boolean>(false)
  const [searchText,setSearchText] = useState<string>('')
  const [userPopper,setUserPopper] = useState<null | HTMLElement>(null)
  const [showNav,setShowNav] = useState<boolean>(false);
  
  if(location.pathname !== '/auth'){

    
    
  function handleShowPopper(e:React.MouseEvent<HTMLElement>){
    setUserPopper(userPopper ? null : e.currentTarget)
  }

  function hidePopper(){
    setUserPopper(null)
  }

  let timeout:NodeJS.Timeout;
  function search(e:React.ChangeEvent<HTMLInputElement>){
    setSearchLoading(true)
    let searchString:string = e.target.value
    setSearchText(searchString)
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      searchByText(encodeURI(searchString))
    }, 2000);

  }
  
  function setSearchValue(city:string){
  setSearchText(city)
  setIsSearchOpen(false)
  }

  function toggleNavigation(){
    setShowNav(!showNav)
  }


  return (
    <header className="p-6 flex justify-between w-full border-b-1 border-zinc-300">
      <button className="text-2xl mr-4 cursor-pointer max-[1190px]:block hidden" onClick={toggleNavigation}><GiHamburgerMenu/></button>
      <Drawer open={showNav} onClose={toggleNavigation}>
        <Navigation isOpen={showNav} setOpen={toggleNavigation}/>
      </Drawer>
    

      <ClickAwayListener  onClickAway={()=>{setIsSearchOpen(false)}}>   
        <div className="relative max-w-[700px] w-6/12 flex">
          <form className="flex gap-2 items-center w-full">
            <HiMagnifyingGlass/>
            <input value={searchText} type="search" className="outline-0  w-full" placeholder="Search something here" name="search" id="" 
            
            onClick={(e:any)=>{
              if(e.target.value){
                setIsSearchOpen(true)
              }
            }}

            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                if(!isSearchOpen){
                  setIsSearchOpen(true)
                }else if(e.target.value === ''){
                  setIsSearchOpen(false)
                }
                search(e)
            }} />
          </form>
          {
            (isSearchOpen) && <SearchBox searchData={searchData} changeSearch={setSearchValue} loading={searchLoading}/>
          }
        </div>
      </ClickAwayListener>

      <div className="flex gap-4">
        <button className=" cursor-pointer"><FaRegBell className="text-xl"/></button>
        <ClickAwayListener onClickAway={hidePopper}>
          <div id="user" onClick={handleShowPopper} aria-describedby="userPopper" className="cursor-pointer w-10 h-10 rounded-full bg-zinc-200 flex justify-center items-center">
          <CiUser className="text-xl"/>
        </div>
        </ClickAwayListener>
      </div>

      <Popper id="userPopper" open={Boolean(userPopper)} anchorEl={userPopper} placement="left"
        className="bg-[rgb(235,235,235)] rounded-xl border-1 border-zinc-500 popper"
      >
       <div className="arrow" data-popper-arrow ></div>
        <UserActionList/>
      </Popper>
    </header>
  )
  }
}



export default Header