import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Grid, IconButton, Stack} from "@mui/material";
import DragAndDrop from "./dragAndDrop/DragAndDrop";
import {orderActions} from "../_actions/order.actions";
import {itemActions} from "../_actions/item.actions";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import {useHistory} from "react-router-dom";
import {userActions} from "../_actions";

function HomePage() {
    const orders = useSelector(state => state.order.orders);
    const items = useSelector(state => state.items);
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(orderActions.getAll());
    }, [])

    useEffect(() => {
        dispatch(itemActions.getAll());
    }, [])

    if (!orders) return null;
    if (items.loading == true) return null;

    function logout() {
        dispatch(userActions.logout());
        history.push('/login');
    }


    return (
        <>
            <Stack>
                <Grid sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton onClick={() => logout()} size='large' color='info'><LogoutIcon/></IconButton>
                    <IconButton onClick={() => history.push('/items')} size='large' color='info'><SettingsIcon/></IconButton>
                </Grid>
                <DragAndDrop orders={orders} itemsFromDb={items.items}/>
            </Stack>
        </>
    )
}


export {HomePage};
