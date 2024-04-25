const express = require('express');
const router = express.Router();
const CompteComptable = require('../model/compteComtable');

const comptesDefaults = [
  { numeroCompte: 61, designation: 'Achats consommés' },
  { numeroCompte: 62, designation: 'Autres services extérieurs' },
  { numeroCompte: 63, designation: 'Charges de personnel' },
  { numeroCompte: 64, designation: 'Impôts, taxes et versements assimilés' },
  { numeroCompte: 65, designation: 'Autres charges opérationnelles' },
  { numeroCompte: 66, designation: 'Charges financières' },
  { numeroCompte: 67, designation: 'Éléments extraordinaires' },
  {
    numeroCompte: 68,
    designation: 'Dotations aux amortissements et provisions',
  },
];


router.get('/compteCmpt', async (req, res) => {
  try {
    const compte_comptable = await CompteComptable.find();
    res.status(200).send(compte_comptable);
   
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/compteCmpt', async (req, res) => {
  try {
    await CompteComptable.insertMany(comptesDefaults);
    console.log('Les comptes comptables ont été initialisés avec succès.');
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de l'initialisation des comptes comptables :",
      error,
    );
  }
});

module.exports = router;


