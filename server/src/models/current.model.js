import mongoose from "mongoose";

const CurrentCoinSchema = new mongoose.Schema(
  {
    coinId: { type: String, required: true, unique: true },
    name: String,
    symbol: String,
    price: Number,
    marketCap: Number,
    priceChange24h: Number,
    lastUpdated: Date,
  },
  { timestamps: true }
);

const CurrentCoinModel = mongoose.model(
  "current_data",
  CurrentCoinSchema,
  "current_data"
);

export { CurrentCoinModel };
