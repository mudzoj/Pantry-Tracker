'use client';

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Button,
  Typography,
  Toolbar,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { styled, alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLoading } from '../context/LoadingContext';

const pages = ['pantry', 'account'];

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backdropFilter: 'blur(24px)',
  background: 'linear-gradient(135deg, #2c3930 0%, #3f4f44 50%, #4a5b4e 100%)',
  border: '1px solid',
  borderColor: alpha(theme.palette.divider, 0.5),
  boxShadow: '0 4px 12px rgba(63, 79, 68, 0.3)',
}));

const TopBar = () => {
  const router = useRouter();
  const { setLoading } = useLoading();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [isHoveredLogo, setIsHoveredLogo] = useState(false);
  const [isClickedLogo, setIsClickedLogo] = useState(false);
  const [isHoveredPantry, setIsHoveredPantry] = useState(false);
  const [isHoveredAccount, setIsHoveredAccount] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const atTop = window.scrollY < 50; // Show if near top
      setIsVisible(atTop);
    };

    const handleMouseMove = (event) => {
      const mouseY = event.clientY;
      const nearTop = mouseY < 100; // Show if mouse is near top
      setIsVisible((prev) => prev || nearTop);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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
      position="fixed"
      variant="outlined"
      sx={{
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        mt: { xs: '10px', sm: '15px', md: '20px' },
        width: { xs: '90%', sm: '80%', md: '70%' },
        maxWidth: '1200px',
        borderRadius: '32px',
        zIndex: 1200,
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'opacity 0.3s ease',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Box
            onMouseEnter={() => setIsHoveredLogo(true)}
            onMouseLeave={() => setIsHoveredLogo(false)}
            onMouseDown={() => setIsClickedLogo(true)}
            onMouseUp={() => setIsClickedLogo(false)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1, sm: 1.5 },
              transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              '&:hover': {
                transform: 'scale(1.05)',
                '& img': {
                  filter: 'drop-shadow(0 0 8px rgba(220, 215, 201, 0.5))',
                },
              },
            }}
          >
            <img
              src={isClickedLogo || isHoveredLogo ? '/images/pantry_aid_clicked.png' : '/images/pantry_aid.png'}
              alt="Pantry Aid"
              style={{
                width: 'clamp(50px, 5vw, 70px)',
                height: 'auto',
                transition: 'filter 0.3s ease',
              }}
            />
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
                fontWeight: 'bold',
                color: '#DCD7C9',
                letterSpacing: '1px',
                fontFamily: '"Exo 2", sans-serif',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4)',
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
              sx={{
                color: '#DCD7C9',
                '&:hover': {
                  backgroundColor: alpha('#4a5b4e', 0.3),
                  transform: 'scale(1.1)',
                },
                transition: 'transform 0.3s, background-color 0.3s',
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  background: 'linear-gradient(135deg, #2c3930 0%, #3f4f44 50%, #4a5b4e 100%)',
                  borderRadius: '16px',
                  boxShadow: '0 4px 12px rgba(63, 79, 68, 0.3)',
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                    handleClick(`/${page.toLowerCase()}`);
                  }}
                  sx={{
                    color: '#DCD7C9',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4)',
                    transition: 'background-color 0.3s, transform 0.3s',
                    '&:hover': {
                      backgroundColor: alpha('#4a5b4e', 0.3),
                      transform: 'scale(1.03)',
                    },
                 
                  }}
                >
                  <Typography sx={{ textAlign: 'center', fontFamily: '"Exo 2", sans-serif' }}>
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          // Desktop buttons
          <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2, md: 3 } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onMouseEnter={() => (page === 'pantry' ? setIsHoveredPantry(true) : setIsHoveredAccount(true))}
                onMouseLeave={() => (page === 'pantry' ? setIsHoveredPantry(false) : setIsHoveredAccount(false))}
                onClick={() => handleClick(`/${page.toLowerCase()}`)}
                variant="text"
                sx={{
                  color: (page === 'pantry' && isHoveredPantry) || (page === 'account' && isHoveredAccount) ? '#C5C1B4' : '#DCD7C9',
                  fontWeight: 'bold',
                  fontFamily: '"Exo 2", sans-serif',
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4)',
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'color 0.3s, transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    '&:after': {
                      transform: 'translateX(0)',
                    },
                  },
                  '&:focus': {
                    outline: '2px solid #C5C1B4',
                    outlineOffset: '2px',
                  },
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '2px',
                    backgroundColor: '#C5C1B4',
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.3s ease',
                  },
                }}
              >
                {page.toUpperCase()}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default TopBar;