import React from "react";
import { Grid, Box, Typography, Button, SvgIcon, useTheme, useMediaQuery, } from "@mui/material";
import { styled } from '@mui/material/styles';
import EntryBox from "./entryBox";
import RemoveIcon from '/app/components/icons/remove.svg';
export default function PantryGrid ({ filteredPantry, removeItem, open, setOpen, edit, setEdit, fetchPantryItemData})  {

    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.only('xs'));
    const isSm = useMediaQuery(theme.breakpoints.only('sm'));
    const isMd = useMediaQuery(theme.breakpoints.only('md'));
    const isLg = useMediaQuery(theme.breakpoints.only('lg'));
    const isXl = useMediaQuery(theme.breakpoints.only('xl'));
    const truncateText = (text, maxLength) => {
        return text.length > maxLength+3 ? text.slice(0, maxLength) + '...' : text;
    };

    let charLimit = 20;
    if (isXs) charLimit = 5;
    else if (isSm) charLimit = 28;
    else if (isMd) charLimit = 24;
    else if (isLg) charLimit = 22;
    else if (isXl) charLimit = 19;

  

   

    const ScrollContainer = styled(Box)(({ theme }) => ({
        display: 'flex',
       
        flexDirection: 'column',
        height: 'calc(4 * 150px + 3 * 16px)', // Height for 4 rows with spacing
        overflowY: 'auto', // Enables vertical scrolling if content exceeds height
        scrollbarWidth: 'thin', // Firefox
        scrollbarColor: `${"#232D26"} ${"#3F4F44"}`, // Firefox
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
                width: '100%',
                display: 'flex',
                justifyContent: 'center', 
                pt: "25px",
                fontWeight: 'bold',
                color: '#2C3930',
                letterSpacing: 2,
                fontFamily: 'Roboto',
                marginTop: '50px',
                
            }}>

            < ScrollContainer sx={{ width: '100%', maxWidth: '1200px', padding: '10px' }}>
                <Grid container columnSpacing={1} rowSpacing={2} justifyContent="flex-start">
                    {filteredPantry.map(({ name, count }) => (
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={name}>
                            <Box
                                onClick={() => {
                                    
                                    setOpen(true);
                                    setEdit(true);
                                    fetchPantryItemData(name)}}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    // padding: 2,
                                    backgroundColor: "#202922",
                                    boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.1)',
                                    
                                    
                                    background: 'radial-gradient(ellipse at 50% 50%, #2C3930, #202922)',
                                    "&:hover": {
                                        background: 'radial-gradient(ellipse at 50% 50%,  #3C4C41, #4E6054)',
                                    },
                                    cursor: "pointer",
                                    borderRadius: 2,
                                    boxShadow: 1,
                                    textAlign: "center",
                                    // height: "100px",
                                    width: "100%",
                                    position: "relative",
                                }}
                            >
                                <Box
                                    sx={{ position: "absolute", top: 8, left: 8, }}>
                                    <SvgIcon
                                        component={RemoveIcon}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeItem(name)
                                        

                                        }}
                                        sx={{
                                            "&:hover": {
                                                color: "#9E1A1A", // Change to your desired hover color
                                            },
                                            color: "#CDD7D0",
                                            cursor: "pointer",
                                            fontSize: 18,


                                        }}
                                    />
                                </Box>

                                <Typography variant="h7" color="#CDD7D0"
                                    sx={{
                                        marginTop: 3, marginBottom: 1,
                                        fontSize: {
                                            xs: 20,
                                            sm: 22,
                                            md: 18,
                                            lg: 16,
                                            xl: 18,
                                        },
                                    }}>
                                    {truncateText(name.charAt(0).toUpperCase() + name.slice(1), charLimit)}
                                </Typography>

                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </ScrollContainer>
        </Box>
    );
};

