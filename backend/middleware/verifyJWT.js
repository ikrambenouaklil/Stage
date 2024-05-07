
require('dotenv').config();
const jwt = require('jsonwebtoken');




const verifyJWT = (req , res,next)=>{
  const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader?.startsWith("Bearer")) {
          return res.status(401).json({
            message: "L'accès n'est pas autorisé sans authentification",
          });
        }
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRECT,(err,decoded)=>{

        if (err) {return res.status(403).json({ message: 'npe', err })}
        
        req.user = decoded.data.id;
        next(); 
    })
}
module.exports = verifyJWT;