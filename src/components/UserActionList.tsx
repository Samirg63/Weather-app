import { Link } from "react-router"
import { CiLogin } from "react-icons/ci"
import { useState } from "react"




const UserActionList = () => {

    const [userInfo] = useState<any>(JSON.parse(localStorage.getItem('auth')!))


    return (
        <div className="py-2 px-4">

            {(userInfo)?
            <h3>Welcome {userInfo.user.username}</h3>
            :
            <Link to={'/auth'} className="flex items-center gap-1"><CiLogin/> <span className="font-semibold">LogIn</span></Link>
            }
        </div>
    
  )
}

export default UserActionList