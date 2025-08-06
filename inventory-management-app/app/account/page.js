"use client";
import { Box, Button, Typography, Paper } from '@mui/material';
import React from "react";
import { UserAuth } from "../context/AuthContext";
import TopBar from '../components/topBar';
import ScrollToTopOnRefresh from '/app/components/ScrolltoTopOnRefresh';

export default function SignInPage() {
    const { user, googleSignIn, logOut } = UserAuth();

    const handleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#2C3930",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <ScrollToTopOnRefresh />
            <TopBar />

            {user ? (
                <Box sx={{ mt: "200px" }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 'bold',
                            color: '#C5C1B4',
                            fontFamily: '"Exo 2", sans-serif',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                        }}
                    >
                        Welcome, {user.displayName || "User"}!
                    </Typography>

                    <Button
                        variant="contained"
                        onClick={handleSignOut}
                        sx={{
                            mt: 3,
                            backgroundColor: '#3F4F44',
                            color: 'white',
                            width: '20vw',
                            height: '5vh',
                            '&:hover': {
                                backgroundColor: '#202822',
                            },
                        }}
                    >
                        Sign Out
                    </Button>
                </Box>
            ) : (
                <Box sx={{ mt: "250px", textAlign: "center" }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 'bold',
                            color: '#C5C1B4',
                            fontFamily: '"Exo 2", sans-serif',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                        }}
                    >
                        Create an Account to Get Started
                    </Typography>

                    <Paper
                        elevation={20}
                        sx={{
                            width: { xs: "66.66vw", md: "50vw", lg: "33.33vw" },
                            background: 'radial-gradient(ellipse at 50% 50%, #3C4C41, #2C3930)',
                            p: 4,
                            mt: 5,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            borderRadius: "32px",
                        }}
                    >
                        <img src="/images/account.png" alt="Account Icon" width="65px" />

                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleSignIn}
                            sx={{
                                mt: 3,
                                backgroundColor: '#3F4F44',
                                color: 'white',
                                width: '20vw',
                                height: '5vh',
                                '&:hover': {
                                    backgroundColor: '#202822',
                                },
                            }}
                        >
                            <img src="/images/lock.png" alt="Lock Icon" width="30px" style={{ marginRight: '8px' }} />
                            <Typography
                                sx={{
                                    fontSize: "16px",
                                    color: "#DCD7C9",
                                    fontWeight: "bold",
                                    fontFamily: '"Exo 2", sans-serif',
                                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                                }}
                            >
                                Create Account
                            </Typography>
                        </Button>

                        <Typography
                            sx={{
                                mt: 3,
                                fontSize: "14px",
                                color: '#C5C1B4',
                                fontFamily: '"Exo 2", sans-serif',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                            }}
                        >
                            Powered by
                        </Typography>

                        <Box sx={{ mt: 1 }}>
                            <img src="/images/google.png" alt="Google Logo" width="20px" />
                        </Box>

                        <Typography
                            sx={{
                                mt: 3,
                                fontSize: "12px",
                                color: '#C5C1B4',
                                fontFamily: '"Exo 2", sans-serif',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                            }}
                        >
                            Already have an account?
                        </Typography>

                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleSignIn}
                            sx={{
                                mt: 1,
                                backgroundColor: '#3F4F44',
                                color: 'white',
                                width: '20vw',
                                height: '5vh',
                                '&:hover': {
                                    backgroundColor: '#202822',
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color: "#DCD7C9",
                                    fontWeight: "bold",
                                    fontFamily: '"Exo 2", sans-serif',
                                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                                }}
                            >
                                Sign In
                            </Typography>
                        </Button>
                    </Paper>
                </Box>
            )}
        </Box>
    );
}
