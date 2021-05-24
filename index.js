const SMA = require('technicalindicators').SMA;
const Alpaca = require('@alpacahq/alpaca-trade-api');
const { config, tradeSettings } = require('./config.js');
const alpaca = new Alpaca(config);
const { stock, quantity } = tradeSettings;
const { getSMA } = require('./lib/getSMA.js');

let sma20, sma50, next20, next50;
let lastOrder = 'SELL';

const init = async () => {
  console.log('initializing trading bot')

  // get and set initial data
  let data = await getSMA(alpaca);
  sma20 = data.sma20.slice(-1)[0];
  sma50 = data.sma50.slice(-1)[0];

  console.log('current sma20:', sma20);
  console.log('current sma50:', sma50);

  const trade = async () => {
    if (next20 === undefined && next50 === undefined) {
      let data = await getSMA(alpaca);
      next20 = data.sma20.slice(-1)[0];
      next50 = data.sma50.slice(-1)[0];

      console.log('next20:', next20);
      console.log('next50:', next50);
    }
    else {
      sma20 = next20;
      sma50 = next50;

      console.log('current sma20:', sma20);
      console.log('current sma50:', sma50);

      let data = await getSMA(alpaca);
      next20 = data.sma20.slice(-1)[0];
      next50 = data.sma50.slice(-1)[0];

      console.log('next20:', next20);
      console.log('next50:', next50);
    }

    if (next20 > next50 && lastOrder !== 'BUY') {
      alpaca.createOrder({
        symbol: stock,
        qty: quantity,
        side: 'buy',
        type: 'market',
        time_in_force: 'day'
      })
      .then((order) => {
        lastOrder = 'BUY';
        console.log('\nBUY\n');
      })
      .catch(err => err);
    } else if (next20 < next50 && lastOrder !== 'SELL') {
      alpaca.createOrder({
        symbol: stock,
        qty: quantity,
        side: 'sell',
        type: 'market',
        time_in_force: 'day'
      })
      .then((order) => {
        lastOrder = 'SELL';
        console.log('\nSELL\n');
      })
      .catch(err => err);
    }
  };

  setInterval(() => {
    console.log('trading...', new Date().toString());
    trade();
  }, 2000);
}

init();
