const config = ('../config.js');

// Get account information.
const getAccountInfo = (alpaca) => {
  return alpaca.getAccount()
      .then((account) => {
          // Check if account is restricted from trading.
          if (account.trading_blocked) {
              return console.log('Account is currently restricted from trading.')
          }

          // If not restricted, return data
          return {
            equity: account.equity,
            cash: account.cash,
            buyingPower: account.buying_power
          }
      });
}

exports.getAccountInfo = getAccountInfo;