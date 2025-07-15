export default function convertData(){
    
    const rainChance = (probability:number)=>{
        if(probability <= 30){
            return 'Low'
        }else if(probability > 30 && probability <=70){
            return 'Med'
        }else{
            return 'High'
        }
    }

    const getImage = (phrase:string, isDay:boolean)=>{

        phrase = phrase.toLowerCase()

        if(isDay){
            
            if((phrase.includes('sunny')||
                phrase.includes('hot')) && !phrase.includes('storms') && !phrase.includes('showers')){

            return '/assets/Backgrounds/SunDay.jpg'

            }else if((phrase.includes('clouds') ||
                phrase.includes('cloudy') ||
                phrase.includes('fog') ||
                phrase.includes('dreary') ||
                phrase.includes('hazy') ||
                phrase.includes('flurries')||
                phrase.includes('cold'))
                
                && !phrase.includes('snow') && !phrase.includes('storm')){

            return '/assets/Backgrounds/Cloudy.jpg'

            }else if((phrase.includes('showers') ||
                phrase.includes('rain'))
                && !phrase.includes('snow')){

            return '/assets/Backgrounds/RainDay.jpg'

            }else if(phrase.includes('storms')){

            return '/assets/Backgrounds/Storm-icon.jpg'

            }else if(phrase.includes('snow')||
                phrase.includes('ice')||
                phrase.includes('sleet')||
                phrase.includes('freezing')){
            
            return '/assets/Backgrounds/Snow-icon.jpg'

            }else if(phrase.includes('windy')){

                return '/assets/Backgrounds/Wind.jpg'

            }

        }else{


             if((phrase.includes('clear')||
             phrase.includes('hot'))
                && !phrase.includes('storms') && !phrase.includes('showers')){

            return '/assets/Backgrounds/Night.jpg'

            }else if((phrase.includes('clouds') ||
            phrase.includes('cloudy') ||
            phrase.includes('fog') ||
            phrase.includes('dreary') ||
            phrase.includes('hazy') ||
            phrase.includes('flurries')||
            phrase.includes('cold'))    
            && !phrase.includes('snow') && !phrase.includes('storm') && !phrase.includes('showers')){

            return '/assets/Backgrounds/Cloudy.jpg'

            }else if(phrase.includes('showers')||
                phrase.includes('rain') 
                && !phrase.includes('snow')){

            return '/assets/Backgrounds/RainDay.jpg'

            }else if(phrase.includes('storms')){

            return '/assets/Backgrounds/Storm.jpg'

            }else if(phrase.includes('snow')||
                phrase.includes('ice')||
                phrase.includes('sleet')||
                phrase.includes('freezing')){
            
            return '/assets/Backgrounds/Snow-icon.jpg'

            }else if(phrase.includes('windy')){

                return '/assets/Backgrounds/Wind-icon.jpg'

            }
        }
    }

    const getIcon = (phrase:string)=>{
        phrase = phrase.toLowerCase()

        
            
            if((phrase.includes('sunny')||
            phrase.includes('clear')||
                phrase.includes('hot')) && !phrase.includes('storms') && !phrase.includes('showers')){

            return '/assets/Icons/Sun-icon.png'

            }else if((phrase.includes('clouds') ||
                phrase.includes('cloudy') ||
                phrase.includes('fog') ||
                phrase.includes('dreary') ||
                phrase.includes('hazy') ||
                phrase.includes('flurries')||
                phrase.includes('cold'))
                
                && !phrase.includes('snow') && !phrase.includes('storm')){

            return '/assets/Icons/CloudySun-icon.png'

            }else if((phrase.includes('showers') ||
                phrase.includes('rain'))
                && !phrase.includes('snow')){

            return '/assets/Icons/Rain-icon.png'

            }else if(phrase.includes('storms')){

            return '/assets/Icons/Storm.png'

            }else if(phrase.includes('snow')||
                phrase.includes('ice')||
                phrase.includes('sleet')||
                phrase.includes('freezing')){
            
            return '/assets/Icons/Snow.png'

            }else if(phrase.includes('windy')){

                return '/assets/Icons/Wind-icon.png'

            }

       
        
    }

    return {rainChance,getImage,getIcon}
}