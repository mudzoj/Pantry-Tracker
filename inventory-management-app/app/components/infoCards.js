import { useEffect, useState, useRef } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import FadeInSection from './fadeBox';


const InfoCards = ({ }) => {

    return (
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
            <Grid container spacing={7} justifyContent="center" alignItems="stretch">
                <Grid item xs={12} sm={4} md={3} sx={{ display: "flex", height: "100%" }}>
                    <FadeInSection sx={{ width: "100%", height: "100%" }}>
                        <Paper
                            elevation={3}
                            sx={{
                                borderRadius: "20px",
                                paddingBottom: "80px",
                                paddingTop: "40px",
                                textAlign: "center",
                                backgroundColor: "#3F4F44",
                                minHeight: "300px",
                                height: "100%",  // Force equal height
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",  // Distribute content
                                alignItems: "center"
                            }}
                        >
                            <img src="/images/grocery.png" alt="Pantry Aid" width="65px" />
                            <Typography
                                sx={{

                                    flexGrow: 1, // Prevent Typography from expanding
                                    flexShrink: 1, // Allow shrinking if necessary
                                    minHeight: "60px", // Maintain consistent spacing
                                    fontWeight: 'bold',
                                    color: '#2C3930',
                                    textAlign: "center"
                                }}
                            >
                                Stay connected and keep track of what you need across devices, no matter where you are.
                            </Typography>
                        </Paper>
                    </FadeInSection>
                </Grid>

                <Grid item xs={12} sm={4} md={3} sx={{ display: "flex", height: "100%" }}>
                    <FadeInSection sx={{ width: "100%", height: "100%" }}>
                        <Paper
                            elevation={3}
                            sx={{
                                borderRadius: "20px",
                                paddingBottom: "80px",
                                paddingTop: "40px",
                                textAlign: "center",
                                backgroundColor: "#3F4F44",
                                minHeight: "300px",
                                height: "100%",  // Force equal height
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}
                        >
                            <img src="/images/fridge.png" alt="Pantry Aid" width="65px" />
                            <Typography
                                sx={{
                                    flexGrow: 1, // Prevent Typography from expanding
                                    flexShrink: 1, // Allow shrinking if necessary
                                    minHeight: "60px", // Maintain consistent spacing
                                    fontWeight: 'bold',
                                    color: '#2C3930',
                                    textAlign: "center"
                                }}
                            >
                                Keep track of what you currently have, eliminating food waste by keeping track of expiration dates.
                            </Typography>
                        </Paper>
                    </FadeInSection>
                </Grid>

                <Grid item xs={12} sm={4} md={3} sx={{ display: "flex", height: "100%" }}>
                    <FadeInSection sx={{ width: "100%", height: "100%" }}>
                        <Paper
                            elevation={3}
                            sx={{
                                borderRadius: "20px",
                                paddingBottom: "80px",
                                paddingTop: "40px",
                                textAlign: "center",
                                backgroundColor: "#3F4F44",
                                minHeight: "300px",
                                height: "100%",  // Force equal height
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}
                        >
                            <img src="/images/recipe.png" alt="Pantry Aid" width="65px" />
                            <Typography
                                sx={{
                                    flexGrow: 1, // Prevent Typography from expanding
                                    flexShrink: 1, // Allow shrinking if necessary
                                    minHeight: "60px", // Maintain consistent spacing
                                    fontWeight: 'bold',
                                    color: '#2C3930',
                                    textAlign: "center"
                                }}
                            >
                                Out of ideas? The Pantry Aid comes with tools to provide delicious suggestions based on your pantry items.
                            </Typography>
                        </Paper>
                    </FadeInSection>
                </Grid>
            </Grid>

        </Box>

    );
};

export default InfoCards;