import {jwtDecode} from 'jwt-decode'
import AuthServices from './Auth';

export function googleAuth(){
    const {OAuth} = AuthServices()
    
    const loginWithOAuth = (response:any)=>{
        let {email, name}:{email:string,name:string} = jwtDecode(response.credential);
        OAuth(email,name)
    }

    return {loginWithOAuth};
}


