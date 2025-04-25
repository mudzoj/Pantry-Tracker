"use client"; 

import React from "react";
import { AppBar, Button, Typography, Toolbar, Box, IconButton,Menu,MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation'; 
import Link from 'next/link';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles'; // Import styled and alpha
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';



const pages = ['pantry', 'about', 'account'];
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backdropFilter: 'blur(24px)',  // Glass effect
  backgroundColor: alpha("#3C4C41", 0.7), // Semi-transparent
  border: '1px solid',
  borderColor: theme.palette.divider,
  boxShadow: theme.shadows[1],
}));

const TopBar = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Detects if screen is small (mobile)
  const handleClick = (destination) => {
    router.push(destination);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <StyledAppBar 
  position="static" 
  variant="outlined" 
  sx={{ 
    mt: '20px', 
    mx: 'auto', 
    width: '80%', 
    borderRadius: 2,
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center'
  }}
>
<Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '1200px', px: 4 }}>

        {/* Left section: Logo and text */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Box 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={() => setIsClicked(true)}
            onMouseUp={() => setIsClicked(false)}
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <img 
              src={isClicked ? "/images/pantry_aid_clicked.png" : isHovered ? "/images/pantry_aid_clicked.png" : "/images/pantry_aid.png"} 
              alt="Pantry Aid" 
              width="65px"
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                color: isClicked ? '#DCD7C9' : isHovered ? "#DCD7C9" : "#DCD7C9",
                letterSpacing: 2,
                fontFamily: 'Roboto',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' ,
                mt: 1
              }}
            >
              PantryAid
            </Typography>
          </Box>
        </Link>
        
        {isMobile ? (
          <>
          <IconButton
              size="large"
              aria-label="account of current user"
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' }, 
              "& .MuiPaper-root": { backgroundColor:"#3f4f44" },}}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu} sx={{ color: "#DCD7C9",textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'}} >
                  <Link href={`/${page.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </Link>
                </MenuItem>
              ))}
            </Menu>
        </>
        ):(
        <>
        {/* Right section: Buttons */}
        <Box sx={{ display: 'flex', gap: 3 }}>
          {['PANTRY', 'ABOUT', 'ACCOUNT'].map((text, index) => (
            <Button 
              key={index}
              variant="text"
              sx={{ 
                color: isClicked ? '#C5C1B4' : isHovered ? "#AFABA0" : "#DCD7C9", 
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' 

              }} 
              onClick={() => handleClick(`/${text.toLowerCase()}`)}
            >
              {text}
            </Button>
          ))}
        </Box>
        </>
        )}

      </Toolbar>
    </StyledAppBar>
  );
};

export default TopBar;
