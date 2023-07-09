import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {itemActions} from "../_actions/item.actions";
import {
    Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField,
} from '@mui/material';
import {Controller, useForm} from 'react-hook-form';

function ItemComponent({item, onDelete}) {

    const categories = [
        'Entrées',
        'Plats',
        'Desserts',
        'Pizza',
        'Vin',
        'Bieres',
        'Boissons',
    ];
    const dispatch = useDispatch();
    const location = useLocation();
    const {
        reset, control, handleSubmit, formState
    } = useForm({
        defaultValues: {
            title: item ? item.title : undefined,
            description: item ? item.description : undefined,
            category: item ? item.category : undefined,
            price: item ? item.price : undefined,
        }
    });
    function onSubmit(data) {
        // get return url from location state or default to home page
        if (!item) {
            dispatch(itemActions.create(data));
            reset({
                title: '',
                description: '',
                category: '',
                price: ''
            });
        } else {
            dispatch(itemActions.update({...data, id: item.id}))
        }
    }

    return (<>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Stack
                mt={2}
                spacing={2}
                direction="column"
            >
                <Stack spacing={2} direction="row">
                    <Controller
                        control={control}
                        name='title'
                        rules={{required: true}}
                        render={({field}) => (<TextField
                            sx={{width: '100%'}}
                            required
                            id="outlined-basic"
                            label="Titre"
                            variant="outlined"
                            value={field.value}
                            onChange={field.onChange}
                        />)}
                    />
                    <Controller
                        name='description'
                        rules={{required: true}}
                        control={control}
                        render={({field}) => (<TextField
                            required
                            sx={{width: '100%'}}
                            id="outlined-basic"
                            label="Description"
                            variant="outlined"
                            value={field.value}
                            onChange={field.onChange}
                        />)}
                    />
                </Stack>
                <Stack spacing={2} direction="row">
                    <Controller
                        control={control}
                        name='category'
                        rules={{required: true}}
                        render={({field}) => (<FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Categorie</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={field.value}
                                label="Categorie"
                                required
                                onChange={field.onChange}
                            >
                                {categories.map((categorie) => {
                                    return <MenuItem value={categorie}>{categorie}</MenuItem>
                                })}
                            </Select>
                        </FormControl>)}
                    />
                    <Controller
                        name='price'
                        rules={{required: true}}
                        control={control}
                        render={({field}) => (<TextField
                            required
                            id="outlined-basic"
                            label="Prix"
                            type="number"
                            variant="outlined"
                            value={field.value}
                            onChange={field.onChange}
                        />)}
                    />
                    <Button
                        size="large"
                        type="submit"
                        variant="contained"
                        color={!item ? "success" : "warning"}
                    >
                        {!item ? "AJOUTER" : "MODIFIER"}
                    </Button>
                    {item && <Button
                        size="large"
                        onClick={() => onDelete(item.id)}
                        variant="contained"
                        color="error"
                    >
                        SUPPRIMER
                    </Button>}
                </Stack>
            </Stack>
        </form>
    </>);
}

export {ItemComponent};
