import { useState } from "react"

const Auth = () => {
  const [authMethod,setAuthMethod] = useState<"login"| "signin">('login')


  function changeAuthMethod(){
    const container:HTMLElement | null = document.getElementById('content-container')
    let width:number = container!.offsetWidth

    if(authMethod === "login"){
        setAuthMethod("signin")
        container?.animate([
          {marginLeft:0},
          {marginLeft:'-'+width+'px'}
        ],
        {
          duration:200,
          fill:"forwards",
          easing:"ease-in"
        })
      
    }else{
      setAuthMethod("login")
        container?.animate([
          {marginLeft:'-'+width+'px'},
          {marginLeft:0}
        ],
        {
          duration:200,
          fill:"forwards",
          easing:"ease-in"
        })
    }
        
    }

  return (
    <div id="auth-bg" className="w-full h-screen flex items-center justify-center">
      <div  className={`auth-boxShadow bg-trueWhite w-[800px] h-[500px] border border-zinc-300 rounded-4xl flex
        overflow-x-hidden
        `}>
        <div id="content-container" className="h-full shrink-0 max-w-1/2 p-4">
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto sit ab cumque praesentium delectus odit aut officiis id voluptatem neque similique voluptatum quasi libero omnis, architecto nulla, necessitatibus laudantium cupiditate?</p>
        </div>
        <div  className="w-1/2 bg-primary  h-full text-white flex items-center justify-center shrink-0">
          <div className="text-center">
            <h2 className="font-semibold text-xl">Log In with email</h2>
            <p>Don't have an account? <button onClick={changeAuthMethod} className="text-secondary underline cursor-pointer">Sign In!</button></p>
          </div>
        
        </div>
        <div className="h-full shrink-0 max-w-1/2 p-4">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos mollitia odit temporibus vitae veniam iste nostrum incidunt, iusto rerum et soluta cumque earum beatae sit dolores est recusandae maiores nihil.</p>
        </div>
      </div>
    </div>
  )
}

export default Auth