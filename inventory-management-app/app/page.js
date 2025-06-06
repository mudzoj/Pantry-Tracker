"use client"
import './globals.css'; // Ensure this is correctly imported
import { Box, Typography, Button, } from '@mui/material'
import { useEffect, useState } from 'react'
import TopBar from '/app/components/topBar'
import { usePantry } from './hooks/usePantry'
import FadeInSection from '/app/components/fadeBox'
import ZoomInImage from '/app/components/zoomInImage'
import ScrollToTopOnRefresh from './components/ScrolltoTopOnRefresh';
import InfoCards from './components/infoCards';
import { UserAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation'; 
import { useLoading } from "./context/LoadingContext";
import Link from 'next/link';

export default function Home() {


  const router = useRouter();
  const handleClick = async (destination) => {

   router.push(destination);
   
  };

  return (


    <Box
      sx={{
        bgcolor: "#DCD7C9",
        minHeight: "100vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column", // Ensures vertical stacking
        alignItems: "center", // Centers items horizontally
        justifyContent: "center", // Centers items vertically rgb(220, 215, 201)
        background: 'radial-gradient(ellipse at 50% 100%, hsl(30, 4.50%, 8.60%), hsl(139, 11%, 28%))',


      }}
    >
      <ScrollToTopOnRefresh></ScrollToTopOnRefresh>
      <TopBar></TopBar>

      <Typography
        variant="h4"
        sx={{
          marginTop: '200px',
          fontWeight: 'bold',
          color: '#C5C1B4',
          fontFamily: '"Exo 2", sans-serif', // Add quotes for multi-word fonts
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'

        }}
      >
        Meet the AI powered Pantry Assistant.
      </Typography>
      <FadeInSection>
        <Typography
          variant="h7"
          sx={{
            fontSize: "14px",
            marginTop: '20px',
            color: '#AFABA0',
            fontFamily: '"Exo 2", sans-serif', // Add quotes for multi-word fonts
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'

          }}
        >
          Your all-in-one tool for your favourite pantry staples!
        </Typography>
      </FadeInSection>

      <InfoCards></InfoCards>

      <ZoomInImage>
      </ZoomInImage>


      <FadeInSection>
        <Box><Button  variant="contained" size="large" disableElevation
          
          sx={{

            scale: "150%",
            marginTop: "50px",
            backgroundColor: '#3F4F44', // Your custom color
            color: 'white', // Text color
            width: '20wh',
            height: '5vh', // Optional: control height for a fixed size
            '&:hover': {
              backgroundColor: '#202822', // Hover effect color
            }

          }}
        >
          <Typography sx={{
            color: "#DCD7C9", fontWeight: "Bold", fontFamily: '"Exo 2", sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
            // Add quotes for multi-word fonts
          }}>
            Get Started
          </Typography>

        </Button></Box>

      </FadeInSection>


      <Box  sx={{ height: '200px' }}>
      </Box>


    </Box>








  )
}
