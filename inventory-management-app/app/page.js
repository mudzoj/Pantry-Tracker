'use client';

import './globals.css';
import { Box, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import TopBar from '/app/components/topBar';
import { usePantry } from './hooks/usePantry';
import FadeInSection from '/app/components/fadeBox';
import ScrollMoveSection from '/app/components/ScrollMoveSection';
import ZoomInImage from '/app/components/zoomInImage';
import ScrollToTopOnRefresh from './components/ScrolltoTopOnRefresh';
import InfoCards from './components/infoCards';
import { UserAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation';
import { useLoading } from './context/LoadingContext';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const { setLoading } = useLoading();
  
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
    <Box
      sx={{
        bgcolor: '#DCD7C9',
        minHeight: '100vh',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start', // Changed to flex-start to avoid vertical centering issues
        background:
          'radial-gradient(ellipse at 50% 100%, hsl(30, 4.50%, 8.60%), hsl(139, 11%, 28%))',
        width: '100%',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      }}
    >
      <ScrollToTopOnRefresh />
      <TopBar />

      <Typography
        variant="h4"
        sx={{
          fontSize: '50px',
          marginTop: '200px',
          fontWeight: 'bold',
          color: '#C5C1B4',
          fontFamily: '"Exo 2", sans-serif',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
          width: '95%',
          //maxWidth: '800px',
          mx: 'auto',
        }}
      >
        Meet the AI powered Pantry Assistant.
      </Typography>

      <FadeInSection delay={0} scrollThreshold={100}>
        <Typography
          variant="h7"
          sx={{
            fontSize: '20px',
            marginTop: '20px',
            color: '#AFABA0',
            fontFamily: '"Exo 2", sans-serif',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            width: '100%',
            maxWidth: '800px',
            mx: 'auto',
          }}
        >
          Your all-in-one tool for your favourite pantry staples!
        </Typography>
      </FadeInSection>


      <InfoCards />

      <FadeInSection delay={0.5} scrollThreshold={900}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            mt: '50px', // Moved marginTop from Button to Box for better control
          }}
        >
          <Button
            variant="contained"
            size="large"
            
            onClick={() => handleClick('/pantry')}
            sx={{
              minWidth: { xs: '200px', sm: '250px', md: '300px' }, // Responsive width
              maxWidth: '400px',
              height: { xs: '48px', sm: '56px', md: '64px' }, // Taller button
              padding: { xs: '8px 16px', sm: '12px 24px' }, // Better padding
              background: 'linear-gradient(135deg, #2c3930 0%, #3f4f44 50%, #4a5b4e 100%)', // Match InfoCards
              color: '#DCD7C9',
              borderRadius: '32px', // Rounded corners like InfoCards
              boxShadow: '0 4px 12px rgba(63, 79, 68, 0.3)', // Subtle shadow
              transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s, background 0.5s',
              '&:hover': {
                background: 'linear-gradient(135deg, #3f4f44 0%, #4a5b4e 50%, #5c6f5b 100%)', // Lighter gradient
                boxShadow: '0 8px 24px rgba(63, 79, 68, 0.5), 0 0 12px rgba(220, 215, 201, 0.3)', // Glow effect
                transform: 'scale(1.05)', // Subtle scale on hover
              },
              '&:focus': {
                outline: '2px solid #C5C1B4', // Accessible focus ring
                outlineOffset: '4px',
                boxShadow: '0 4px 12px rgba(63, 79, 68, 0.3), 0 0 8px rgba(220, 215, 201, 0.5)',
              },
              '&:active': {
                transform: 'scale(0.98)', // Slight press effect
              },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '16px', sm: '18px', md: '20px', lg: '22px' }, // Responsive font
                fontWeight: 'bold',
                color: '#DCD7C9',
                fontFamily: '"Exo 2", sans-serif',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', // Softer shadow
                letterSpacing: '0.5px',
              }}
            >
              Get Started
            </Typography>
          </Button>
        </Box>
      </FadeInSection>

      <Box sx={{ height: '300px' }} />
    </Box>
  );
}