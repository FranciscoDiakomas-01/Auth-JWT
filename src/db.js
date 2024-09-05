import mysql from 'mysql2'

import { dbConfig } from './config/APIconfig.js'


const db = mysql.createConnection({
    host: process.env.PORT ||  dbConfig.host,
    user : process.env.USERDB || dbConfig.user,
    password : process.env.DBPass || dbConfig.password,
    database : process.env.DBNAME || dbConfig.database
})



db.connect((err)=>{

    if(err){

        console.error("Erro ao se conectar ao banco")
        db.end()
        return process.exit(1)
    }else{
        console.log("conecatado ao banco")
    }
})


export default db