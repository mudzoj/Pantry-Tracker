"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import axios from "axios";
import TopBar from "/app/components/topBar";
import SearchBar from "/app/components/searchBar";
import PantryGrid from "/app/components/pantryGrid";
import { usePantry } from "../hooks/usePantry";
import { useRecipes } from "../hooks/useRecipes";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import IconList from "../components/pantryIcons";
import MeatIcon from "/app/components/icons/meat.svg";
import DairyIcon from "/app/components/icons/dairy.svg";
import GrainIcon from "/app/components/icons/grains.svg";
import ProduceIcon from "/app/components/icons/produce.svg";
import OtherIcon from "/app/components/icons/other.svg";
import AlphabeticalIcon from "/app/components/icons/alphabetical.svg";
import AnimatedRecipeCarousel from "/app/components/animatedRecipeCarousel";
import RecipePopup from "/app/components/recipePopup";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [foodGroup, setFoodGroup] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [animationDirection, setAnimationDirection] = useState("right");

  const [hoveredId, setHoveredId] = useState(null);
  const [clickedId, setClickedId] = useState(null);

  const iconItems = [
    { id: 1, name: "Protein", icon: MeatIcon },
    { id: 2, name: "Dairy", icon: DairyIcon },
    { id: 3, name: "Grain", icon: GrainIcon },
    { id: 4, name: "Produce", icon: ProduceIcon },
    { id: 5, name: "Other", icon: OtherIcon },
    { id: 6, name: "Alphabetical", icon: AlphabeticalIcon },
  ];

  const { pantry, addItem, removeItem, fetchPantryItem } = usePantry();
  const { recipes, addRecipe, removeRecipe, fetchRecipes } = useRecipes();
  const { user, loading: authLoading } = UserAuth(); 
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/account");
    } else if (!authLoading && user) {
      fetchRecipes();
    }
  }, [user, authLoading, fetchRecipes]);

  useEffect(() => {
    if (recipes.length > 0) {
      setCurrentIndex((prev) => Math.min(prev, recipes.length - 1));
    } else {
      setCurrentIndex(0);
    }
  }, [recipes]);

  const fetchPantryItemData = async (itemId) => {
    const data = await fetchPantryItem(itemId);
    if (data) {
      setSearchQuery(itemId);
      setFoodGroup(data.group);
      setAmount(data.amount);
      setUnit(data.unit);
      setDay(data.expiry.slice(0, 2));
      setMonth(data.expiry.slice(3, 5));
      setYear(data.expiry.slice(-4));
      
    }
  };

  const getRecipes = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const idToken = await user.getIdToken();
      const response = await axios.post(
        "/api/recipes",
        { pantryItems: pantry.map((item) => item.name) },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
      const newRecipe = response.data.recipe;
      await addRecipe(newRecipe.title, newRecipe.ingredients, newRecipe.instructions);
      setCurrentIndex(0);
      await fetchRecipes();
      setAnimationDirection("right");
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false); 
    }
  };

  const handleDelete = async (recipeTitle) => {
    await removeRecipe(recipeTitle);
    await fetchRecipes(); 
  };

  const selectedIconItem = iconItems.find((item) => item.id === clickedId);
  const foodGroupName = selectedIconItem?.name || "All";

  const filteredPantry = pantry
    .filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;
      if (foodGroupName === "All" || foodGroupName === "Alphabetical") return true;
      return item.group === foodGroupName;
    })
    .sort((a, b) => (foodGroupName === "Alphabetical" ? a.name.localeCompare(b.name) : 0));

  const openPopup = (recipe) => {
    setSelectedRecipe(recipe);
    setPopupOpen(true);
  };

  return (
    <Box
      sx={{
        bgcolor: "#DCD7C9",
        minHeight: "100vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start", 
        backgroundColor: "#2C3930",
      }}
    >
      <TopBar />
      <Box sx={{ marginTop: "200px" }}></Box>

      <Paper
        elevation={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "80%",
          margin: "0 auto",
          boxShadow: "inset 0 4px 8px rgba(0,0,0,0.3)",
          padding: 2,
          borderRadius: 4,
          backgroundColor: "#27322A",
          overflow: "visible",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
            width: "100%",
            pl: 2,
          }}
        >
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            foodGroup={foodGroup}
            setFoodGroup={setFoodGroup}
            date={date}
            setDate={setDate}
            amount={amount}
            setAmount={setAmount}
            unit={unit}
            setUnit={setUnit}
            addItem={addItem}
            open={open}
            setOpen={setOpen}
            edit={edit}
            setEdit={setEdit}
            day={day}
            setDay={setDay}
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
          />
          <IconList
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            clickedId={clickedId}
            setClickedId={setClickedId}
          />
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "block",
            overflow: "visible",
          }}
        >
          <PantryGrid
            filteredPantry={filteredPantry}
            removeItem={removeItem}
            open={open}
            setOpen={setOpen}
            edit={edit}
            setEdit={setEdit}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            foodGroup={foodGroup}
            setFoodGroup={setFoodGroup}
            amount={amount}
            setAmount={setAmount}
            unit={unit}
            setUnit={setUnit}
            day={day}
            setDay={setDay}
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
            fetchPantryItemData={fetchPantryItemData}
          />
        </Box>
      </Paper>

      <Box
        sx={{
          top: 80,
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "center",
          height: "calc(35vh - 80px)",
          overflow: "auto",
          padding: 2,
        }}
      >
        <Typography
          variant="h7"
          sx={{
            fontSize: "20px",
            color: "#AFABA0",
            fontFamily: '"Exo 2", sans-serif',
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            width: "100%",
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          Start generating dishes based on your pantry!
        </Typography>

        <Typography
          variant="h3"
          component="div"
          sx={{
            fontSize: { xs: "20px", sm: "22px", md: "36px", lg: "45px", xl: "50px" },
            fontWeight: "bold",
            color: "#E8E4D9",
            textAlign: "center",
            mt: 1,
            fontFamily: '"Exo 2", sans-serif',
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
            letterSpacing: "0.5px",
          }}
        >
          Want Some Inspiration?
        </Typography>
      </Box>

      <Box sx={{ display: "grid", placeItems: "center", mt: 2, mb: 4 }}>
        <Button
          variant="contained"
          onClick={getRecipes}
          disabled={loading}
          sx={{
            minWidth: "240px",
            height: "64px",
            padding: "12px 24px",
            background: "linear-gradient(135deg, #2c3930 0%, #3f4f44 50%, #4a5b4e 100%)",
            color: "#DCD7C9",
            borderRadius: "32px",
            boxShadow: "0 4px 12px rgba(63, 79, 68, 0.3)",
            transition: "transform 0.3s, box-shadow 0.3s, background 0.5s",
            "&:hover": {
              background: "linear-gradient(135deg, #3f4f44 0%, #4a5b4e 50%, #5c6f5b 100%)",
              boxShadow: "0 8px 24px rgba(63, 79, 68, 0.5), 0 0 12px rgba(220, 215, 201, 0.3)",
              transform: "scale(1.05)",
            },
            "&:disabled": {
              background: "#202922",
              color: "#AFABA0",
              boxShadow: "none",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#DCD7C9",
              fontFamily: '"Exo 2", sans-serif',
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
              letterSpacing: "0.5px",
            }}
          >
            {loading ? "Generating..." : "Generate"}
          </Typography>
        </Button>

        {recipes.length > 0 && recipes[currentIndex] && (
          <Box sx={{ mt: 4, width: "80%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <IconButton
                onClick={() => {
                  setCurrentIndex((prev) => Math.max(0, prev - 1));
                  setAnimationDirection("left");
                }}
                disabled={currentIndex <= 0}
                sx={{ color: "#DCD7C9" }}
              >
                <ArrowBack />
              </IconButton>
              <Typography variant="h6" sx={{ mx: 2, color: "#DCD7C9", fontFamily: "Switzer" }}>
                {currentIndex + 1} of {recipes.length}
              </Typography>
              <IconButton
                onClick={() => {
                  setCurrentIndex((prev) => Math.min(prev + 1, recipes.length - 1));
                  setAnimationDirection("right");
                }}
                disabled={currentIndex >= recipes.length - 1}
                sx={{ color: "#DCD7C9" }}
              >
                <ArrowForward />
              </IconButton>
            </Box>
            <AnimatedRecipeCarousel
              recipes={recipes}
              currentIndex={currentIndex}
              animationDirection={animationDirection}
              onClick={openPopup}
              onDelete={handleDelete}
            />
          </Box>
        )}
      </Box>

      {popupOpen && selectedRecipe && (
        <RecipePopup open={popupOpen} onClose={() => setPopupOpen(false)} recipe={selectedRecipe} />
      )}
    </Box>
  );
}