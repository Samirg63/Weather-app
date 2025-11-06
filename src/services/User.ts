export default function UserServices(){
    // Development URL
    const url:string = "http://localhost:2000/user";

    //Production URL
    // const url:string = "https://api-weather-murex.vercel.app/user";

    const updatePin = async (pins:string[],id:string)=>{
        
        let request = await fetch(url+'/pins',{
            method:'PUT',
            headers:{
                "Content-Type":"application/JSON",
                "Access-Control-Allow-Origin":"*"
            },
            body:JSON.stringify({
                pins:pins,
                _id:id
            })
        })
        .then((response)=>response.json())
        .then((result)=>{
            return result
        })
        .catch((e:any)=>{
            console.log(e)
            return false;
        })

        return request
    }

    const updateHome = async(key:string,id:string)=>{       
        let request = await fetch(url+'/home',{
            method:'PUT',
            headers:{
                "Content-Type":"application/JSON",
                "Access-Control-Allow-Origin":"*"
            },
            body:JSON.stringify({
                home:key,
                _id:id
            })
        })
        .then((response)=>response.json())
        .then((result)=>{
            return result
        })
        .catch((e:any)=>{
            console.log(e)
            return false;
        })

        return request
    }

    const findUser = async(params:object)=>{
        let request = await fetch(`${url}/findUser`,{
            method:'POST',
            headers:{
                "Content-Type":"application/JSON",
                "Access-Control-Allow-Origin":"*"
            },
            body:JSON.stringify(params)
        })
        .then(response=>response.json())
        .then((result)=>{
            return result.body
        })
        .catch((e:any)=>{
            throw e
        })

        return request;
    }

    return {updatePin, updateHome, findUser}
}