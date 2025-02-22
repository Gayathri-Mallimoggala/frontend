import React from "react";
import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        bgcolor: "primary.main",
        color: "white",
        textAlign: "center",
        py: 1,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} SmartCollect: Real-Time Payment &
        Notification Management System
      </Typography>
    </Box>
  );
}

export default Footer;
