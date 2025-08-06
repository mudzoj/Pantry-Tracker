import React from "react";
import {
  Grid,
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SvgIcon from "@mui/material/SvgIcon";
import RemoveIcon from "/app/components/icons/remove.svg";

// Styled scroll container with dark-themed gradient, soft shadows, and scrollbar
const StyledScrollBox = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "1200px",
  height: "50vh",
  overflowY: "auto",
  padding: "0 12px 0 8px",
  borderRadius: "8px",
  background: "radial-gradient(ellipse at top, #1B241D 0%, #121812 100%)",
  boxShadow: "inset 0 0 10px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)",

  // Custom scrollbar
  scrollbarWidth: "thin",
  scrollbarColor: "#5E6C5D transparent",

  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#5E6C5D",
    borderRadius: "4px",
    border: "2px solid transparent",
    backgroundClip: "padding-box",
  },
}));

export default function PantryGrid({
  filteredPantry,
  removeItem,
  open,
  setOpen,
  edit,
  setEdit,
  fetchPantryItemData,
}) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));

  let charLimit = 20;
  if (isXs) charLimit = 5;
  else if (isSm) charLimit = 28;
  else if (isMd) charLimit = 24;
  else if (isLg) charLimit = 22;
  else if (isXl) charLimit = 19;

  const truncateText = (text, maxLength) => {
    return text.length > maxLength + 3 ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        mt: "40px",
        flexDirection: "column",
        px: 1,
      }}
    >
      <StyledScrollBox>
        <Grid container spacing={2} sx={{marginTop:"1px", marginBottom:"15px"}}>
          {filteredPantry.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.name}>
              <Box
                onClick={() => {
                  setOpen(true);
                  setEdit(true);
                  fetchPantryItemData(item.name);
                }}
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#202922",
                  background: "radial-gradient(ellipse at 50% 50%, #2C3930, #202922)",
                  "&:hover": {
                    background:
                      "radial-gradient(ellipse at 50% 50%, #3C4C41, #4E6054)",
                  },
                  borderRadius: 2,
                  padding: "16px",
                  cursor: "pointer",
                  textAlign: "center",
                  boxShadow: 1,
                  minHeight: "120px",
                }}
              >
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click
                    removeItem(item.name);
                  }}
                  sx={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    width: 32,
                    height: 32,
                    color: "#CDD7D0",
                    "&:hover": {
                      color: "#9E1A1A",
                    },
                    zIndex: 1,
                    pointerEvents: "auto",
                  }}
                >
                  <SvgIcon component={RemoveIcon} fontSize="small" />
                </IconButton>

                <Typography
                  variant="h6"
                  sx={{
                    color: "#DCD7C9",
                    fontFamily: '"Exo 2", sans-serif',
                    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.4)",
                    fontSize: { xs: 18, sm: 22 },
                    mt: 3,
                    mb: 1,
                  }}
                >
                  {truncateText(
                    item.name.charAt(0).toUpperCase() + item.name.slice(1),
                    charLimit
                  )}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </StyledScrollBox>
    </Box>
  );
}
