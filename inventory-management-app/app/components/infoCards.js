import '../globals.css'; // Ensure this is correctly imported
import { useEffect, useState, useRef } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import FadeInSection from './fadeBox';


const InfoCards = ({ }) => {

    return (

        
        <Grid container spacing={3} justifyContent="center" sx={{marginTop: "60px"}}>
        <Grid item xs={10} sm={4} md={3}>
        <FadeInSection>
          <Paper 
            elevation={16}
            
            style={{  borderRadius: "32px",backgroundColor: "#2C3930", padding: '20px', height: '300px', display: 'flex', flexDirection: 'column', alignItems: "center"  }}
          >
             <img src="/images/grocery.png" alt="Pantry Aid" width="65px" />
                            <Typography
                                sx={{
                                    fontSize: { xs: "18px", sm: "16px", md: "16px", lg: "16px" }, 
                                    flexGrow: 1, // Prevent Typography from expanding
                                    flexShrink: 1, // Allow shrinking if necessary
                                    minHeight: "60px", // Maintain consistent spacing
                                    fontWeight: '',
                                    color: '#C5C1B4',
                                    textAlign: "center",
                                    marginTop: "40px",
                                    fontFamily: '"Exo 2", sans-serif', // Add quotes for multi-word fonts
                                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' 
                                }}
                            >
                                Stay connected and keep track of what you need across devices, no matter where you are.
                            </Typography>           
          </Paper>
          </FadeInSection>
        </Grid>
        <Grid item xs={10} sm={4} md={3}>
        <FadeInSection>
          <Paper 
            elevation={16} 
            style={{borderRadius: "32px", backgroundColor: "#2C3930", padding: '20px', height: '300px', display: 'flex', flexDirection: 'column', alignItems: "center" }}
          >
          <img src="/images/fridge.png" alt="Pantry Aid" width="65px"  />
                            <Typography
                                sx={{
                                    fontSize: { xs: "18px", sm: "16px", md: "16px", lg: "16px" } ,
                                    flexGrow: 1, // Prevent Typography from expanding
                                    flexShrink: 1, // Allow shrinking if necessary
                                    minHeight: "60px", // Maintain consistent spacing
                                    fontWeight: '',
                                    color: '#C5C1B4',
                                    textAlign: "center",
                                    marginTop: "40px",
                                    fontFamily: '"Exo 2", sans-serif', // Add quotes for multi-word fonts
                                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' 

                                }}
                            >
                                Keep track of what you currently have, eliminating food waste by keeping track of expiration dates.
                            </Typography>
          </Paper>
          </FadeInSection>
        </Grid>
        <Grid item xs={10} sm={4} md={3}>
        <FadeInSection>
          <Paper 
            elevation={16} 
            style={{borderRadius: "32px", backgroundColor: "#2C3930", padding: '20px', height: '300px', display: 'flex', flexDirection: 'column', alignItems: "center"  }}
          >
                            <img src="/images/recipe.png" alt="Pantry Aid" width="65px" />
                            <Typography
                                sx={{
                                    fontSize: { xs: "18px", sm: "16px", md: "16px", lg: "16px" } ,
                                    flexGrow: 1, // Prevent Typography from expanding
                                    flexShrink: 1, // Allow shrinking if necessary
                                    minHeight: "60px", // Maintain consistent spacing
                                    fontWeight: '',
                                    color: '#C5C1B4',
                                    textAlign: "center",
                                    marginTop: "40px",
                                    fontFamily: '"Exo 2", sans-serif', // Add quotes for multi-word fonts
                                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' 

                                }}
                            >
                                Out of ideas? The Pantry Aid comes with tools to provide delicious suggestions based on your pantry items.
                            </Typography>
          </Paper>
          </FadeInSection>
        </Grid>
      </Grid>

    );
};

export default InfoCards;