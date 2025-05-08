import React from "react";
import { Grid, Box, Typography, Button, SvgIcon } from "@mui/material";
import { styled } from '@mui/material/styles';

import RemoveIcon from '/app/components/icons/remove.svg';
const PantryGrid = ({ filteredPantry, removeItem }) => {

    const ScrollContainer = styled(Box)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(4 * 150px + 3 * 16px)', // Height for 4 rows with spacing
        overflowY: 'auto', // Enables vertical scrolling if content exceeds height
        scrollbarWidth: 'thin', // Firefox
        scrollbarColor: `${"#31473A"} ${"#EDF4F2"}`, // Firefox
        '&::-webkit-scrollbar': {
            width: '8px', // Width of the scrollbar for WebKit browsers
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: "#EDF4F2", // Track background
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: "#31473A", // Scrollbar color
            borderRadius: '8px', // Rounded scrollbar
        },
    }));

    return (
        <Box
            sx={{
                width: '80%',
                paddingX: 5,
                paddingY: 2,
                boxSizing: 'border-box',
                pt: "25px",
                fontWeight: 'bold',       // Make the font bold
                color: '#2C3930',       // Set the font color to white 
                letterSpacing: 2,         // Add some letter spacing
                fontFamily: 'Roboto',     // Use a specific font family
                marginTop: '75px',  // Move text down by 10px

                marginLeft: 'auto',
                marginRight: 'auto',
            }}>

            < ScrollContainer>
                <Grid container columnSpacing={0} rowSpacing={2}>
                    {filteredPantry.map(({ name, count }) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    // padding: 2,
                                    background: 'radial-gradient(ellipse at 50% 50%, #2C3930, #3C4C41)',
                                    "&:hover": {
                                        background: 'radial-gradient(ellipse at 50% 50%,  #3C4C41, #4E6054)',
                                    },
                                    cursor: "pointer",
                                    borderRadius: 2,
                                    boxShadow: 1,
                                    textAlign: "center",
                                    height: "100px",
                                    width: "80%",
                                    position: "relative",
                                }}
                            >
                                <Box
                                sx={{position:"absolute",    top: 8,
                                    left: 8,}}>
                                    <SvgIcon
                                        component={RemoveIcon}
                                        onClick={() => removeItem(name)}
                                        sx={{
                                            "&:hover": {
                                                color: "#DCD7C9", // Change to your desired hover color
                                            },
                                            color: "#111613",
                                            cursor: "pointer",
                                            fontSize: 18,


                                        }}
                                    />
                                </Box>

                                <Typography variant="h7" color="#1A221C" sx={{ marginTop: 4 }}>
                                    {name.charAt(0).toUpperCase() + name.slice(1)}
                                </Typography>

                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </ScrollContainer>
        </Box>
    );
};

export default PantryGrid;
