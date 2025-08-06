import { TextField, Box, SvgIcon } from '@mui/material';
import EntryBox from './entryBox';


import AddIcon from '/app/components/icons/add.svg';


const SearchBar = ({ searchQuery, setSearchQuery, foodGroup, setFoodGroup,
    date, setDate, amount, setAmount, unit, setUnit, open, setOpen, edit, setEdit,
    day, setDay, month, setMonth, year, setYear,
    addItem,}) => {
   

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
                display: 'flex',
                flexDirection: 'row',
                justifyContent: "left",
                width: {xs:"95%", sm:"95%", md:"80%", lg:"55%", xl:"65%"},
                marginLeft: "1%"
            }}
        >
            <TextField

                variant="outlined"
                fullWidth
            
                inputProps={{ maxLength: 14 }}
                size="small"
                sx={{
                    backgroundColor: "#202922", 
                    width: "600px",
                    borderRadius: 2,
                    '& .MuiInputLabel-root': {
                        color: '#9A968C',
                        fontSize: "18px",
                        marginLeft: "8px",
                        transform: 'translateY(40%)',
                    },
                    '& .MuiInputBase-root': {
                        color: '#DCD7C9', 
                        borderRadius: 2,
                       
                    },
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        color: '#DCD7C9',
                        '& fieldset': {
                            borderColor: '#1E2721', // default
                        },
                        '&:hover fieldset': {
                            borderColor: '#AFABA0', 
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#C0BCB2', 
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
                        color: "#617467", 
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
                edit={edit} setEdit={setEdit}
                day={day} setDay={setDay}
                month={month} setMonth={setMonth}
                year={year} setYear={setYear}
            ></EntryBox>


        </Box >
    );
};

export default SearchBar;
