import mongoose from "mongoose";

const HistoryCoinSchema = new mongoose.Schema(
  {
    coinId: { type: String, required: true },
    name: String,
    symbol: String,
    price: Number,
    marketCap: Number,
    priceChange24h: Number,
    lastUpdated: Date,
  },
  { timestamps: true }
);

const HistoryCoinModel = mongoose.model(
  "history_data",
  HistoryCoinSchema,
  "history_data"
);

export { HistoryCoinModel };
