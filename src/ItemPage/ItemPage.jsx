import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';

import {Divider, MenuItem, Select, Stack, Typography, CircularProgress, Box, IconButton, Button} from "@mui/material";
import {itemActions} from "../_actions/item.actions";
import {ItemComponent} from "./ItemComponent";
import {useHistory} from "react-router-dom";

function ItemPage() {
    const [category, setCategory] = useState('all');
    const [display, setDisplay] = useState(false);
    const history = useHistory();
    const items = useSelector(state => state.items.items);
    const dispatch = useDispatch();
    const [filteredItems, setFilteredItems] = useState(items);
    const categories = [
        'Entrées',
        'Plats',
        'Desserts',
        'Pizza',
        'Vin',
        'Bieres',
        'Boissons',
    ];
    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    useEffect(() => {
        if (category !== 'all') setFilteredItems(items.filter((item) => item.category == category));
        else {
            setFilteredItems(items);
        }
    }, [category, items])

    useEffect(() => {
        dispatch(itemActions.getAll());
    }, [])

    useEffect(() => {
        let timer1 = setTimeout(() => setDisplay(false), 500);
        return () => {
            clearTimeout(timer1);
        };
    }, [filteredItems])

    function onDelete(id) {
        dispatch(itemActions._delete(id));
        setDisplay(true);
    }

    return (
        <>
            <Button onClick={() => history.push('/')} sx={{m: 5}} variant="outlined">Retourner aux commandes</Button>
            <Stack direction='column'>
                <Typography variant='h6'>Ajouter une valeur</Typography>
                <ItemComponent item={null}/>
                <Divider sx={{mt: 2}} variant="middle"/>
                <Stack direction="row" spacing={2} sx={{mt: 10}}>
                    <Typography variant='h6'>List des valeurs</Typography>
                    <Select
                        sx={{width: 150}}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Categorie"
                        required
                        onChange={handleChange}
                    >
                        <MenuItem value='all'>All</MenuItem>
                        {categories.map((categorie) => {
                            return <MenuItem value={categorie}>{categorie}</MenuItem>
                        })}
                    </Select>
                </Stack>
                {display ?  <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box> : <Stack direction="column">
                    {!isEmpty(filteredItems) && !isEmpty(items) && !items.loading && filteredItems.map((item) => {
                        return <ItemComponent onDelete={onDelete} item={item}/>
                    })}
                </Stack>}
            </Stack>
        </>
    )
}


export {ItemPage};
