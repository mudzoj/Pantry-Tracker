import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import RecipeCard from "./recipeCard";

const variants = {
  enter: (direction) => ({
    x: direction === "right" ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
  exit: (direction) => ({
    x: direction === "right" ? -300 : 300,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.4 },
  }),
};

export default function AnimatedRecipeCarousel({
  recipes,
  currentIndex,
  animationDirection,
  onClick,
  onDelete,
}) {
  const current = recipes[currentIndex];
  const prev = recipes[currentIndex - 1];
  const next = recipes[currentIndex + 1];

  return (
    <Box sx={{ position: "relative", width: 500, height: 220 }}>
      <AnimatePresence mode="sync" custom={animationDirection}>
        {next && (
          <motion.div
            key={next.title + "-next"}
            initial={{ x: 150, scale: 0.85, opacity: 0.3 }}
            animate={{ x: 50, scale: 0.85, opacity: 0.4 }}
            exit={{ x: 150, scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "absolute",
              top: 20,
              zIndex: 1,
              width: "100%",
            }}
          >
            <RecipeCard recipe={next} />
          </motion.div>
        )}

        {prev && (
          <motion.div
            key={prev.title + "-prev"}
            initial={{ x: -150, scale: 0.85, opacity: 0.3 }}
            animate={{ x: -50, scale: 0.85, opacity: 0.4 }}
            exit={{ x: -150, scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "absolute",
              top: 20,
              zIndex: 1,
              width: "100%",
            }}
          >
            <RecipeCard recipe={prev} />
          </motion.div>
        )}

        {current && (
          <motion.div
            key={current.title + "-center"}
            custom={animationDirection}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{
              position: "absolute",
              top: 0,
              width: "100%",
              zIndex: 2,
            }}
          >
            <RecipeCard
              recipe={current}
              onClick={onClick}
              onDelete={onDelete}
              animationDirection={animationDirection}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
