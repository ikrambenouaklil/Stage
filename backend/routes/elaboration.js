const express = require('express');
const router = express.Router();
const Elaboration = require('../model/elaboration');

const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);
router.get('/elaborations', async (req, res) => {
  try {
    // get toutes les elabo

    const elabo = await Elaboration.find().populate('compteComptable');;
    res.status(200).send(elabo);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post('/elaborations', async (req, res) => {
  try {
    const elabo = new Elaboration(req.body);
    // save in the db
    await elabo.save();
    res
      .status(200)
      .send({
        message: `L'elaboration de l'année  a été ajouté avec succès.`,
        elabo,
      });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.put('/elaborations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;
    // new : send the object after the update
    const besoin = await Elaboration.findByIdAndUpdate(id, dataToUpdate, {
      new: true,
    });
    res.status(204).send({
      message: "La modification d'elaboration a été réalisée avec succès. ",
      besoin,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});
// je ne peut pas supprimer une elaboration  mais je peut modifier les valeurs des prévisions ect .. 


module.exports = router;
