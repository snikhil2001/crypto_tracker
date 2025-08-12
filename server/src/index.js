import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./config/mongodb.config.js";
import cors from "cors";
import {
  findCoinById,
  getCoins,
  storeHistoryCoinData,
} from "./controllers/coinsController.js";
import coinDataSyncCron from "./cron/coinDataSyncCron.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// get coins
app.get("/api/coins", getCoins);

// store history coin data
app.post("/api/history", storeHistoryCoinData);

// find coin by id
app.get("/api/history/:coinId", findCoinById);

app.listen(process.env.PORT, async () => {
  await connectToMongoDB();
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
  // coinDataSyncCron();
});
