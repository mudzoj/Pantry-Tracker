import { Dialog, DialogTitle, Button, TextField, Box, MenuItem, Typography } from '@mui/material'
import { useEffect, useState } from 'react'


export default function EntryBox({ onClose, selectedValue, open, searchQuery,
                                   setSearchQuery, foodGroup, setFoodGroup, 
                                   setDate, amount, setAmount, unit, setUnit,
                                   addItem, edit, setEdit, day, setDay, month, setMonth,
                                   year, setYear}) {

  const groups = ["Protein", "Produce", "Grain", "Dairy", "Other"]
  const amounts = ["items", "g", "kg", "mL", "L", "cup"]



  const [errors, setErrors] = useState({
    day: false,
    month: false,
    year: false,
    searchQuery: false,
    foodGroup: false,
  });

  const handleClose = () => {
    onClose(selectedValue);
    setSearchQuery("")
    setDay("")
    setMonth("")
    setYear("")
    setErrors({
      day: false,
      month: false,
      year: false,
      searchQuery: false,
      foodGroup: false,
    });
  };


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };
  const handleSubmit = () => {
    const dayValid = Number(day) >= 1 && Number(day) <= 31;
    const monthValid = Number(month) >= 1 && Number(month) <= 12;
    const yearValid = /^\d{4}$/.test(year) && Number(year) >= 2025; // 4-digit year
    const searchQueryValid = searchQuery.length > 0;
    const foodGroupValid = foodGroup.length > 0;

    setErrors({
      day: !dayValid,
      month: !monthValid,
      year: !yearValid,
      searchQuery: !searchQueryValid,
      foodGroup : !foodGroupValid,
    });

    if (dayValid && monthValid && yearValid && searchQueryValid && foodGroupValid) {
      setDate(day +"/" +month +"/" + year)
      console.log("Submit:", {day,month,year});
      addItem(searchQuery, foodGroup, amount, unit, day +"/" +month +"/" + year)
      handleClose()
    }
  };



  return (
    <Dialog
      onClose={handleClose}
      open={open}
      onKeyDown={handleKeyDown}
      TransitionProps={{
        onExited: ()=> setEdit(false)
      }}
      PaperProps={{ sx: { width: "75vw", } }}>
      <Box
        backgroundColor="#DCD7C9"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'center',
          justifyContent: "center",
        }}
      >

        <DialogTitle>Add to your Pantry</DialogTitle>
        <Box sx={{ display: "flex", alignItems: 'center', gap: 2 }}>
          <TextField

            id="outlined"
            size="small"
            label="Pantry Item"
            placeholder="Chicken Breast"
            value={searchQuery}
            InputProps={{readOnly: edit? true: false}}
            onChange={(e) => setSearchQuery(e.target.value)}
            error={errors.searchQuery}
            helperText={errors.searchQuery ? "Enter an Item" : ""}
            sx={{ width: "60%", marginLeft: "10px" }}
          />
          <TextField
            id="outlined-required"
            select
            size="small"
            label="Food Group"
            InputLabelProps={{ shrink: true }}
            defaultValue="Protein"
            error={errors.foodGroup}
            helperText={errors.foodGroup ? "Select a Food Group" : ""}
            sx={{ width: "30%" }}
            value={foodGroup}
            onChange={(e) => setFoodGroup(e.target.value)}
          >
            {groups.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"

          }}>


<Box sx={{ 
            marginTop: "25px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "row"
          }}>

            <TextField

              id="outlined-required"
              label="Amount"
              placeholder="0"
              size="small"
              type="text"
              value={amount}
              InputLabelProps={{ shrink: true }}
              inputProps={{ maxLength: 6, inputMode: "numeric", pattern: "[0-9]*" }}
              onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
              sx={{ width: "20%", marginLeft: "10px" }}
            />

            <TextField
              id="outlined-required"
              InputLabelProps={{ shrink: true }}
              select
              size="small"
              label="Units"
              defaultValue="g"
              sx={{ width: "15%" }}
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              
            >
              {amounts.map((option2) => (
                <MenuItem key={option2} value={option2}>
                  {option2}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box
            sx={{
              marginTop:"25px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "row"}}>
            <TextField

              id="outlined-required"
              label="Day"
              size="small"
              placeholder="Expiry"
              type="text"
              InputLabelProps={{ shrink: true }}
              inputProps={{ maxLength: 2, inputMode: "numeric", pattern: "[0-9]*" }}
              value={day}
              error={errors.day}
              helperText={errors.day ? "Invalid Day" : ""}
              onChange={(e) => setDay(e.target.value.replace(/\D/g, ''))} // Optional: auto-remove non-digits
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ width: "15%", marginLeft: "10px" }}
            />


            <TextField

              id="outlined-required"
              label="Month"
              size="small"
              type="text"
              InputLabelProps={{ shrink: true }}
              inputProps={{ maxLength: 2, inputMode: "numeric", pattern: "[0-9]*" }}
              value={month}
              onChange={(e) => setMonth(e.target.value.replace(/\D/g, ''))}
              error={errors.month}
              helperText={errors.month ? "Invalid Month" : ""}
              sx={{ width: "15%", marginLeft: "10px" }}
            />
            <TextField

              id="outlined-required"
              label="Year"
              size="small"
              type="text"
              InputLabelProps={{ shrink: true }}
              inputProps={{ maxLength: 4, inputMode: "numeric", pattern: "[0-9]*" }}
              value={year}
              onChange={(e) => setYear(e.target.value.replace(/\D/g, ''))}
              error={errors.year}
              helperText={errors.year ? "Invalid Year" : ""}
              sx={{ width: "20%", marginLeft: "10px" }}
            />

          </Box>
          
          <Box
          sx={{            
            marginTop: "25px",
            marginBottom:"10px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "row"}}>
          <Button
          variant="contained"
          onClick={() => {
            if (searchQuery.trim() !== "") {
              handleSubmit();
            } else {
              console.log("Search query is empty. No item added.");
            }
          }}
          sx={{
            width:"10%",
            backgroundColor: '#31473A', // Button color
            '&:hover': {
              backgroundColor: '#388e3c', // Button color on hover
            },
          }}
        >
          {edit ? 'Save' : 'Add'}
        </Button>
        </Box>
          
        </Box>

      </Box>
    </Dialog>

  );
}

