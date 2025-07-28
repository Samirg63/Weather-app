
import CircularProgress from "@mui/material/CircularProgress"
import { Link } from "react-router"

interface Props{
    changeSearch:Function,
    loading:boolean,
    searchData:any[]
}


const SearchBox = ({changeSearch,loading,searchData}:Props) => {

  return (
    <ul className="border border-gray-400 rounded-b-2xl top-14 w-[inherit] ml-6 fixed z-90 bg-gray-200 text-center">
        
        {
            (loading || !searchData.length)?
             <CircularProgress className="text-center my-2"/>   
            :
            searchData.map((item,index)=>{
                if(index === 0 && index === searchData.length - 1){
                    return(
                        <Link key={index} to={`/${item.Key}`} onClick={()=>{changeSearch(item.LocalizedName)}} className="px-4 py-1 text-gray-600 cursor-pointer hover:bg-zinc-300 flex justify-between duration-200 rounded-[inherit]">
                            <span>{item.LocalizedName}</span>
                            <span>{item.AdministrativeArea.ID}</span>
                        </Link>
                    )
                }
                else if(index === 0){
                    return(
                        <Link key={index} to={`/${item.Key}`} onClick={()=>{changeSearch(item.LocalizedName)}} className="px-4 py-1 text-gray-600 cursor-pointer hover:bg-zinc-300 flex justify-between duration-200">
                            <span>{item.LocalizedName}</span>
                            <span>{item.AdministrativeArea.ID}</span>
                        </Link>
                    )
                }else if(index === searchData.length - 1){
                    return(
                        <Link key={index} to={`/${item.Key}`} onClick={()=>{changeSearch(item.LocalizedName)}} className=" flex justify-between border-t border-gray-400 px-4 py-1 text-gray-600 cursor-pointer hover:bg-zinc-300 rounded-[inherit] duration-200">
                            <span>{item.LocalizedName}</span>
                            <span>{item.AdministrativeArea.ID}</span>
                        </Link>
                    )
                }else{
                    return(
                        <Link key={index} to={`/${item.Key}`} onClick={()=>{changeSearch(item.LocalizedName)}} className="border-t border-gray-400 px-4 py-1 text-gray-600 cursor-pointer hover:bg-zinc-300 flex justify-between duration-200">
                            <span>{item.LocalizedName}</span>
                            <span>{item.AdministrativeArea.ID}</span>
                        </Link>
                    )
                }
            })
        }
        
    </ul>
  )
}

export default SearchBox