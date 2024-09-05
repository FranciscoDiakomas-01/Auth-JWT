import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import db from './db.js'
import { serverConfig } from './config/APIconfig.js'
import UserRoute from './Routes/UuserRoute.js'


async function RunnServer() {

    const server = express()
    server.use(cors())
    server.use(express.json())
    server.use(UserRoute)


    server.listen(serverConfig.port ,(err)=>{

        if(err){
            console.error("Ocorreu um erro" , err)
            return process.exit(1)
        }else{
            console.log("Servidor Rodando com Sucess!")
        }
    })
    
}

RunnServer()