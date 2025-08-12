import { Box, Button, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <Box
      position={"sticky"}
      top={0}
      display={"flex"}
      padding={"10px 20px"}
      justifyContent={"space-between"}
      alignItems={"center"}
      gap={"20px"}
      backgroundColor={"#FFF5F2"}
    >
      <Typography fontFamily={"cursive"}>Coin-Tracker</Typography>
      <Button>Login</Button>
    </Box>
  );
};

export default Header;
