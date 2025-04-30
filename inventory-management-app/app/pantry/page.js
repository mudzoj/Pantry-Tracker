"use client"
import { firestore } from '../firebase/firebase'
import {Grid,AppBar,Toolbar, IconButton, MenuIcon, Box, Stack, Typography,Button,Modal,TextField,InputAdornment, Container} from '@mui/material'
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





export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const { pantry, addItem, removeItem } = usePantry();

  const [open,setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose =() => setOpen(false)

  const [itemName, setItemName] = useState('')

  const filteredPantry = pantry.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );



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



    <Box sx={{marginTop:"400px"}}></Box>
    

    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} addItem={addItem} />

    <PantryGrid filteredPantry={filteredPantry} removeItem={removeItem} />
   




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
