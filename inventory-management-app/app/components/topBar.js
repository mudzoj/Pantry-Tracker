"use client"; 

import { AppBar, Button, Typography, Toolbar, Box } from '@mui/material';
import { useRouter } from 'next/navigation'; 
import Link from 'next/link';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles'; // Import styled and alpha

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backdropFilter: 'blur(24px)',  // Glass effect
  backgroundColor: alpha("#333F37", 0.7), // Semi-transparent
  border: '1px solid',
  borderColor: theme.palette.divider,
  boxShadow: theme.shadows[1],
}));

const TopBar = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (destination) => {
    router.push(destination);
  };

  return (
    <StyledAppBar 
  position="static" 
  variant="outlined" 
  sx={{ 
    mt: '20px', 
    mx: 'auto', 
    width: '80%', 
    borderRadius: 2,
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center'
  }}
>
<Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '1200px', px: 4 }}>

        {/* Left section: Logo and text */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Box 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={() => setIsClicked(true)}
            onMouseUp={() => setIsClicked(false)}
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <img 
              src={isClicked ? "/images/pantry_aid_clicked.png" : isHovered ? "/images/pantry_aid_clicked.png" : "/images/pantry_aid.png"} 
              alt="Pantry Aid" 
              width="65px" 
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                color: isClicked ? '#DCD7C9' : isHovered ? "#DCD7C9" : "#DCD7C9",
                letterSpacing: 2,
                fontFamily: 'Roboto',
                mt: 1
              }}
            >
              PantryAid
            </Typography>
          </Box>
        </Link>

        {/* Right section: Buttons */}
        <Box sx={{ display: 'flex', gap: 3 }}>
          {['PANTRY', 'ABOUT', 'SIGN IN'].map((text, index) => (
            <Button 
              key={index}
              variant="text"
              sx={{ 
                color: isClicked ? '#C5C1B4' : isHovered ? "#AFABA0" : "#DCD7C9", 
                fontWeight: 'bold'
              }} 
              onClick={() => handleClick(`/${text.toLowerCase()}`)}
            >
              {text}
            </Button>
          ))}
        </Box>

      </Toolbar>
    </StyledAppBar>
  );
};

export default TopBar;
