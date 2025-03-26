import { TextField, Button, InputAdornment, Box } from '@mui/material';

const SearchBar = ({ searchQuery, setSearchQuery, addItem }) => {

    return (
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
                inputProps={{ maxLength: 14 }}
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
        </Box >
    );
};

export default SearchBar;
