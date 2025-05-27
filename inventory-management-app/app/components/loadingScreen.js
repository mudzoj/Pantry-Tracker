"use client";
import { useLoading } from "../context/LoadingContext";
import { CircularProgress, Box } from "@mui/material";

const LoadingScreen = () => {
  const { loading } = useLoading();

  if (!loading) return null;

    return(
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        backgroundColor: '#202922',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
      }}
    >
      <CircularProgress sx={{color:"#DCD7C9"}}size={80} thickness={4} />
    </Box>
  );
};

export default LoadingScreen;
