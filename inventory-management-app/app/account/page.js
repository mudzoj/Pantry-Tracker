"use client";
import { Box, Button, Typography, Paper } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import TopBar from '../components/topBar';
import ScrollToTopOnRefresh from '../components/ScrolltoTopOnRefresh';

export default function SignInPage() {
    const {
        user,
        loading,
        handleGoogleSignIn,
        handleSignOut
    } = useAuth();

    return (
        <Box
            sx={{
                bgcolor: "#DCD7C9",
                minHeight: "100vh",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: 'radial-gradient(ellipse at 50% 100%, hsl(30, 4.50%, 8.60%), hsl(139, 11%, 28%))',


            }}
        >
            <ScrollToTopOnRefresh />
            <TopBar></TopBar>

            {loading ? (
                <Typography>Loading...</Typography>
            ) : user ? (
                //User is logged in
                
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            marginTop: '250px',
                            fontWeight: 'bold',
                            color: '#C5C1B4',
                            fontFamily: '"Exo 2", sans-serif', // Add quotes for multi-word fonts
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'

                        }}
                    >
                        Welcome, {user.displayName || "User"}!
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleSignOut}

                        sx={{
                            scale: "100%",
                            marginTop: "25px",
                            backgroundColor: '#3F4F44', // Your custom color
                            color: 'white', // Text color
                            width: '20wh',
                            height: '5vh', // Optional: control height for a fixed size
                            '&:hover': {
                                backgroundColor: '#202822',
                            }
                        }}
                    >
                        Sign Out
                    </Button>
                </Box>
            ) : (

                //user is not logged in

                <Box sx={{ alignItems: "center" }}>
                    <Typography
                        variant="h4"
                        sx={{
                            marginTop: '250px',
                            fontWeight: 'bold',
                            color: '#C5C1B4',
                            fontFamily: '"Exo 2", sans-serif', // Add quotes for multi-word fonts
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'

                        }}
                    >
                        Create an Account to Get Started
                    </Typography>

                    <Paper
                        elevation={16}
                        sx={{
                            width: { xs: "66.66vw", sm: "66.66vw", md: "50vw", lg: "33.33vw" },
                            background: "#2C3930",
                            padding: "30px",
                            height: "300px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "50px auto",
                            borderRadius: "32px",
                        }}
                    >
                        <img src="/images/account.png" alt="Pantry Aid" width="65px" />


                        <Box><Button variant="contained" size="large"
                            onClick={handleGoogleSignIn}
                            sx={{

                                scale: "100%",
                                marginTop: "25px",
                                backgroundColor: '#3F4F44', // Your custom color
                                color: 'white', // Text color
                                width: '20wh',
                                height: '5vh', // Optional: control height for a fixed size
                                '&:hover': {
                                    backgroundColor: '#202822', // Hover effect color
                                }

                            }}
                        >
                            <img src="/images/lock.png" alt="Pantry Aid" width="30px" />
                            <Typography sx={{
                                marginTop: "4px",
                                fontSize: "16px",
                                color: "#DCD7C9", fontWeight: "Bold", fontFamily: '"Exo 2", sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
                                // Add quotes for multi-word fonts
                            }}>
                                Create Account
                            </Typography>

                        </Button>
                            <Box
                            sx={{  display: "flex", // Enables flexbox
                                flexDirection: "row", // Ensures items are in a row
                                alignItems: "center", // Vertically aligns items
                                marginTop: "10px",
                                justifyContent: "center",
                               
                                }}>
                                <Typography
                                    sx={{
                                        fontSize: { xs: "10px", sm: "14px", md: "14px", lg: "14px" },
                                        // minHeight: "60px", // Maintain consistent spacing
                                        fontWeight: '',
                                        color: '#C5C1B4',
                                        textAlign: "center",
                                        marginRight: "8px",
                                        
                                        fontFamily: '"Exo 2", sans-serif', // Add quotes for multi-word fonts
                                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
                                    }}
                                >
                                    Powered by
                                </Typography>
                                <img src="/images/google.png" alt="Pantry Aid" width="15px" marginRight= "20px" />
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: { xs: "10px", sm: "10px", md: "12px", lg: "12px" },
                                    flexGrow: 1, // Prevent Typography from expanding
                                    flexShrink: 1, // Allow shrinking if necessary
                                    // minHeight: "60px", // Maintain consistent spacing
                                    fontWeight: '',
                                    color: '#C5C1B4',
                                    textAlign: "center",
                                    marginTop: "40px",
                                    fontFamily: '"Exo 2", sans-serif', // Add quotes for multi-word fonts
                                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
                                }}
                            >
                                Already have an account?
                            </Typography>
                            <Button variant="contained" size="large" disableElevation
                                onClick={handleGoogleSignIn}
                                sx={{

                                    scale: "50%",

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
                                    marginTop: "1px",
                                    color: "#DCD7C9", fontWeight: "Bold", fontFamily: '"Exo 2", sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
                                    // Add quotes for multi-word fonts
                                }}>
                                    Sign In
                                </Typography>

                            </Button>
                        </Box>
                    </Paper>
                </Box>
            )}




        </Box>


    );
}