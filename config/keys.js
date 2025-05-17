// En keys.js
import dotenv from 'dotenv';

dotenv.config();

const keys = {
  secretOrKey: process.env.secretOrKey,
};

export default keys;  // Exporta el objeto 'keys' como valor por defecto
