"use client"
import { firestore } from '@/firebase'
import { Grid, Paper, AppBar, Toolbar, IconButton, MenuIcon, Box, Stack, Typography, Button, Modal, TextField, InputAdornment, Container, Fade } from '@mui/material'
import { styled } from '@mui/material/styles';
import { update } from 'firebase/database'
import { Firestore } from 'firebase/firestore'
import { collection } from 'firebase/firestore'
import { query } from 'firebase/firestore'
import { getDocs, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import TopBar from '/app/components/topBar'
import SearchBar from '/app/components/searchBar'
import PantryGrid from "/app/components/pantryGrid"
import { usePantry } from './hooks/usePantry'
import FadeInSection from '/app/components/fadeBox'
import ZoomInImage from '/app/components/zoomInImage'
import ScrollToTopOnRefresh from './components/ScrolltoTopOnRefresh';



export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const { pantry, addItem, removeItem } = usePantry();

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [itemName, setItemName] = useState('')

  const filteredPantry = pantry.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


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
    background:     'radial-gradient(ellipse at 50% 100%, hsl(30, 4.50%, 8.60%), hsl(139, 11%, 28%))',

  
  }}
>
  <ScrollToTopOnRefresh></ScrollToTopOnRefresh> 
      <TopBar></TopBar>
      
      <Typography
        variant="h4"
        sx={{
          marginTop: '200px', 
          fontWeight: 'bold',
          color: '#C5C1B4'
        }}
      >
        Meet the AI powered Pantry Assistant.
      </Typography>
      <Typography
        variant="h7"
        sx={{
          marginTop: '20px',
          color: '#AFABA0'
        }}
      >
        Your all-in-one tool for your favourite pantry staples!
      </Typography>


      <Box
        sx={{
          marginTop: "50px",
          display: "flex",
          gap: { xs: "20px", sm: "50px", md: "100px", lg: "200px" },
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",

        }}
      >
        <Grid container spacing={10} justifyContent="center" alignItems="stretch">
          <Grid item xs={12} sm={4} md={3}>
            <FadeInSection>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: "20px",
                  padding: "20px",
                  textAlign: "center",
                  backgroundColor: "#DCD7C9",
                  minHeight: "300px",
                }}
              >
                <img src="/images/grocery.png" alt="Pantry Aid" width="65px" />
                <Box mt={1} sx={{ flexGrow: 1 }}>
                  <FadeInSection>
                    <Typography
                      sx={{
                        marginTop: '75px', // Adjust spacing from TopBar
                        fontWeight: 'bold',
                        color: '#2C3930'
                      }}
                    >
                      Stay connected and keep track of what you need across devices, no matter where you are
                    </Typography>
                  </FadeInSection>
                </Box>
              </Paper>
            </FadeInSection>
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <FadeInSection>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: "20px",
                  padding: "20px",
                  textAlign: "center",
                  backgroundColor: "#DCD7C9",
                  minHeight: "300px",
                }}
              >
                <img src="/images/fridge.png" alt="Pantry Aid" width="65px" />
                <Box mt={1} sx={{ flexGrow: 1 }}>
                  <FadeInSection>
                    <Typography
                      sx={{
                        marginTop: '75px', // Adjust spacing from TopBar
                        fontWeight: 'bold',
                        color: '#2C3930'
                      }}
                    >
                      Keep track of what you currently have, eliminating food waste by keeping track of expiration dates.
                    </Typography>
                  </FadeInSection>
                </Box>

              </Paper>
            </FadeInSection>
          </Grid>


          <Grid item xs={12} sm={4} md={3}>
            <FadeInSection>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: "20px",
                  padding: "20px",
                  textAlign: "center",
                  backgroundColor: "#DCD7C9",
                  minHeight: "300px",
                }}
              >
                <img src="/images/recipe.png" alt="Pantry Aid" width="65px" />
                <Box mt={1} sx={{ flexGrow: 1 }}>
                  <FadeInSection>
                    <Typography
                      sx={{
                        marginTop: '75px', // Adjust spacing from TopBar
                        fontWeight: 'bold',
                        color: '#2C3930'
                      }}
                    >
                      Out of ideas? The Pantry Aid comes with tools to provide delicious suggestions based on your pantry items.
                    </Typography>
                  </FadeInSection>
                </Box>
              </Paper>
            </FadeInSection>
          </Grid>

        </Grid>
      </Box>

      
      <ZoomInImage>
      </ZoomInImage>


      <FadeInSection> 
      <Box><Button variant="contained"  size="large" disableElevation 
      sx={{
        scale:"150%",
        marginTop:"200px",
        backgroundColor: '#3F4F44', // Your custom color
        color: 'white', // Text color
        width: '20wh',
        height: '5vh', // Optional: control height for a fixed size
        '&:hover': {
          backgroundColor: '#202822', // Hover effect color
        }
        
      }}
    >
      <Typography sx={{color: "#DCD7C9"}}>
        Get Started  
      </Typography>
                   
</Button></Box>   
      
</FadeInSection>

      
      <Box sx={{ height: '200px' }}>
      </Box>


    </Box>








  )
}
