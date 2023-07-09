import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {userActions} from '../_actions';
import {
    Button,
    Stack,
    TextField,
} from '@mui/material';
import {Controller, useForm} from 'react-hook-form';

function LoginPage() {

    const dispatch = useDispatch();
    const location = useLocation();
    const {
        control,
        handleSubmit,
    } = useForm();

    function onSubmit(data) {
        // get return url from location state or default to home page
        const {from} = {from: {pathname: "/"}};
        dispatch(userActions.login(data, from));
    }

    return (
        <>
            <Stack
                mt={16}
                spacing={2}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{height: '100%'}}
            >
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Stack justifyContent="center" spacing={2} direction="column">
                        <Controller
                            control={control}
                            name='login'
                            rules={{required: true}}
                            render={({field}) => (
                                <TextField
                                    required
                                    id="outlined-basic"
                                    label="Identifiant"
                                    variant="outlined"
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <Controller
                            name='password'
                            rules={{required: true}}
                            control={control}
                            render={({field}) => (
                                <TextField
                                    required
                                    id="outlined-basic"
                                    label="Mot de passe"
                                    type='password'
                                    variant="outlined"
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <Button
                            size="large"
                            type="submit"
                            variant="contained"
                            color="success"
                        >
                            Se connecter
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </>
    );
}

export {LoginPage};
