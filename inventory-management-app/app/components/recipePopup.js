import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const RecipePopup = ({ open, onClose, recipe }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(5px)",
      }}
    >
      <Box
  sx={{
    width: 700,
    maxHeight: "85vh",
    overflowY: "auto",
    bgcolor: "linear-gradient(135deg, #EDF4F2 0%, #DCD7C9 100%)",
    borderRadius: 12,
    boxShadow:
      "0 10px 32px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(49, 71, 58, 0.2)",
    p: 4,
    position: "relative",
    animation: "fadeIn 0.5s ease",
    scrollBehavior: "smooth",
    "&::-webkit-scrollbar": {
      width: "10px",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#AFABA0",
      borderRadius: "3px",
      border: "2px solid #DCD7C9",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#C5C1B4",
    },
    "@keyframes fadeIn": {
      from: { opacity: 0, transform: "scale(0.95)" },
      to: { opacity: 1, transform: "scale(1)" },
    },
  }}
>
        <IconButton
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            color: "#C5C1B4",
            "&:hover": { color: "#AFABA0" },
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          variant="h4"
          sx={{
            fontFamily: '"Exo 2", sans-serif',
            color: "#C5C1B4",
            fontWeight: "bold",
            textAlign: "center",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            mb: 3,
          }}
        >
          {recipe.title || "Untitled"}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Exo 2", sans-serif',
            color: "#AFABA0",
            mb: 2,
            fontWeight: 500,
          }}
        >
          Ingredients:
        </Typography>
        <ul style={{ paddingLeft: "20px", mb: 3 }}>
          {recipe.ingredients && recipe.ingredients.length > 0 ? (
            recipe.ingredients.map((ingredient, idx) => (
              <li key={idx} style={{ color: "#AFABA0", marginBottom: "8px" }}>
                {ingredient || "No ingredient"}
              </li>
            ))
          ) : (
            <li style={{ color: "#AFABA0" }}>No ingredients</li>
          )}
        </ul>
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Exo 2", sans-serif',
            color: "#AFABA0",
            mb: 2,
            fontWeight: 500,
          }}
        >
          Instructions:
        </Typography>
        <ol style={{ paddingLeft: "20px" }}>
          {recipe.instructions && recipe.instructions.length > 0 ? (
            recipe.instructions.map((step, idx) => (
              <li key={idx} style={{ color: "#AFABA0", marginBottom: "12px" }}>
                {step || "No step"}
              </li>
            ))
          ) : (
            <li style={{ color: "#AFABA0" }}>No instructions</li>
          )}
        </ol>
      </Box>
    </Modal>
  );
};

export default RecipePopup;