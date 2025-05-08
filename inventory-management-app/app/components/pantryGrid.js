import React from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { styled } from '@mui/material/styles';

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
                                padding: 2,
                                backgroundColor: "#2C3930",
                                "&:hover": {
                                    backgroundColor: "#F6FAF9",
                                },
                                borderRadius: 2,
                                boxShadow: 1,
                                textAlign: "center",
                                height: "100px",
                                width: "80%",
                                position: "relative",
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={() => removeItem(name)}
                                sx={{
                                    position: "absolute",
                                    top: 5,
                                    right: 5,
                                    minWidth: "30px",
                                    height: "30px",
                                    fontSize: "14px",
                                    backgroundColor: "#D9534F",
                                    color: "#fff",
                                    "&:hover": { backgroundColor: "#C9302C" },
                                }}
                            >
                                X
                            </Button>
                            <Typography variant="h7" color="#333" sx={{ marginTop: 4 }}>
                                {name.charAt(0).toUpperCase() + name.slice(1)}
                            </Typography>
                            <Typography variant="body1" color="#555">
                                Amount: {count}
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
