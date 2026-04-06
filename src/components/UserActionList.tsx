import { Link } from "react-router"
import { CiLogin } from "react-icons/ci"
import { useEffect, useState } from "react"
import type { IuserData } from "../utils/interfaces"
import UserServices from "../services/User"
import AuthServices from "../services/Auth"




const UserActionList = () => {

    const [userInfo,setUserInfo] = useState<IuserData|null>(null)
    const {tokenToData} = UserServices()
    const {logout} = AuthServices()

    useEffect(()=>{
        async function fetchUser(){
            if(localStorage.getItem('token')){
                try {
                    let data = await tokenToData(JSON.parse(localStorage.getItem('token')!).token)
                    setUserInfo(data)
                } catch (error) {
                    logout();
                }
            }
        }

        fetchUser()
    })

    return (
        <div className="py-2 px-4">

            {(userInfo)?
            <h3>Welcome {userInfo.username}</h3>
            :
            <Link to={'/auth'} className="flex items-center gap-1"><CiLogin/> <span className="font-semibold">LogIn</span></Link>
            }
        </div>
    
  )
}

export default UserActionList