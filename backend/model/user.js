const mongoose = require('mongoose');
//schema 
const userSchema = new mongoose.Schema({
  NomUtilisateur: {
    type: String,
    unique: [true, "Nom D'utlisateur doit etre unique"],
    minlength: [8, "Nom D'utlisateur trop court "],
    required: [true, "Nom D'utlisateur obligatoire"],
  },
  MotDePasse: {
    type: String,
    required: [true, 'Mot de passe  obligatoire'],
  },
  Nom: { type: String, required: [true, 'Nom obligatoire'] },
  Prénom: { type: String, required: [true, 'Prénom obligatoire'] },
  Email: { type: String, required: [true, 'Email obligatoire'] },
  Departement: { type: String, required: [true, 'Departement obligatoire'] },
  Accées: {
    type: String,
    enum: ['consulter', 'editer', 'administrer'],
    default: 'consulter',
    required: [true, "l'acces est  obligatoire"],
  },
});
 // export module 
  module.exports = mongoose.model('users', userSchema) 
