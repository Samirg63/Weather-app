import { HiMagnifyingGlass } from "react-icons/hi2";
import { FaRegBell } from "react-icons/fa";

const Header = () => {
  return (
    <header className="p-6 flex justify-between w-full border-b-1 border-zinc-300">
      <form className="flex gap-2 items-center">
        <HiMagnifyingGlass/>
        <input type="search" className="outline-0" placeholder="Search something here" name="" id="" />
      </form>

      <div className="flex gap-4">
        <button className=" cursor-pointer"><FaRegBell className="text-xl"/></button>
        <div id="user" className="w-10 h-10 rounded-full bg-primary cursor-pointer"></div>
      </div>
    </header>
  )
}

export default Header