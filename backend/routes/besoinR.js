const express = require('express');
const router = express.Router()
const Besoin = require( "../model/besoin")



router.get("/bsoins",async (req, res)=>{
try{
   const besoins = await Besoin.find()
   res.status(200).json(besoins)
}catch{
  res.statuts(500).json({error : err.message})
}
} )


module 