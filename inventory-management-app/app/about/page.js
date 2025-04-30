"use client"
import { firestore } from '../firebase/firebase'
import {Grid,AppBar,Toolbar, IconButton, MenuIcon, Box, Stack, Typography,Button,Modal,TextField,InputAdornment, Container} from '@mui/material'
import { styled } from '@mui/material/styles';
import { update } from 'firebase/database'
import { Firestore } from 'firebase/firestore'
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
    </Box>
  
  
  )
}
