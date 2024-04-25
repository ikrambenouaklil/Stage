const mongoose = require('mongoose');

const compteComptableSchema = new mongoose.Schema({
  numeroCompte: {
    type: Number,
    required: true,
    min: 61,
    max: 68,
    unique: true
  },
  designation: {
    type: String,
    required: true,
    unique: true, 
    enum: [
      'Achats consommés',
      'Autres services extérieurs',
      'Charges de personnel',
      'Impôts, taxes et versements assimilés',
      'Autres charges opérationnelles',
      'Charges financières',
      'Éléments extraordinaires',
      'Dotations aux amortissements et provisions'
    ]
  }

});

const CompteCmptModel = mongoose.model('compteComptables', compteComptableSchema);
 module.exports = CompteCmptModel;




