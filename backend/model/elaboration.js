const mongoose = require('mongoose');
const compteComptables = require('./compteComtable');


const elaborationSchema = new mongoose.Schema({
  compteComptable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'compteComptables', // Référence au modèle CompteComptable
    // je peut pas modifier cette case
    readonly: true,
  },
  realisationAnnéePre: {
    // realisation de l'année presidante
    type: Number,
    required: [true, 'Champ obligatoire à remplir '],
  },
  prévisionAnnéeActuel: {
    // prévisions de l'année presidante
    type: Number,
    required: [true, 'Champ obligatoire à remplir '],
  },
  RealisationS1: {
    // realisation de l'année actuel S1
    type: Number,
    required: [true, 'Champ obligatoire à remplir '],
  },
  PrévisionS2: {
    // prévisions de l'année actuel S2
    type: Number,
    required: [true, 'Champ obligatoire à remplir '],
  },
  PrévisionAnnéeSuivante: {
    // prévisions pour l'année suivante
    type: Number,
    required: [true, 'Champ obligatoire à remplir '],
  },
});

const elaborationModel = mongoose.model(
  'elaborations',
  elaborationSchema,
);
module.exports = elaborationModel;
