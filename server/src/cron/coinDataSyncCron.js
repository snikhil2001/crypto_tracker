import cron from "node-cron";
import saveCoinCronData from "../cronHelperFunctions/saveCronCoinData.js";

function coinDataSyncCron() {
  cron.schedule("0 * * * *", saveCoinCronData);
}

export default coinDataSyncCron;
