import express from 'express'
import cors from 'cors'

async function main(){
    const hostname = 'localhost'
    const port = 2000;
    const app = express()

    app.use(express.json())
    app.use(cors())



    app.listen(port,()=>{
        console.log(`servidor rodando em ${hostname}:${port}`)
    })
}

main()