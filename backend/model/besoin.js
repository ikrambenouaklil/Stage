const mongoose= require("mongoose");

const besoinSchema=new mongoose.Schema({
 item:{
    type: String , 
    required: true
 },  valorisation:{
    type: integer , 
    minimum : 0 , 
    required: true
 }, quantité:{
    type: integer , 
    minimum : 0, 
    default : 1 , 
    required: true
 }, duréeContrat:{
    type: integer , 
    minimum : 0, 
    default : 1 , 
    required: false
 },

})


