"use client"
import { firestore } from '../firebase/firebase'
import {Grid,AppBar, Paper, SvgIcon, Toolbar, IconButton, MenuIcon, Box, Stack, Typography,Button,Modal,TextField,InputAdornment, Container, ClickAwayListener} from '@mui/material'
import { styled } from '@mui/material/styles';
import { update } from 'firebase/database'
import { db } from 'firebase/firestore'
import { collection } from 'firebase/firestore'
import { query } from 'firebase/firestore'
import { getDocs, doc, setDoc, deleteDoc, getDoc} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import TopBar from '/app/components/topBar'
import SearchBar from '/app/components/searchBar'
import PantryGrid from "/app/components/pantryGrid"
import { usePantry } from '../hooks/usePantry';
import { UserAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import IconList from '../components/pantryIcons';
import { FilterStatus } from '../components/pantryIcons';
import EntryBox from  '/app/components/entryBox'

import MeatIcon from '/app/components/icons/meat.svg';
import DairyIcon from '/app/components/icons/dairy.svg';
import GrainIcon from '/app/components/icons/grains.svg';
import ProduceIcon from '/app/components/icons/produce.svg';
import OtherIcon from '/app/components/icons/other.svg';
import AlphabeticalIcon from '/app/components/icons/alphabetical.svg';
import AddIcon from '/app/components/icons/add.svg';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [foodGroup, setFoodGroup] = useState('');
  const [date, setDate] = useState('')
  const [amount, setAmount] = useState('')
  const [unit, setUnit] = useState('')

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
  const { pantry, addItem, removeItem } = usePantry();
  const {user} = UserAuth();
 
  const selectedIconItem = iconItems.find(function(item) {
    return item.id === clickedId;
  });
  
  const foodGroupName = selectedIconItem?.name || "All";
 
  const filteredPantry = pantry.filter(function(item) {
    if (foodGroupName === "All") {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (foodGroupName === "Alphabetical") {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      console.log(foodGroupName, item.group);
      return item.group === foodGroupName;
    }
  }).sort(function(a, b) {
    if (foodGroupName === "Alphabetical") {
      return a.name.localeCompare(b.name); // Sorting alphabetically (A-Z)
    }
    return 0; // No sorting for other categories
  });

  //redirect user if not logged in
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push('/account');
    }
  }, []);

  return ( 
    <Box 
    sx={{
      bgcolor: "#DCD7C9",
      minHeight: "100vh",
      textAlign: "center",
      display: "flex",
      flexDirection: "column", // Ensures vertical stacking
      alignItems: "center", // Centers items horizontally
      justifyContent: "center", // Centers items vertically rgb(220, 215, 201)
      background: 'radial-gradient(ellipse at 50% 100%, hsl(30, 4.50%, 8.60%), hsl(139, 11%, 28%))',
    }}
    > 

      <TopBar></TopBar>
      <Box sx={{marginTop:"200px"}}></Box>
    
      <Paper
        elevation={4} // Controls shadow depth (1–24)
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "80%",
          margin: "0 auto",
          padding: 2, // Adds inner spacing
          borderRadius: 4, // Fillets the corners
          background: 'radial-gradient(ellipse at 50% 100%, hsl(30, 4.50%, 8.60%), hsl(139, 11%, 28%))',
        }}
      >
        <Box  
          sx={{          
            display: "flex",
            flexDirection: "row",         // horizontal layout
            alignItems: "center",         // vertically align them
            justifyContent: "space-between", // optional: space between them
            width: '100%',
            pl: 2,
            height: 'calc(8vh + 0px)', // Full height minus the AppBar height
            }}> 
          
   
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} 
                     foodGroup= {foodGroup} setFoodGroup = {setFoodGroup} 
                     date= {date} setDate= {setDate}
                     amount = {amount} setAmount = {setAmount}
                     unit = {unit} setUnit = {setUnit}
                     addItem={addItem} />
          <IconList hoveredId={hoveredId} setHoveredId={setHoveredId}
                    clickedId={clickedId} setClickedId={setClickedId}
                    >
                    
          </IconList>

        </Box>

        <PantryGrid filteredPantry={filteredPantry} removeItem={removeItem}  />
      </Paper>


    {/* AI HEADER SECTION*/}
    <Box
        sx={{
          top: 80, 
          display: 'flex',
          flexDirection: 'column-reverse', 
          alignItems: 'center', 
          height: 'calc(35vh - 80px)',
          overflow: 'auto', 
          border: '1px solid #ddd',
          padding: 2
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            color: '#31473A',
            fontFamily: 'Roboto',
            textAlign: 'center',
            mt: 1,
          }}
        >
          Start generating dishes based on your pantry!
        </Typography>

        <Typography
          variant="h3"
          component="div"
          sx={{
            fontWeight: 'bold',
            color: '#31473A', 
            fontFamily: 'Switzer',
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            letterSpacing: 1, 
            
          }}
        >
          Want Some Inspiration?
        </Typography>
        
      </Box>

      {/* Generate Button */}
      <Box
       sx={{
        display: 'grid',            
        placeItems: 'center',     
        width: '100vw',            
        }}
      >
        <Button variant="contained" 
          sx={{
            width: '240px',  
            height: '60px',                 
            padding: '16px 32px',
            backgroundColor: '#31473A', 
            color: '#EDF4F2', 
            '&:hover': {
              backgroundColor: '#EDF4F2', 
              color: '#31473A', 
            },
          }}
        >
          <Typography fontSize={'24px'}>Generate</Typography>
        </Button>
        
      </Box>


      <Box
        sx={{
          top: 80, 
          display: 'flex',
          flexDirection: 'column-reverse', 
          alignItems: 'center', 
          height: 'calc(50vh - 80px)', 
          overflow: 'auto', 
          border: '1px solid #ddd', 
          padding: 2 
        }}
      >

      </Box>

    </Box>
  
  
  )
}
