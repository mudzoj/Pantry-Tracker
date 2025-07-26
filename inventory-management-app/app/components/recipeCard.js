import { Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion, AnimatePresence } from "framer-motion";

const animationVariants = {
  enter: (direction) => ({
    x: direction === "right" ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: (direction) => ({
    x: direction === "right" ? -300 : 300,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  }),
};

const RecipeCard = ({ recipe, onClick, onDelete, animationDirection }) => {
  return (
    <AnimatePresence mode="wait" custom={animationDirection}>
     <motion.div
  key={recipe?.title}
  custom={animationDirection}
  variants={animationVariants}
  initial="enter"
  animate="center"
  exit="exit"
  style={{ width: 450, height: 180 }}
  whileHover={{
    scale: 1.05,
    boxShadow: "0 12px 32px rgba(255, 255, 255, 0.1)",
  }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
>
  <Card
    sx={{
      width: "100%",
      height: "100%",
      bgcolor: "#202922",
      borderRadius: 3,
      boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
      position: "relative",
      overflow: "hidden",
      cursor: "pointer", // make it look clickable
      transition: "background 0.3s ease",
      "&:hover": {
        bgcolor: "#27322A",
      },
    }}
    onClick={() => onClick?.(recipe)}
  >
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "100%",
              padding: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#FFFFFF",
                fontWeight: "bold",
                fontFamily: '"Exo 2", sans-serif',
                maxWidth: "80%",
                marginLeft: "20px",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {recipe ? recipe.title || "Untitled" : "Loading..."}
            </Typography>
            <IconButton
              sx={{ color: "#FFFFFF", "&:hover": { color: "#DCD7C9" } }}
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(recipe?.title);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default RecipeCard;
