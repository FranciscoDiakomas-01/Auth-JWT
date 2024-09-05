import JWt from "jsonwebtoken"
import { TokenSecret } from "../config/APIconfig.js"


export default function VerifyToken(req, res , next){

    let token = req.headers["token"]
    JWt.verify(token , TokenSecret.jwt , (err , tokendecoded) => {

        if(err){
            return res.status(401).json({
                msg : "invalid token"
            })
        }else{
            return next()
        }
    })
}