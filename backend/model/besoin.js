const mongoose= require("mongoose");
const CompteComptables = require('./compteComtable');
const besoinSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  valorisation: {
    type: Number,
    minimum: 0,
    required: true,
    integer: true,
    validate: {
      validator: Number.isInteger, // Validates that the number is an integer
      message: '{VALUE} doit etre un entier ',
    },
    
  },
  quantité: {
    type: Number,
    minimum: 0,
    default: 1,
    required: false,
    validate: {
      validator: Number.isInteger, // Validates that the number is an integer
      message: '{VALUE} doit etre un entier ',
    },
  },
  duréeContrat: {
    type: Number,
    minimum: 0,
    default: 1,
    required: false,
    validate: {
      validator: Number.isInteger, // Validates that the number is an integer
      message: `{VALUE} doit etre un entier `,
    },
  },
  departement:{
//to edit 

  }, 
  compteComptable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'compteComptables', // Référence au modèle CompteComptable
    required: true,
  },
});


const besoinModel  =   mongoose.model("lesbesoins",besoinSchema )
module.exports = besoinModel;

