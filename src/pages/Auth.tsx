import FormControl from "@mui/material/FormControl"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import { useState } from "react"

import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";

import { FaEye,FaEyeSlash } from "react-icons/fa";
import Button from "@mui/material/Button";

const Auth = () => {
  const [authMethod,setAuthMethod] = useState<"login"| "signin">('login')


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
    const passwordInput:NodeListOf<HTMLInputElement> | null = document.querySelectorAll('input#password-input')
    const showIcon:NodeListOf<HTMLInputElement> | null = document.querySelectorAll('.showIcon')
    const dontShowIcon:NodeListOf<HTMLInputElement> | null = document.querySelectorAll('.dontShowIcon')

    if(passwordInput[0].type === 'password'){
      Object.keys(passwordInput).map((index:any)=>{
          passwordInput[index].type = 'text'    
      })
      Object.keys(showIcon).map((index:any)=>{
          showIcon[index].style.display = 'none'    
      })
      Object.keys(dontShowIcon).map((index:any)=>{
          dontShowIcon[index].style.display = 'block'  
      })

    }else{
      Object.keys(passwordInput).map((index:any)=>{
        passwordInput[index].type = 'password'    
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
    
    if(authMethod === "login"){
        setAuthMethod("signin")
        fadeAuthMessage('signin')
        
        
      
    }else{
      setAuthMethod("login")
      fadeAuthMessage('login')
        
    }
        
    }

  return (
    <div id="auth-bg" className="w-full h-screen flex items-center justify-center">
      <div  className={`auth-boxShadow bg-trueWhite w-[800px] h-[500px] border border-zinc-300 rounded-4xl flex
        overflow-x-hidden
        `}>
        <div id="content-container" className="h-full flex flex-col justify-center shrink-0 w-1/2 p-4">
        <FormControl className="w-full gap-4">
            <h2 className="text-center font-bold text-3xl text-primary">Log in</h2>
            <TextField variant="outlined"  label="E-mail" required
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

            <TextField className="passwordInput" variant="outlined" id="password-input"  label="Password" type="password" required
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

           <Button variant="contained">Log in</Button>

          </FormControl>

          <div className="flex items-center my-4">
            <div className="h-[1px] w-4/12 bg-zinc-300"></div>
            <p className="w-4/12 px-2 text-center text-zinc-500">Or LogIn with</p>
            <div className="h-[1px] w-4/12 bg-zinc-300"></div>
          </div>
          <div className="flex justify-around">
            <Button variant="outlined" className="p-2">---</Button>
            <Button variant="outlined" className="p-2">---</Button>
            <Button variant="outlined" className="p-2">---</Button>
          </div>
        </div>
        <div  className="w-1/2 bg-primary  h-full text-white flex items-center justify-center shrink-0">

          <div className="relative w-100 h-[52px]">
                    <div className="text-center absolute w-100 mx-auto" id="login-container">
                      <h2 className="font-semibold text-xl">Log In with email</h2>
                      <p>Don't have an account? <button onClick={changeAuthMethod} className="text-secondary underline cursor-pointer">Sign In!</button></p>
                    </div>
                    <div className="text-center absolute w-100 mx-auto opacity-0" id="signin-container">
                      <h2 className="font-semibold text-xl">Sign In our website</h2>
                      <p>Already have an account? <button onClick={changeAuthMethod} className="text-secondary underline cursor-pointer">Log In!</button></p>
                    </div>
      
          </div>
        
        </div>
        <div className="h-full shrink-0 w-1/2 p-4 flex flex-col justify-center">

        <FormControl className="w-full gap-4">
            <h2 className="text-center font-bold text-3xl text-primary">Sign in</h2>
            <TextField variant="outlined"  label="Username" required
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
            <TextField variant="outlined"  label="E-mail" required
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

            <TextField className="passwordInput" variant="outlined" id="password-input"  label="Password" type="password" required
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

            <TextField className="passwordInput" variant="outlined" id="password-input"  label="Confirm Password" type="password" required
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

           <Button variant="contained">Sign in</Button>

          </FormControl>
        </div>
      </div>
    </div>
  )
}

export default Auth