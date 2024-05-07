const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

    const token = jwt.sign(
      {data :{
        id: user._id,
      }},
      process.env.ACCESS_TOKEN_SECRECT,
      {
        expiresIn: '15m',
      },
    );

    const refreshToken = jwt.sign(
      {
        data: {
          id: user._id,
        },
      },
      process.env.REFRESH_TOKEN_SECRECT,
      {
        expiresIn: '7d',
      },
    );

    user.MotDePasse = undefined;

    res.status(201).cookie('jwt', refreshToken, {
        secure: true, //https
        httpOnly: true,
        sameSite: 'None',
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      res.json({
        success: true,
        token,
        userID: user._id,
      });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: 'Erreur lors de la connexion' });
  }
};

//-----------------------------refresh--------------------
const Refresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(401).json({ message: 'Non autorisé' });
  }

  const refreshToken = cookies.jwt;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRECT,
    async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token invalide' });
      }
      const foundUser = await User.findById(decoded.data.id).exec();
      if (!foundUser) {
        return res.status(401).json({ message: 'Non autorisé' });
      }

      const token  = jwt.sign(
        {data : { id: foundUser._id }},
        process.env.ACCESS_TOKEN_SECRECT,
        {
          expiresIn: '15m',
        },
      );


      res.json({ success: true, token, userID: foundUser._id });
    },
  );
};

module.exports = { login, Refresh };
