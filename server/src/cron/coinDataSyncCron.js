import cron from "node-cron";

function coinDataSyncCron() {
  cron.schedule("* * * * *", () => {
    console.log("Cron: running hourly snapshot", new Date().toISOString());
  });
}

export default coinDataSyncCron;
