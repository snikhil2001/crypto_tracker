import { CurrentCoinModel } from "../models/current.model.js";
import { HistoryCoinModel } from "../models/history.model.js";
import fetchTop10Coins from "../services/coingecko.js";

const getCoins = async (req, res) => {
  try {
    const coins = await CurrentCoinModel.find()
      .sort({ marketCap: -1 })
      .limit(10);

    res.status(200).json(coins);
  } catch (error) {
    console.error("Error fetching coins:", error);
    res.status(500).json({ message: "Internal Server Error" + error.message });
  }
};

const storeHistoryCoinData = async (req, res) => {
  try {
    const fetchCoins = await fetchTop10Coins();

    const mappedData = fetchCoins.map((coin) => {
      return {
        coinId: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        price: coin.current_price,
        marketCap: coin.market_cap,
        priceChange: coin.price_change_percentage_24h,
        lastUpdated: new Date(coin.last_updated).toISOString(),
      };
    });

    await HistoryCoinModel.insertMany(mappedData);

    const bulkWriteOps = mappedData.map((coin) => ({
      updateOne: {
        filter: { coinId: coin.coinId },
        update: { $set: coin },
        upsert: true,
      },
    }));

    await CurrentCoinModel.bulkWrite(bulkWriteOps);
    return res
      .status(200)
      .send({ message: "History coin data stored successfully" });
  } catch (error) {
    console.log("Error storing history coin data:", error);
    return res
      .status(500)
      .send({ message: "Internal Server Error" + error.message });
  }
};

const findCoinById = async (req, res) => {
  try {
    const { coinId } = req.params;
    const coinData = await HistoryCoinModel.findById({ coinId });

    if (!coinData) {
      return res.status(404).json({ message: "Coin not found" });
    }

    return coinData;
  } catch (error) {
    console.error("Error finding coin by ID:", error);
    res.status(500).json({ message: "Internal Server Error" + error.message });
  }
};

export { getCoins, storeHistoryCoinData, findCoinById };
