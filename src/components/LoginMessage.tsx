import { Link } from "react-router"


const LoginMessage = () => {
  return (
    <div className="flex p-2 items-center">
        <Link to={'/auth'} className="bg-blue-700 py-1 px-2 text-gray-200 rounded-lg hover:bg-blue-800 duration-100">Log in</Link>
        <p className="ml-2">to use this feature!</p>
      </div>
  )
}

export default LoginMessage