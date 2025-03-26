import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const DeleteButton = styled(Button)({
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: '50%',
    padding: 0,
    fontSize: 16,
    color: "white",
    backgroundColor: "#d50000",
    '&:hover': { backgroundColor: "#ef5350" }
});

const PantryItem = ({ name, count, removeItem }) => (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        backgroundColor: '#F1F7F5',
        borderRadius: 2,
        boxShadow: 1,
        position: 'relative',
        width: '80%',
        height: '100px'
    }}>
        <DeleteButton onClick={() => removeItem(name)}>X</DeleteButton>
        <Typography variant='h7'>{name.charAt(0).toUpperCase() + name.slice(1)}</Typography>
        <Typography variant='body1'>Amount: {count}</Typography>
    </Box>
);

export default PantryItem;
