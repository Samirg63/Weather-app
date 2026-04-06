import { Link } from "react-router"


const LoginMessage = () => {
  return (
    <div className="flex justify-center">

          <div className="p-2 mt-12  bg-primary  text-white rounded-lg w-90 shadow-black/50 shadow-lg">
              <h2 className="text-xl font-semibold text-center">Discover, save, and organize your favorite cities.</h2>
              <p className=" text-center">Log in now and enjoy the full experience!</p>
              <Link to={'/auth'} className="bg-white py-1 px-2 mt-5 text-primary w-30 mx-auto text-center font-semibold block rounded-lg hover:bg-white/90 duration-200">Log In</Link>
          </div>
    </div>
    
    
  )
}

export default LoginMessage