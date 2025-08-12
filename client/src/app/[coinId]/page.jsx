"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function CoinDetails() {
  const { coinId } = useParams();
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/history/${coinId}`
        );
        const data = res.data;

        const labels = data.map((entry) =>
          new Date(entry.lastUpdated).toLocaleString()
        );
        const prices = data.map((entry) => entry.price);

        setChartData({
          labels,
          datasets: [
            {
              label: `${coinId.toUpperCase()} Price (USD)`,
              data: prices,
              borderColor: "white",
            },
          ],
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    fetchHistory();
  }, [coinId]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {coinId.toUpperCase()} - Price History
      </Typography>
      <Paper sx={{ p: 2, bgcolor: "#1e1e2f" }}>
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { labels: { color: "#fff" } },
            },
            scales: {
              x: {
                ticks: { color: "#ccc" },
                grid: { color: "rgba(255,255,255,0.1)" },
              },
              y: {
                ticks: { color: "#ccc" },
                grid: { color: "rgba(255,255,255,0.1)" },
              },
            },
          }}
        />
      </Paper>
    </Box>
  );
}
