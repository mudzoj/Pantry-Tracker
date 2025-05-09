import { TextField, Button, InputAdornment, Box, Dialog, DialogTitle, SvgIcon } from '@mui/material';
import { useEffect, useState } from 'react'
import EntryBox from './entryBox';


import AddIcon from '/app/components/icons/add.svg';
import { color } from 'framer-motion';

const SearchBar = ({ searchQuery, setSearchQuery, foodGroup, setFoodGroup,
    date, setDate, amount, setAmount, unit, setUnit,
    addItem }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setSearchQuery("")
    };

    const handleClose = (value) => {
        setOpen(false);
        setFoodGroup("")
        setDate("")
        setAmount("")
        setUnit("")

    };

    return (
        <Box
            sx={{
                // position: 'sticky',
                display: 'flex',
                flexDirection: 'row',
                // alignItems: 'center',
                justifyContent: "left",

                marginLeft: "5%"
            }}
        >
            <TextField

                variant="outlined"
                fullWidth
                inputProps={{ maxLength: 14 }}
                size="small"
                sx={{
                    backgroundColor: '#3F4F44', // Background color of the search field
                    maxWidth: "300px",
                    borderRadius: 2,
                    '& .MuiInputLabel-root': {
                        color: '#9A968C', // Color of Label
                        fontSize: "18px",
                        marginLeft: "8px",
                        transform: 'translateY(40%)',
                    },
                    '& .MuiInputBase-root': {
                        color: '#DCD7C9', // Text color within the search field
                        borderRadius: 2,
                        // height: { xs: '30px',  sm: '15px', md: '40px',  lg: '35px'},
                    },
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        color: '#DCD7C9',
                        '& fieldset': {
                            borderColor: '#1E2721', // default
                        },
                        '&:hover fieldset': {
                            borderColor: '#AFABA0', // hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#C0BCB2', // focused — override the blue
                        },
                    },
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Your Pantry"




            />

            <SvgIcon
                component={AddIcon}
                onClick={handleClickOpen}
                sx={{
                    "&:hover": {
                        color: "#617467", // Change to your desired hover color
                    },
                    color: "#DCD7C9",
                    cursor: "pointer",
                    fontSize: 32,
                    marginLeft: "8px",
                    marginTop: "5px"
                }}
            />

            <EntryBox
                searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                foodGroup={foodGroup} setFoodGroup={setFoodGroup}
                addItem={addItem}
                date={date} setDate={setDate}
                amount={amount} setAmount={setAmount}
                unit={unit} setUnit={setUnit}
                open={open}
                onClose={handleClose}
            ></EntryBox>


        </Box >
    );
};

export default SearchBar;
