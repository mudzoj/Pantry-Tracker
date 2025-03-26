import { Grid } from '@mui/material';
import PantryItem from './PantryItem';

const PantryList = ({ pantry, removeItem }) => (
    <Grid container columnSpacing={0} rowSpacing={2}>
        {pantry.map(({ name, count }) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
                <PantryItem name={name} count={count} removeItem={removeItem} />
            </Grid>
        ))}
    </Grid>
);

export default PantryList;
