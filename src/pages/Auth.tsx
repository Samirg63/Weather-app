//Components
import FormControl from "@mui/material/FormControl"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { GoogleLogin } from "@react-oauth/google";

//Function
import { useState, type ChangeEvent } from "react"
import AuthServices from "../services/Auth";


//Icons
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { FaEye,FaEyeSlash } from "react-icons/fa";

//Interfaces
import type { IuserData } from "../utils/interfaces";
import { googleAuth } from "../services/OAuth";

const Auth = () => {
  const [authMethod,setAuthMethod] = useState<"login"| "signin">('login')
  const [formData,setFormData] = useState<IuserData>({})
  const {authLoading,login,register} = AuthServices()
  const {loginWithOAuth} = googleAuth();


  function fadeAuthMessage(to:'login'|'signin'){
    const container:HTMLElement | null = document.getElementById('content-container')
    const loginContainer:HTMLElement | null = document.getElementById('login-container')
    const signInContainer:HTMLElement | null = document.getElementById('signin-container')
    let width:number = container!.offsetWidth

    if(to === 'signin'){

      container?.animate([
        {marginLeft:0},
        {marginLeft:'-'+width+'px'}
      ],
      {
        duration:200,
        fill:"forwards",
        easing:"ease-in"
      })

      loginContainer?.animate([
        {opacity:100},
        {opacity:0}
      ],{
        duration:150,
        fill:"forwards",
        easing:"ease-in"
      })
      signInContainer?.animate([
        {opacity:0},
        {opacity:100}
      ],{
        delay:150,
        duration:150,
        fill:"forwards",
        easing:"ease-in"
      })

    }else{
      container?.animate([
        {marginLeft:'-'+width+'px'},
        {marginLeft:0}
      ],
      {
        duration:200,
        fill:"forwards",
        easing:"ease-in"
      })

      signInContainer?.animate([
        {opacity:100},
        {opacity:0}
      ],{
        duration:150,
        fill:"forwards",
        easing:"ease-in"
      })
      loginContainer?.animate([
        {opacity:0},
        {opacity:100}
      ],{
        delay:150,
        duration:150,
        fill:"forwards",
        easing:"ease-in"
      })
    }
  }

  function showPassword(){
    const passwordInput:NodeListOf<HTMLInputElement> | null = document.querySelectorAll('div.password-input')
    const showIcon:NodeListOf<HTMLInputElement> | null = document.querySelectorAll('.showIcon')
    const dontShowIcon:NodeListOf<HTMLInputElement> | null = document.querySelectorAll('.dontShowIcon')

    const onlyInputs:HTMLInputElement[] = [] as HTMLInputElement[]
    passwordInput.forEach((node)=>{
      onlyInputs!.push(node.querySelector('input.MuiInputBase-input')!)
    })

    if(onlyInputs[0].type === 'password'){
      Object.keys(onlyInputs).map((index:any)=>{
          onlyInputs[index].type = 'text'    
      })
      Object.keys(showIcon).map((index:any)=>{
          showIcon[index].style.display = 'none'    
      })
      Object.keys(dontShowIcon).map((index:any)=>{
          dontShowIcon[index].style.display = 'block'  
      })

    }else{
      Object.keys(onlyInputs).map((index:any)=>{
        onlyInputs[index].type = 'password'    
      })
      Object.keys(showIcon).map((index:any)=>{
          showIcon[index].style.display = 'block'    
      })
      Object.keys(dontShowIcon).map((index:any)=>{
          dontShowIcon[index].style.display = 'none'  
      })
    }
  }

  function changeAuthMethod(){
    setFormData({})

    if(authMethod === "login"){
        setAuthMethod("signin")
        fadeAuthMessage('signin')
        
        
      
    }else{
      setAuthMethod("login")
      fadeAuthMessage('login')
        
    }
        
  }

  function handleChange(e:ChangeEvent<HTMLInputElement>){
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  function handleSubmit(){
    if(authMethod === 'login'){
      login(formData)
    }else if(authMethod === 'signin'){
      register(formData)
    }
  }

  return (
    <div id="auth-bg" className="w-full h-screen flex items-center justify-center">
      <div  className={`auth-boxShadow bg-trueWhite max-w-[800px] w-11/12 h-[500px] border border-zinc-300 rounded-4xl flex
        overflow-x-hidden
        `}>

          {/*Log in Container  */}
        <div id="content-container" className="h-full flex flex-col justify-center shrink-0 w-1/2 p-4">

        {
          (authLoading)?
          <div className="text-center">
            <CircularProgress/>
          </div>
          :
            <FormControl className="w-full gap-4">
                <h2 className="text-center font-bold text-3xl text-primary">Log in</h2>
                <TextField onChange={handleChange} variant="outlined" type="email"  label="E-mail" name="email" required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdOutlineEmail />
                      </InputAdornment>
                    ),
                  },
                }}  
                />

                <TextField onChange={handleChange} name="password" className="password-input" variant="outlined"   label="Password" type="password" required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <TbLockPassword />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end" className=" cursor-pointer">
                        <FaEye className="showIcon" onClick={showPassword}/>
                        <FaEyeSlash className="hidden cursor-pointer dontShowIcon" onClick={showPassword} />
                      </InputAdornment>
                    )
                  },
                }}  
                />

                <Button variant="contained" onClick={handleSubmit}>Log in</Button>

            </FormControl>
        }

          <div className="flex items-center my-4">
            <div className="h-[1px] w-4/12 bg-zinc-300"></div>
            <p className="w-4/12 px-2 text-center text-zinc-500">Or LogIn with</p>
            <div className="h-[1px] w-4/12 bg-zinc-300"></div>
          </div>
          <div className="flex justify-around">
          <GoogleLogin
            onSuccess={credentialResponse => {
              loginWithOAuth(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
          </div>
        </div>
          {/* Message container */}
        <div  className="w-1/2 bg-primary  h-full text-white flex items-center justify-center shrink-0">

          <div className="relative max-w-100 w-11/12 h-[52px]">
                    <div className="text-center absolute max-w-100 w-11/12 mx-auto" id="login-container">
                      <h2 className="font-semibold text-xl">Log In with email</h2>
                      <p>Don't have an account? <button onClick={changeAuthMethod} className="text-secondary underline cursor-pointer">Sign In!</button></p>
                    </div>
                    <div className="text-center absolute max-w-100 w-11/12 mx-auto opacity-0" id="signin-container">
                      <h2 className="font-semibold text-xl">Sign In our website</h2>
                      <p>Already have an account? <button onClick={changeAuthMethod} className="text-secondary underline cursor-pointer">Log In!</button></p>
                    </div>
      
          </div>
        
        </div>
          {/* Register container */}
        <div className="h-full shrink-0 w-1/2 p-4 flex flex-col justify-center">

        {
          (authLoading)?
            <div className="text-center">
              <CircularProgress/>
            </div>
          :
            <FormControl className={`w-full gap-4 `}>
                <h2 className="text-center font-bold text-3xl text-primary">Sign in</h2>
                <TextField onChange={handleChange} variant="outlined"  label="Username" name="username" required disabled={(authMethod === 'login')? true : false}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdOutlineEmail />
                      </InputAdornment>
                    ),
                  },
                }}  
                />
                <TextField onChange={handleChange} variant="outlined"  label="E-mail" name="email" required disabled={(authMethod === 'login')? true : false}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdOutlineEmail />
                      </InputAdornment>
                    ),
                  },
                }}  
                />

                <TextField onChange={handleChange} className="password-input" variant="outlined" label="Password" name="password" type="password" required disabled={(authMethod === 'login')? true : false}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <TbLockPassword />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end" className=" cursor-pointer">
                        <FaEye className="showIcon" onClick={showPassword}/>
                        <FaEyeSlash className="hidden cursor-pointer dontShowIcon" onClick={showPassword} />
                      </InputAdornment>
                    )
                  },
                }}  
                />

                <TextField onChange={handleChange} className="password-input" variant="outlined" label="Confirm Password" name="confirmPassword" type="password" required disabled={(authMethod === 'login')? true : false}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <TbLockPassword />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end" className=" cursor-pointer">
                        <FaEye className="showIcon" onClick={showPassword}/>
                        <FaEyeSlash className="hidden cursor-pointer dontShowIcon" onClick={showPassword} />
                      </InputAdornment>
                    )
                  },
                }}  
                />

                <Button onClick={handleSubmit} variant="contained">Sign in</Button>

            </FormControl>
        }
        </div>
      </div>
    </div>
  )
}

export default Auth