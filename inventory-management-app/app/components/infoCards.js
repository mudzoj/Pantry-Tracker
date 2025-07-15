'use client';

import '../globals.css';
import { Box, Typography } from '@mui/material';
import FadeInSection from './fadeBox';
import styles from './InfoCards.module.css';

const cards = [
  {
    imgSrc: '/images/grocery.png',
    title: 'Stay Connected',
    description: 'Keep track of what you need across devices, no matter where you are.',
    delay: 0.0,
    scrollAmount: 300,
  },
  {
    imgSrc: '/images/fridge.png',
    title: 'Reduce Waste',
    description: 'Keep track of what you have, eliminating food waste by monitoring expiration dates.',
    delay: 0.0,
    scrollAmount: 600,
  },
  {
    imgSrc: '/images/recipe.png',
    title: 'Recipe Ideas',
    description: 'Out of ideas? Get delicious recipe suggestions based on your pantry items.',
    delay: 0.0,
    scrollAmount: 900,
  },
];

const InfoCards = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, md: 6 },
        marginTop: '60px',
        maxWidth: '800px',
        mx: 'auto',
        px: 2,
        width: '100%',
      }}
    >


      {cards.map((card, index) => (
        <FadeInSection key={index} delay={card.delay} scrollThreshold={card.scrollAmount}>
          <Box
            className={`${styles.card} ${styles.frosted}`}
            sx={{
              height: { xs: '300px', sm: '300px', md: '500px', lg: '600px' },
              width: { xs: '300px', sm: '300px', md: '500px', lg: '600px' },
              padding: { xs: '20px', sm: '30px' },
              mx: 'auto',
            }}
          >
            <Box className={styles.cardContent}>
              <Box
                sx={{
                  marginTop: { sm: '30px', md: '60px' },
                  width: { xs: '80px', sm: '80px', md: '150px', lg: '190px' },
                  height: { xs: '80px', sm: '80px', md: '150px', lg: '190px' },
                  borderRadius: '50%',
                  backgroundColor: '#DCD7C9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Box
                  component="img"
                  src={card.imgSrc}
                  alt={`Pantry Aid: ${card.title}`}
                  sx={{
                    width: { xs: '60px', sm: '60px', md: '100px', lg: '140px' },
                    height: 'auto',
                    objectFit: 'contain',
                  }}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: { xs: '20px', sm: '22px', md: '36px', lg: '45px', xl: '50px' },
                  fontWeight: 'bold',
                  color: '#E8E4D9',
                  textAlign: 'center',
                  mt: 1,
                  fontFamily: '"Exo 2", sans-serif',
                  textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                  letterSpacing: '0.5px',
                }}
              >
                {card.title}
              </Typography>
              <Typography
                sx={{
                  marginTop: { sm: '10px', md: '20px', lg: '20px', xl: '30px' },
                  fontSize: { xs: '16px', sm: '18px', md: '26px', lg: '32px', xl: '34px' },
                  fontWeight: 'normal',
                  color: '#C5C1B4',
                  textAlign: 'center',
                  fontFamily: '"Exo 2", sans-serif',
                  textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                  letterSpacing: '0.3px',
                  maxWidth: '90%',
                  mx: 'auto',
                }}
              >
                {card.description}
              </Typography>
            </Box>
          </Box>
        </FadeInSection>
      ))}
    </Box>
  );
};

export default InfoCards;
