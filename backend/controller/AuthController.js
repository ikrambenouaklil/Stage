const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// ajouter un utilisateur
const createUser = async (req, res) => {
  try {
    const {
      NomUtilisateur,
      MotDePasse,
      Email,
      Nom,
      Accès,
      Prénom,
      Departement,
    } = req.body;
    if (
      !NomUtilisateur ||
      !MotDePasse ||
      !Email ||
      !Nom ||
      !Accès ||
      !Prénom ||
      !Departement
    ) {
      return res.status(400).json({ message: 'Remplir les champs vides' });
    }

    const foundUser = await User.findOne({
      $or: [{ NomUtilisateur: NomUtilisateur }, { Email: Email }],
    }).exec();

    if (foundUser) {
      return res.status(401).json({
        message:
          foundUser.NomUtilisateur && foundUser.Email
            ? "Le nom d'utilisateur ou l'adresse e-mail sont déjà utilisés."
            : foundUser.NomUtilisateur
            ? "Le nom d'utilisateur saisi est déjà utilisé."
            : "L'adresse e-mail saisie est déjà utilisée.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(MotDePasse, salt);

    const newUser = await User.create({
      NomUtilisateur,
      Email,
      MotDePasse: encryptedPassword,
      Nom,
      Accès,
      Prénom,
      Departement,
    });

    const data = {
      id: newUser._id,
    };

    const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRECT, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRECT, {
      expiresIn: '7d',
    });

    const createdUser = {
      ...newUser.toObject(),
      MotDePasse: MotDePasse,
    };

    res
      .status(200)
      .cookie('token', refreshToken, {
        secure: true, //https
        httpOnly: true,
        sameSite: 'None',
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .json({
        success: 'true',
        token,
        createdUser,
        message: "L'utilisateur a été ajouté avec succès",
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la création de l'utilisateur",
    });
  }
};

// login
const login = async (req, res) => {
  try {
    const { NomUtilisateur, MotDePasse } = req.body;

    if (!NomUtilisateur || !MotDePasse) {
      return res.status(400).json('Remplir les champs vides');
    }

    const user = await User.findOne({ NomUtilisateur });

    if (!user) {
      return res
        .status(400)
        .json("Nom d'utilisateur ou mot de passe incorrect");
    }

    const comparePassword = await bcrypt.compare(MotDePasse, user.MotDePasse);

    if (!comparePassword) {
      return res
        .status(400)
        .json("Nom d'utilisateur ou mot de passe incorrect");
    }

    const data = {
      id: user._id,
    };

    const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRECT, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRECT, {
      expiresIn: '7d',
    });

    user.MotDePasse = undefined;

    res
      .status(201)
      .cookie('token', refreshToken, {
        secure: true, //https
        httpOnly: true,
        sameSite: 'None',
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .json({
        success: true,
        token
      });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: 'Erreur lors de la connexion' });
  }
};



// module.exports = { createUser, login, supprimerUser, getUser, editerUser };
module.exports = { createUser, login};
