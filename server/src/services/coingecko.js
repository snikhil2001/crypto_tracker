import axios from "axios";

async function fetchTop10Coins() {
  try {
    const response = await axios.get(process.env.COINGECKO_API_URL, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching top 10 coins:", error);
    throw error;
  }
}

export default fetchTop10Coins;
