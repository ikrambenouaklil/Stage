const express = require("express");
const router = express.Router();
const Besoin = require("../model/besoin");
const compagneBudg = require("../model/compagneBudg");
const verifyJWT = require("../middleware/verifyJWT");

// router.use(verifyJWT);

router.get("/besoin/:compagneId", async (req, res) => {
  try {
    const { compagneId } = req.params;
    const besoins = await Besoin.find({ compagne: compagneId }).populate(
      "compteComptable"
    );
    res.status(200).send(besoins);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post("/besoin/:compagneId", async (req, res) => {
  try {
    const { compagneId } = req.params;
    // const { item, valorisation, quantité, duréeContrat } = req.body;
    // // const besoin = new Besoin({
    // //   item,
    // //   valorisation,
    // //   quantité,
    // //   duréeContrat,
    // //   compagne: compagneId,
    // // });
    const besoin = new Besoin(req.body);
    await besoin.save();
    res
      .status(200)
      .send({ message: "Le besoin a été ajouté avec succès.", besoin });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.put("/besoin/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;
    const besoin = await Besoin.findByIdAndUpdate(id, dataToUpdate, {
      new: true,
    });
    if (!besoin) {
      return res.status(404).send({ error: "Besoin non trouvé." });
    }
    res.status(200).send({
      message: "La modification du besoin a été réalisée avec succès.",
      besoin,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete("/besoin/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBesoin = await Besoin.findByIdAndDelete(id);
    if (!deletedBesoin) {
      return res.status(404).send({ error: "Besoin non trouvé." });
    }
    res
      .status(204)
      .send({
        message: "La suppression du besoin a été effectuée avec succès.",
      });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
