
import  validator  from 'validator';
import { TokenSecret } from '../config/APIconfig.js';

import db from '../db.js';

let sql = ""
import JWt from 'jsonwebtoken';

const User =  {


    List(req , res){

        sql = "select * from USerWT;"
        db.query(sql , (err , result) =>{
                return res.status(200).json({
                    result
                })

        })
    },

    Insert(req , res ){
        let {email , pass} = req.body

        if(validator.isEmail(email) && pass.length > 4){

            sql = "insert into USerWT (email , pass) values (? , ?);"
            return  db.query(sql ,[email , pass], (err , result) =>{
                    if(err){
                        return res.status(400).json({
                            msg : "email used"
                        })
                    }
                    res.status(201).json({
                        result : result.insertId
                    })

            })

        }else{
            return res.status(400).json({
                msg : "invalid datas"
            })
        }
        

    },

    Delete(req, res){

        let id = Number(req.params.id)

        if(typeof id !== 'number'){

            return res.status(400).json({
                msg : "invalid id"
            })
        }else{
            sql = "delete from USerWT where id = ?;"
            db.query(sql ,[id], (err , result) =>{

                if(result.affectedRows == 1){
                    return res.status(200).json({
                        deleted : "deleted"
                    })
                }else{
                    return res.status(400).json({
                        msg : "user not found"
                    })
                }

            })
        }

    },
    Update (req , res){

        let {email , newPass , pass} = req.body

        //validations

        if(validator.isEmail(email) && newPass != "" && newPass.length > 4 && pass != ""){

            //get User By email
            sql = "select pass from USerWT where email = ?"
            db.query(sql , [email] ,(err, result)=>{

                let oldPassord = result[0]?.pass
                //compare the pass word sent with the pass existent
                if(result.length <= 0){
                    return res.status(401).json({
                        result : "not found"
                    })
                }
                if(oldPassord == pass){

                    sql = "UPDATE USerWT SET email = ? , pass= ?  WHERE (email=?);"
                    db.query(sql,[email, newPass , email],(err , result)=>{

                        return res.status(201).json({
                            result : "updated"
                        })
                    })
                }else{
                    return res.status(401).json({
                        result : "passorwError"
                    })
                }
                
            })
        }else{
            return res.status(400).json({
                msg : "Invalid data"
            })
        }

    },
    Login(req , res){


        let {email  , pass} = req.body

        //validations

        if(validator.isEmail(email) && pass != "" && pass.length > 4){

            //get User By email and email
            sql = "select  * from USerWT where email = ? and pass = ?"
            db.query(sql , [email , pass] ,(err, result)=>{
                if(result.length > 0){

                    let token =  JWt.sign(
                            { id : result[0].id },
                            TokenSecret.jwt
                    )
                    return res.status(200).json({
                            token : token
                    })
                    
                }else{
                    return res.status(401).json({
                        result : "user not found"
                    })
                }
                
            })
        }else{
            return res.status(400).json({
                msg : "invalid data"
            })
        }

    }
}

export default User
