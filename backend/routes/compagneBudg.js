const express = require('express');
const router = express.Router();
const compagneBudg = require('../model/compagneBudg');
const verifyJWT = require('../middleware/verifyJWT');
// router.use(verifyJWT);
router.get('/compagnes',  async (req, res) => {
  try {
    // get toutes les besoins
    const besoins = await compagneBudg
      .find()
      .populate('besoins', 'elaboration');
    res.status(200).send(besoins);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post('/compagnes',  async (req, res) => {
  try {
    const besoin = new compagneBudg(req.body);
    // save in the db
    await besoin.save();
    res
      .status(200)
      .send({ message: 'Le besoin a été ajouté avec succès.', besoin });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.put('/compagnes/:id',  async (req, res) => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;
    // new : send the object after the update
    const besoin = await Besoin.findByIdAndUpdate(id, dataToUpdate, {
      new: true,
    });
    res.status(204).send({
      message: 'La modification du besoin a été réalisée avec succès. ',
      besoin,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete('/compagnes/:id',  async (req, res) => {
  try {
    const { id } = req.params;
    await Besoin.findByIdAndDelete(id);
    res.status(204).send({
      message: 'La suppression du besoin a été effectuée avec succès ',
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
