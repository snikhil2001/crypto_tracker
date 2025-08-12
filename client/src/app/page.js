"use client";
import {
  Box,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState({
    loading: true,
    coins: [],
    error: null,
  });
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState("marketCap");
  const [order, setOrder] = useState("desc");
  const searchTimeout = useRef(null);

  const fetchCoins = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/coins?search=${search}&sortBy=${sortBy}&order=${order}`
      );

      setData((prev) => {
        return {
          ...prev,
          coins: res.data,
          loading: false,
        };
      });
    } catch (error) {
      setData((prev) => {
        return {
          ...prev,
          loading: false,
          error: error.message,
        };
      });
      console.error("Error fetching coins:", error);
    }
  };

  useEffect(() => {
    fetchCoins();

    const interval = setInterval(fetchCoins, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [search, sortBy, order]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  return (
    <Box width={"100%"} height={"500px"} marginTop={"40px"} paddingX={"20px"}>
      <Stack direction={"row"} alignItems={"center"} gap={2}>
        <TextField
          size="small"
          sx={{ width: "300px" }}
          placeholder="Search coin by name"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />

        <Select
          size="small"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="marketCap">Market Capital</MenuItem>
          <MenuItem value="percentChange24H">
            Percentage Change 24 hour
          </MenuItem>
        </Select>

        <Select
          size="small"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <MenuItem value={"asc"}>Ascending</MenuItem>
          <MenuItem value={"desc"}>Descending</MenuItem>
        </Select>
      </Stack>

      <Stack mt={"20px"} direction={"row"} alignItems={"center"} gap={2}>
        <Typography
          fontFamily={"Roboto"}
          fontSize={"20px"}
          width={"fit-content"}
          borderRadius={"10px"}
          padding={"10px"}
          textAlign={"left"}
          sx={{
            background: "#A4CCD9",
          }}
        >
          Coin Dashboard
        </Typography>
        {data.loading && (
          <Typography
            fontFamily={"Roboto"}
            fontSize={"20px"}
            width={"fit-content"}
            borderRadius={"10px"}
            padding={"10px"}
            textAlign={"left"}
            sx={{
              backgroundColor: "#a4d9ccff",
              "@keyframes blinkBG": {
                "0%": { backgroundColor: "#dadedbff" },
                "50%": { backgroundColor: "#16759bff" },
                "100%": { backgroundColor: "#A4CCD9" },
              },
              animation: "blinkBG 1.5s ease-in-out infinite",
            }}
          >
            Loading...
          </Typography>
        )}
      </Stack>

      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#C5BAFF", marginTop: "20px" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#C5BAFF" }}>
              <TableCell sx={{ color: "black" }}>Coin Name</TableCell>
              <TableCell sx={{ color: "black" }}>Symbol</TableCell>
              <TableCell sx={{ color: "black" }}>Price (USD)</TableCell>
              <TableCell sx={{ color: "black" }}>Market Cap</TableCell>
              <TableCell sx={{ color: "black" }}>24h % Change</TableCell>
              <TableCell sx={{ color: "black" }}>Last Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!data.loading &&
              data.coins &&
              data.coins.map((coin) => (
                <TableRow
                  key={coin.coinId}
                  sx={{
                    backgroundColor: "#2b2f3a",
                    "&:hover": { backgroundColor: "#3b3f4a" },
                  }}
                >
                  <TableCell
                    onClick={() => router.push(`/${coin.coinId}`)}
                    sx={{ color: "white" }}
                  >
                    {coin.name}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {coin.symbol.toUpperCase()}
                  </TableCell>
                  <TableCell sx={{ color: "lightgreen" }}>
                    $ {coin.price.toLocaleString()}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    $ {coin.marketCap.toLocaleString()}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: coin.change24h >= 0 ? "lightgreen" : "salmon",
                      fontWeight: "bold",
                    }}
                  >
                    {coin.priceChange24h} %
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {new Date(coin.lastUpdated).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
