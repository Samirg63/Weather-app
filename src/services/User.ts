export default function UserServices(){
    const url = 'http://localhost:2000'

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

    return {updatePin, updateHome}
}