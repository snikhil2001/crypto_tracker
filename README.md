# Crypto_Tracker

## Description

This app fetches top 10 coins and show it's details which refreshes every hour to get dynamic updates. It has charts to get visual representation of the coin.

### Tech Stacks Used

Backend - Node.js, Express.js
Frontend - Next.js
Database - MongoDB Atlas

### Libraries/Frameworks Used

Backend - axios, chart.js
Frontend - axios, material ui

### Deployed links

Backend - https://crypto-tracker-backend-mm3p.onrender.com/

Frontend - https://crypto-tracker-ten-theta.vercel.app

# Setup and installation steps

This project contains two folders

- client
- server

-- Setting up the server

```
cd ./server
npm i
```

Before running npm run dev make .env file and add these variables

```
PORT = 8080
MONGODB_URI = mongodb+srv://nikhilsahni2001:nikhilsahni2001@cluster0.kowwmoo.mongodb.net/coin_tracker
COINGECKO_API_URL = https://api.coingecko.com/api/v3/coins/markets
```

Now run `npm run dev`

-- Setting up the frontend

```
cd ./client
npm i
```

Create .env file and add this

`NEXT_PUBLIC_BACKEND_URI=https://crypto-tracker-backend-mm3p.onrender.com`

Now `npm run start`

# How Cron Job works

- node-cron is the package which is being used for running cron jobs

```
function coinDataSyncCron() {
  cron.schedule("0 * * * *", saveCoinCronData);
}

```

- This 0 at the start will run at every 0th minute of every hour calling `saveCoinCronData` function.

- This function will call the coin gecko api and will store the results first in history table and then update all the documents in the current table using bulk write operation.

# Screenshots

### Cron job

![Cron Job 1](./screenshots/cron-job1.png)

![Cron Job 2](./screenshots/cron-job2.png)

![Cron Job 3](./screenshots/cron-job3.png)

![Cron Job 4](./screenshots/cron-job4.png)

### MongoDB Data

![Current Collection Data](./screenshots/mongodb-1.png)

![History Collection Data](./screenshots/mongodb-2.png)
