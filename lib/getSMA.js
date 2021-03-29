const _ = require('lodash');
const SMA = require('technicalindicators').SMA;

let count = 0;
let connected = true;
const maxTries = 5;

const getSMA = async (alpaca) => {
  while(connected) {
    try {
      const initialData = await alpaca.getBars(
        '1Min',
        'SPY',
        {
          limit: 50,
          until: new Date()
        }
      );

      const closeValues = _.map(initialData.SPY, (bar) => bar.closePrice);

      sma20 = new SMA({ period: 20, values: closeValues });
      sma50 = new SMA({ period: 50, values: closeValues });

      return {
        sma20: sma20.getResult(),
        sma50: sma50.getResult()
      }
    } catch (e) {
      console.log('get SMA error');
      setTimeout(() => {
        count++
        console.log('trying connection again')
      }, 10000)
      if (count === maxTries) {
        connected = false;
        return console.log(e);
      }
    }
  }
}

module.exports.getSMA = getSMA;