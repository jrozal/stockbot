const dotenv = require('dotenv').config();

const config = {
  keyId: process.env.APCA_API_KEY_ID,
  secretKey: process.env.APCA_API_SECRET_KEY,
  paper: true,
  usePolygon: false
};

const tradeSettings = {
  // set security to trade (in string format)
  stock: 'SPY',
  // set quantity to trade (positive integer)
  quantity: 250
};

module.exports = { config, tradeSettings };