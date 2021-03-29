const dotenv = require('dotenv').config();

const config = {
  keyId: process.env.APCA_API_KEY_ID,
  secretKey: process.env.APCA_API_SECRET_KEY,
  paper: true,
  usePolygon: false
}

module.exports.config = config;