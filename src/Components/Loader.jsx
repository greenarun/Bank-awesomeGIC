import React from "react";
import { CircularProgress, circularProgressClasses, Box } from "@mui/material";

const Loader = () => {
  return (
    <Box sx={{ position: "relative", m: "30%" }}>
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={(theme) => ({
          color: "#1a90ff",
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
          ...theme.applyStyles("dark", {
            color: "#308fe8",
          }),
        })}
        size={40}
        thickness={4}
      />
    </Box>
  );
};

export default Loader;
