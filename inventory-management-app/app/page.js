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
  const handleClick = async (destination) => {
    router.push(destination);
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

      <FadeInSection delay={0}>
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

    

      <ZoomInImage />

      <FadeInSection delay={2.0}>
        <Box>
          <Button
            variant="contained"
            size="large"
            disableElevation
            onClick={() => handleClick('/pantry')} // Add destination
            sx={{
              scale: '150%',
              marginTop: '50px',
              backgroundColor: '#3F4F44',
              color: 'white',
              width: '20vw', // Changed from '20wh' to '20vw'
              height: '5vh',
              '&:hover': {
                backgroundColor: '#202822',
              },
            }}
          >
            <Typography
              sx={{
                color: '#DCD7C9',
                fontWeight: 'bold',
                fontFamily: '"Exo 2", sans-serif',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
              }}
            >
              Get Started
            </Typography>
          </Button>
        </Box>
      </FadeInSection>

      <Box sx={{ height: '200px' }} />
    </Box>
  );
}