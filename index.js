const _ = require('lodash');
const SMA = require('technicalindicators').SMA;
const Alpaca = require('@alpacahq/alpaca-trade-api');
const { config } = require('./config.js');
const alpaca = new Alpaca(config);
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
        symbol: 'SPY',
        qty: 100,
        side: 'buy',
        type: 'market',
        time_in_force: 'day'
      });

      lastOrder = 'BUY';
      console.log('\nBUY\n');
    } else if (next20 < next50 && lastOrder !== 'SELL') {
      alpaca.createOrder({
        symbol: 'SPY',
        qty: 100,
        side: 'sell',
        type: 'market',
        time_in_force: 'day'
      });

      lastOrder = 'SELL';
      console.log('\nSELL\n');
    }
  };

  setInterval(() => {
    console.log('trading...')
    trade();
  }, 60000);
}

init();
