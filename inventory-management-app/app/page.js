"use client"
import { firestore } from '@/firebase'
import {Grid,AppBar,Toolbar, IconButton, MenuIcon, Box, Stack, Typography,Button,Modal,TextField,InputAdornment, Container} from '@mui/material'
import { styled } from '@mui/material/styles';
import { update } from 'firebase/database'
import { Firestore } from 'firebase/firestore'
import { collection } from 'firebase/firestore'
import { query } from 'firebase/firestore'
import { getDocs, doc, setDoc, deleteDoc, getDoc} from 'firebase/firestore'
import { useEffect, useState } from 'react'




export default function Home() {
  const [pantry, setPantry] = useState([])
  const [searchQuery, setSearchQuery] = useState('');

  const [open,setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose =() => setOpen(false)

  const [itemName, setItemName] = useState('')

  const updatePantry = async () => {
      const snapshot = query(collection(firestore, 'pantry'))
      const docs = await getDocs(snapshot)
      const pantryList = []
      docs.forEach((doc) => {
        pantryList.push({name: doc.id, ...doc.data()})
      })
      console.log(pantryList)
      setPantry(pantryList)
    }
  useEffect(() => {
    
    updatePantry()
  }, [])

  const addItem = async(item) =>{
    const docRef = doc(collection(firestore, 'pantry'),item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const {count} = docSnap.data()
      await setDoc(docRef, {count: count + 1})
    }else{
      await setDoc(docRef, {count:1})  
    }

    await updatePantry()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const {count} = docSnap.data()
      if (count === 1) {
        await deleteDoc(docRef)
      }else{
        await setDoc(docRef, {count: count - 1})
      }
    }
    await updatePantry()
  }

  const filteredPantry = pantry.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Styled Button for the delete action
  const DeleteButton = styled(Button)(({ theme }) => ({
    position: 'absolute',
    top: 8,
    right: 8,
    minWidth: 0,
    width: 24,
    height: 24,
    borderRadius: '50%',
    padding: 0,
    fontSize: 16,
    display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
    color: "white",
    backgroundColor: "#d50000",
    '&:hover': {
      backgroundColor: "#ef5350",
    },
}));

const ScrollContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(4 * 150px + 3 * 16px)', // Height for 4 rows with spacing
  overflowY: 'auto', // Enables vertical scrolling if content exceeds height
  scrollbarWidth: 'thin', // Firefox
  scrollbarColor: `${"#31473A"} ${"#EDF4F2"}`, // Firefox
  '&::-webkit-scrollbar': {
    width: '8px', // Width of the scrollbar for WebKit browsers
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: "#EDF4F2", // Track background
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: "#31473A", // Scrollbar color
    borderRadius: '8px', // Rounded scrollbar
  },
}));

  return ( 
   
    <Box 
      sx={{ bgcolor: '#EDF4F2' }} 
      // width="100vw"
      // height="100vh"
      // display={'flex'}
      // justifyContent={'center'}
      // flexDirection = {'column'} 
      // alignItems={'center'}
      // gap={2}
      // bgcolor= {'#e6f8ff'}
      
     
    > 
    <AppBar  sx={{ bgcolor: '#EDF4F2' }} position="static" variant="outlined">
      <Toolbar sx={{display: 'flex', justifyContent: 'space-between', marginLeft: "50px",}}>
        {/* PantryAid text on the left */}
        <Typography
          variant="h3"               // Make the font larger
          component="div"
          sx={{
            fontWeight: 'bold',       // Make the font bold
            color: '#31473A',       // Set the font color to white
            letterSpacing: 2,         // Add some letter spacing
            fontFamily: 'Roboto',     // Use a specific font family
            marginTop: '15px',  // Move text down by 10px
          }}
        >
          PantryAid
        </Typography>

        {/* Buttons on the right */}
        <div style={{ display: 'flex', gap: '30px', marginRight: '50px' }}>
          <Button variant="text" color="warning">
            HOME
          </Button>
          <Button variant="text" color="warning">
            ABOUT
          </Button>
        </div>
      </Toolbar>
    </AppBar>



    {/* Centered Text Below AppBar */}
    <Box
        sx={{
          //position: 'sticky', // Makes the box sticky
          top: 80, // Offset from the top (e.g., AppBar height)
          display: 'flex',
          flexDirection: 'column-reverse', // Reverse order to align content at the bottom
          alignItems: 'center', // Center horizontally
          height: 'calc(50vh - 80px)', // Full height minus the AppBar height
          overflow: 'auto', // Ensure content does not overflow
          border: '1px solid #ddd', // Optional: border for better visualization
         
          padding: 2 // Optional: padding for inner spacing
        }}
      >

        <Typography
          variant="h6"
          component="div"
          sx={{
            color: '#31473A',
            fontFamily: 'Roboto',
            textAlign: 'center',
            mt: 1, // Optional margin top to add space between the main and subheading
          }}
        >
          The Revolutionary Pantry Tracker
        </Typography>

        <Typography
          variant="h1"
          component="div"
          sx={{
            fontWeight: 'bold',
            color: '#31473A', // Dark blue color
            fontFamily: 'Switzer',
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Drop shadow effect
            letterSpacing: 1, // Increase letter spacing
            
          }}
        >
          Pantry Aid
        </Typography>
      </Box>


    {/*Search Field*/}
    <Box
          sx={{
            position: 'sticky',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'calc(10vh - 80px)', // Full height minus the AppBar height
          
          }}
          >
      <TextField
        label="Search"
        fullWidth
        sx={{
          maxWidth: '600px', // Adjust the width as needed
          backgroundColor: '#e8eaf6', // Background color of the search field
          '& .MuiInputBase-root': {
            color: '#333', // Text color within the search field
          },
          '& .MuiInputLabel-root': {
            color: '#333', // Color of the label text
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#9fa8da', // Border color
            },
            '&:hover fieldset': {
              borderColor: '#388e3c', // Border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2e7d32', // Border color when focused
            },
          },
        }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for an item..."
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                variant="contained"
                onClick={() => {
                  if (searchQuery.trim() !== "") {
                    addItem(searchQuery);
                  } else {
                    console.log("Search query is empty. No item added.");
                  }
                }}
                sx={{
                  backgroundColor: '#31473A', // Button color
                  '&:hover': {
                    backgroundColor: '#388e3c', // Button color on hover
                  },
                }}
              >
                Add
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </Box>

        {/* Items */}
        <Box
      sx={{
        width: '100%',
        paddingX: 2,
        paddingY: 1,
        boxSizing: 'border-box',
        pt: "25px",
        fontWeight: 'bold',       // Make the font bold
        color: '#31473A',       // Set the font color to white
        letterSpacing: 2,         // Add some letter spacing
        fontFamily: 'Roboto',     // Use a specific font family
        marginTop: '15px',  // Move text down by 10px

      }}
    >
      <ScrollContainer>
        <Grid container spacing={2}>
          {filteredPantry.map(({ name, count }) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 2,
                    backgroundColor: '#F1F7F5', // Button color
                    '&:hover': {
                      backgroundColor: '#F6FAF9', // Button color on hover
                    },
                  borderRadius: 2,
                  boxShadow: 1,
                  textAlign: 'center',
                  height: '150px', // Fixed height
                  width: '100%',   // Full width of its grid cell
                  position: 'relative', // Necessary for positioning the delete button
                }}
              >
                <DeleteButton
                  variant='contained'
                  onClick={() => removeItem(name)}
                >
                  X
                </DeleteButton>
                <Typography variant='h6' color='#333' sx={{ marginTop: 4 }}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography variant='body1' color='#555'>
                  Amount: {count}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </ScrollContainer>
    </Box>




    {/* AI HEADER SECTION*/}
    <Box
        sx={{
          //position: 'sticky', // Makes the box sticky
          top: 80, // Offset from the top (e.g., AppBar height)
          display: 'flex',
          flexDirection: 'column-reverse', // Reverse order to align content at the bottom
          alignItems: 'center', // Center horizontally
          height: 'calc(35vh - 80px)', // Full height minus the AppBar height
          overflow: 'auto', // Ensure content does not overflow
          border: '1px solid #ddd', // Optional: border for better visualization
         
          padding: 2 // Optional: padding for inner spacing
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            color: '#31473A',
            fontFamily: 'Roboto',
            textAlign: 'center',
            mt: 1, // Optional margin top to add space between the main and subheading
          }}
        >
          Start generating dishes based on your pantry!
        </Typography>

        <Typography
          variant="h1"
          component="div"
          sx={{
            fontWeight: 'bold',
            color: '#31473A', // Dark blue color
            fontFamily: 'Switzer',
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Drop shadow effect
            letterSpacing: 1, // Increase letter spacing
            
          }}
        >
          Want Some Inspiration?
        </Typography>
        
      </Box>

      {/* Generate Button */}
      <Box
       sx={{
        display: 'grid',            // Set the container as a grid
        placeItems: 'center',       // Center items in both axes
        width: '100vw',             // Full viewport width
        }}
      >
        <Button variant="contained" 
          sx={{
            width: '320px',      // Set custom width
            height: '80px',      // Set custom height
            
            padding: '16px 32px', // Adjust padding for more spacing

            backgroundColor: '#31473A', // Use any hex color
            color: '#EDF4F2', // Text color
            '&:hover': {
              backgroundColor: '#EDF4F2', // Custom hover color
              color: '#31473A', // Text color
            },
          }}
        >
          <Typography fontSize={'24px'}>Generate</Typography>
        </Button>
        
      </Box>











      <Box
        sx={{
          //position: 'sticky', // Makes the box sticky
          top: 80, // Offset from the top (e.g., AppBar height)
          display: 'flex',
          flexDirection: 'column-reverse', // Reverse order to align content at the bottom
          alignItems: 'center', // Center horizontally
          height: 'calc(50vh - 80px)', // Full height minus the AppBar height
          overflow: 'auto', // Ensure content does not overflow
          border: '1px solid #ddd', // Optional: border for better visualization
         
          padding: 2 // Optional: padding for inner spacing
        }}
      >

      </Box>

    </Box>
  
  
  )
}
