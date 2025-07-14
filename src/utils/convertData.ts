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

    return {rainChance}
}