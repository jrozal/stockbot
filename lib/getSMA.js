const _ = require('lodash');
const SMA = require('technicalindicators').SMA;

const getSMA = async (alpaca) => {
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
}

module.exports.getSMA = getSMA;