const Alpaca = require("@alpacahq/alpaca-trade-api");
const { config } = require('./config.js');
const { keyId, secretKey } = config;
const API_KEY = keyId;
const API_SECRET = secretKey;

module.exports = class DataStream {
  constructor({ apiKey, secretKey, feed, paper }) {
    this.alpaca = new Alpaca({
      keyId: apiKey,
      secretKey: secretKey,
      feed: feed,
      paper: paper
    });

    const socket = this.alpaca.data_stream_v2;

    socket.onConnect(function () {
      console.log("Connected");
      socket.subscribeForBars(["SPY"]);
    });

    socket.onError((err) => {
      console.log(err);
    });

    socket.onStockTrade((trade) => {
      console.log(trade);
    });

    socket.onStockQuote((quote) => {
      console.log(quote);
    });

    socket.onStockBar((bar) => {
      console.log(bar);
    });

    socket.onStateChange((state) => {
      console.log(state);
    });

    socket.onDisconnect(() => {
      console.log("Disconnected");
    });

    socket.connect();
  }
}

let stream = new DataStream({
  apiKey: API_KEY,
  secretKey: API_SECRET,
  feed: 'iex',
  paper: true,
});