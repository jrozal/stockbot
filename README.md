# Stock Market Trading Bot 🤖

A simple stock market trading bot written in node.js that executes trades based on the 20/50 simple moving average crossover strategy.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### API Prerequisites

This project uses Alpaca stock trading API. You can learn more and sign up for an account at https://alpaca.markets.

Within the root directory, create a filed named `.env` and input the following with your Alpaca credentials. I have prefilled the first line to execute trades via the paper trading URL. This may be changed to point to your live trading account.

```
APCA_API_BASE_URL=https://paper-api.alpaca.markets
APCA_API_KEY_ID=
APCA_API_SECRET_KEY=
```

### Installing

From the root directory

```
npm install
```

### Running bot

```
npm run bot
```