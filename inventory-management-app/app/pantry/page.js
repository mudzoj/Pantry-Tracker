"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
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
import EntryBox from "/app/components/entryBox";
import MeatIcon from "/app/components/icons/meat.svg";
import DairyIcon from "/app/components/icons/dairy.svg";
import GrainIcon from "/app/components/icons/grains.svg";
import ProduceIcon from "/app/components/icons/produce.svg";
import OtherIcon from "/app/components/icons/other.svg";
import AlphabeticalIcon from "/app/components/icons/alphabetical.svg";
import AddIcon from "/app/components/icons/add.svg";

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
  const [currentIndex, setCurrentIndex] = useState(0); // Track current recipe index

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
  const { recipes, addRecipe, removeRecipe, fetchRecipeItem } = useRecipes();
  const { user } = UserAuth();
  const router = useRouter();

  // Redirect to account page if user is not authenticated
  useEffect(() => {
    if (!user) router.push("/account");
    else console.log("Authenticated user:", user.uid); // Debug user ID
  }, [user]);

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

  // Generate and add a new recipe based on pantry items
  const getRecipes = async () => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    setLoading(true);
    try {
      const idToken = await user.getIdToken(); // Get ID token
      console.log("Sending ID Token:", idToken); // Debug token
      const response = await axios.post(
        "/api/recipes",
        {
          pantryItems: pantry.map((item) => item.name),
        },
        {
          headers: { Authorization: `Bearer ${idToken}` }, // Send token to server
        }
      );
      const newRecipe = response.data.recipe;
      await addRecipe(newRecipe.title, newRecipe.ingredients, newRecipe.instructions);
      setCurrentIndex(recipes.length); // Move to the newly added recipe
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectedIconItem = iconItems.find((item) => item.id === clickedId);
  const foodGroupName = selectedIconItem?.name || "All";

  const filteredPantry = pantry
    .filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;
      if (foodGroupName === "All" || foodGroupName === "Alphabetical") {
        return true;
      } else {
        return item.group === foodGroupName;
      }
    })
    .sort((a, b) => {
      if (foodGroupName === "Alphabetical") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  return (
    <Box
      sx={{
        bgcolor: "#DCD7C9",
        minHeight: "100vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
          justifyContent: "center",
          width: "80%",
          margin: "0 auto",
          boxShadow: "inset 0 4px 8px rgba(0,0,0,0.3)",
          padding: 2,
          borderRadius: 4,
          backgroundColor: "#27322A",
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
            display: "flex",
            justifyContent: "center",
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

      {/* AI Header Section */}
      <Box
        sx={{
          top: 80,
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "center",
          height: "calc(35vh - 80px)",
          overflow: "auto",
          border: "1px solid #ddd",
          padding: 2,
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            color: "#31473A",
            fontFamily: "Roboto",
            textAlign: "center",
            mt: 1,
          }}
        >
          Start generating dishes based on your pantry!
        </Typography>

        <Typography
          variant="h3"
          component="div"
          sx={{
            fontWeight: "bold",
            color: "#31473A",
            fontFamily: "Switzer",
            textAlign: "center",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            letterSpacing: 1,
          }}
        >
          Want Some Inspiration?
        </Typography>
      </Box>

      {/* Generate Button and Recipe Carousel */}
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          mt: 2,
          mb: 4,
        }}
      >
        <Button
          variant="contained"
          onClick={getRecipes}
          disabled={loading}
          sx={{
            width: "240px",
            height: "60px",
            padding: "16px 32px",
            backgroundColor: "#31473A",
            color: "#EDF4F2",
            "&:hover": {
              backgroundColor: "#EDF4F2",
              color: "#31473A",
            },
          }}
        >
          <Typography fontSize={"24px"}>
            {loading ? "Generating..." : "Generate"}
          </Typography>
        </Button>

        {/* Recipe Carousel */}
        {recipes.length > 0 && (
          <Box
            sx={{
              mt: 4,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
              disabled={currentIndex === 0}
              sx={{ color: "#31473A" }}
            >
              <ArrowBack />
            </IconButton>
            <Box
              sx={{
                width: "600px",
                height: "400px",
                overflow: "hidden",
              }}
            >
              <Grid
                container
                spacing={2}
                sx={{
                  transform: `translateX(-${currentIndex * 620}px)`,
                  transition: "transform 0.3s ease",
                  display: "flex",
                }}
              >
                {recipes.map((recipe, index) => (
                  <Grid item key={index}>
                    <Card
                      sx={{
                        width: 600,
                        height: 400,
                        bgcolor: "#EDF4F2",
                        borderRadius: 2,
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h4"
                          sx={{
                            fontFamily: "Switzer",
                            color: "#31473A",
                            fontWeight: "bold",
                            mb: 2,
                            textAlign: "center",
                          }}
                        >
                          {recipe.title}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontFamily: "Roboto",
                            color: "#2C3930",
                            mb: 1,
                          }}
                        >
                          Ingredients:
                        </Typography>
                        <ul style={{ textAlign: "left", paddingLeft: "20px" }}>
                          {recipe.ingredients.map((ingredient, idx) => (
                            <li key={idx} style={{ color: "#2C3930" }}>
                              {ingredient}
                            </li>
                          ))}
                        </ul>
                        <Typography
                          variant="h6"
                          sx={{
                            fontFamily: "Roboto",
                            color: "#2C3930",
                            mt: 2,
                            mb: 1,
                          }}
                        >
                          Instructions:
                        </Typography>
                        <ol style={{ textAlign: "left", paddingLeft: "20px" }}>
                          {recipe.instructions.map((step, idx) => (
                            <li
                              key={idx}
                              style={{
                                color: "#2C3930",
                                marginBottom: "8px",
                              }}
                            >
                              {step}
                            </li>
                          ))}
                        </ol>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <IconButton
              onClick={() =>
                setCurrentIndex((prev) => Math.min(prev + 1, recipes.length - 1))
              }
              disabled={currentIndex === recipes.length - 1}
              sx={{ color: "#31473A" }}
            >
              <ArrowForward />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
}