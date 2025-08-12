import { CurrentCoinModel } from "../models/current.model.js";
import { HistoryCoinModel } from "../models/history.model.js";
import fetchTop10Coins from "../services/coingecko.js";

const saveCoinCronData = async () => {
  console.log("Cron: running hourly snapshot", new Date().toISOString());

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
    console.log("Cron coin data stored successfully");
  } catch (error) {
    console.log("Error storing cron coin data:", error);
    return res
      .status(500)
      .send({ message: "Internal Server Error" + error.message });
  }
};

export default saveCoinCronData;
