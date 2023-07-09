import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Grid, IconButton, Stack} from "@mui/material";
import DragAndDrop from "./dragAndDrop/DragAndDrop";
import {orderActions} from "../_actions/order.actions";
import {itemActions} from "../_actions/item.actions";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import RefreshIcon from '@mui/icons-material/Refresh';


import {useHistory} from "react-router-dom";
import {userActions} from "../_actions";

function HomePage() {
    const orders = useSelector(state => state.order.orders);
    const items = useSelector(state => state.items);
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const [updatedOrders, setUpdatedOrders] = useState(orders);
    const history = useHistory();
    const dispatch = useDispatch();

    const refreshRef = useRef();
    refreshRef.current = useCallback(() => {
        //some code with various states update
        // dispatch(orderActions.getAll());
        dispatch(orderActions.getAll());
    }, [items]);
    // If you want to clear the interval when the component unmounts:
    const [intervalId, setIntervalId] = useState();
    useEffect(()=>{
        refreshRef.current()
        setIntervalId(
            setInterval(() => refreshRef.current(), 60 * 1000)
        );
        return () => {
            clearInterval(intervalId);
        }
    }, []);

    useEffect(() => {
        dispatch(itemActions.getAll());
        dispatch(orderActions.getAll());

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
                <Grid sx={{display: 'flex', justifyContent: 'center'}}>
                <IconButton onClick={() =>  dispatch(orderActions.getAll())} size='large' color='success'><RefreshIcon/></IconButton>
                </Grid>
                <DragAndDrop orders={orders} itemsFromDb={items.items}/>
            </Stack>
        </>
    )
}


export {HomePage};
