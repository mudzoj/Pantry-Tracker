"use client";

import React, { useState } from "react";
import {
  AppBar,
  Button,
  Typography,
  Toolbar,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { styled, alpha } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLoading } from "../context/LoadingContext";

const pages = ["pantry", "account"];

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backdropFilter: "blur(24px)",
  backgroundColor: alpha("#3C4C41", 0.7),
  border: "1px solid",
  borderColor: theme.palette.divider,
  boxShadow: theme.shadows[1],
}));

const TopBar = () => {
  const router = useRouter();
  const { setLoading } = useLoading();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [isHoveredLogo, setIsHoveredLogo] = useState(false);
  const [isClickedLogo, setIsClickedLogo] = useState(false);
  const [isHoveredPantry, setIsHoveredPantry] = useState(false);
  const [isHoveredAccount, setIsHoveredAccount] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClick = async (destination) => {
    const currentPath = window.location.pathname;
    if (destination !== currentPath) {
      setLoading(true);
    }

    try {
      await router.push(destination);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <StyledAppBar
      elevation={10}
      position="static"
      variant="outlined"
      sx={{
        mt: "20px",
        mx: "auto",
        width: "60%",
        borderRadius: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "1200px",
          px: 4,
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <Box
            onMouseEnter={() => setIsHoveredLogo(true)}
            onMouseLeave={() => setIsHoveredLogo(false)}
            onMouseDown={() => setIsClickedLogo(true)}
            onMouseUp={() => setIsClickedLogo(false)}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <img
              src={
                isClickedLogo || isHoveredLogo
                  ? "/images/pantry_aid_clicked.png"
                  : "/images/pantry_aid.png"
              }
              alt="Pantry Aid"
              width="65px"
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#DCD7C9",
                letterSpacing: 2,
                fontFamily: "Roboto",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                mt: 1,
              }}
            >
              PantryAid
            </Typography>
          </Box>
        </Link>

        {/* Mobile menu */}
        {isMobile ? (
          <>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiPaper-root": { backgroundColor: "#3f4f44" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    color: "#DCD7C9",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <Link
                    href={`/${page.toLowerCase()}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {page}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          // Desktop buttons (no map)
          <Box sx={{ display: "flex", gap: 3 }}>
            <Button
              onMouseEnter={() => setIsHoveredPantry(true)}
              onMouseLeave={() => setIsHoveredPantry(false)}
              onClick={() => handleClick("/pantry")}
              variant="text"
              sx={{
                color: isHoveredPantry ? "#AFABA0" : "#DCD7C9",
                fontWeight: "bold",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              PANTRY
            </Button>

            <Button
              onMouseEnter={() => setIsHoveredAccount(true)}
              onMouseLeave={() => setIsHoveredAccount(false)}
              onClick={() => handleClick("/account")}
              variant="text"
              sx={{
                color: isHoveredAccount ? "#AFABA0" : "#DCD7C9",
                fontWeight: "bold",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              ACCOUNT
            </Button>
          </Box>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default TopBar;
