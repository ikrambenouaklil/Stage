const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//schema 
const userSchema = new mongoose.Schema({
  NomUtilisateur: {
    type: String,
    unique: [true, "Nom D'utlisateur doit etre unique"],
    required: [true, "Nom D'utlisateur obligatoire"],
  },
  MotDePasse: {
    type: String,
    required: [true, 'Mot de passe  obligatoire'],
  },
  Nom: { type: String, required: [true, 'Nom obligatoire'] },
  Prénom: { type: String, required: [true, 'Prénom obligatoire'] },
  Email: {
    type: String,
    unique: [true, "l'adrese email doit etre unique"],
    required: [true, 'Email obligatoire'],
  },
  Departement: { type: String, required: [true, 'Departement obligatoire'] },

  Accès: {
    type: String,
    enum: ['consulter', 'editer', 'administrer'],
    default: 'consulter',
    required: [true, "l'acces est  obligatoire"],
  },
});

 // export module 
  module.exports = mongoose.model('users', userSchema) 
