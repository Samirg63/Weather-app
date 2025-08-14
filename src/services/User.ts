export default function UserServices(){
    const url = 'https://api-weather-murex.vercel.app'

    const updatePin = async (pins:string[],id:string)=>{
        
        let request = await fetch(url+'/user/pins',{
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
        let request = await fetch(url+'/user/home',{
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
        let request = await fetch(`${url}/user/findUser`,{
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