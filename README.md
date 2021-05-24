# Stock Market Trading Bot 🤖

A simple stock market trading bot written in node.js that executes trades based on the 20/50 simple moving average crossover strategy.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### API Prerequisites

This project uses Alpaca stock trading API. You can learn more and sign up for an account at https://alpaca.markets.

Within the root directory, create a filed named `.env` and input the following with your Alpaca credentials.

```
APCA_API_KEY_ID=
APCA_API_SECRET_KEY=
```

### Installing

```
npm install
```

### Configuration
Inside the config.js file, configure the `tradeSettings` object to your desired settings. Please visit Alpaca to verify tradeable securities.
```js
const tradeSettings = {
  // set security to trade (in string format)
  stock: 'SPY',
  // set quantity to trade (positive integer)
  quantity: 250
};
```
Please also view the `config` object, and note that paper trading is set to `true`.

### Running bot

```
npm run bot
```