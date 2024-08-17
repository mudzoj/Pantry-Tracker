"use client"
import { firestore } from '@/firebase'
import {Box, Stack, Typography,Button,Modal,TextField,InputAdornment, Container} from '@mui/material'
import { update } from 'firebase/database'
import { Firestore } from 'firebase/firestore'
import { collection } from 'firebase/firestore'
import { query } from 'firebase/firestore'
import { getDocs, doc, setDoc, deleteDoc, getDoc} from 'firebase/firestore'
import { useEffect, useState } from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display:"flex",
  flexDirection:"column",
  gap: 3,
};


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

  return ( 


  
    <Box 
      
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection = {'column'} 
      alignItems={'center'}
      gap={2}
      bgcolor= {'#e6f8ff'}
      
     
    > 

      <Box border={'1px solid #333'}  >
        
        <Box
        width ="800px" 
        height = "100px" 
        bgcolor = {'#400b01'}
     
        >
          <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
            Pantry Items
          </Typography>
        </Box>

        <Box
          width ="800px" 
          height = "65px" 
        >
          <TextField
              label="Search Items"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for an item..."

              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Button
                      variant="contained"
                      onClick={() => {
                        if (searchQuery.trim() !== "") {
                          addItem(searchQuery);
                        } else {
                          console.log("Search query is empty. No item added.");
                        }
                      }}
                    >Add
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
            
            
        </Box>

        <Stack width = "800px" height="300px" spacing={2} overflow={'auto'}>
          {filteredPantry.map(({name, count}) =>(
            <Box
              key={name} 
              width="100%"
              minHeight="150px"
              display={'flex'}
              justifyContent={'space-between'}
              paddingX={2}
              alignItems={'center'}
              bgcolor={'#f0f0f0'}  
            >
              <Typography variant = {'h3'} color={'#333'} textAlign={'center'}>
                {
                  name.charAt(0).toUpperCase() + name.slice(1)
                } 
              </Typography>

              <Typography variant={"h3"} color={"#333"} textAlign={"center"}>
                Amount: {count}
              </Typography>
            
              <Button variant="contained" onClick={() => removeItem(name)}>delete</Button>
            </Box>
          ))}
        </Stack>  

      </Box>
    </Box>
  
  
  )
}
