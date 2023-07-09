import React, {useEffect, useRef} from "react";
import {IconButton, Grid, ListItem, ListItemText, Stack, Tooltip, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import {Receipt} from './../Receipt';
import ReactToPrint from 'react-to-print';
import {orderActions} from "../../_actions/order.actions";
import {useDispatch} from "react-redux";
import PrintIcon from '@mui/icons-material/Print';

const Card = ({data, items, deleteOrder}) => {
    const componentRef = useRef();
    const printRef = useRef();
    const dispatch = useDispatch();
    useEffect(() => {
        if (data.status == 'new') {
            dispatch(orderActions.updateStatus(data.id, {...data, status: 'in progress'}, printRef.current.handleClick()))
            dispatch(orderActions.getAll());
        }
    }, []);

    function calculateTotalForOrder(order) {
        let result = 0;
        order.orderItems.forEach((orderItem) => {
            const item = items.find((item) => item.id == orderItem.itemId);
            if (item) {
                const sum = orderItem.quantity * item.price;
                result += sum
            }
        })
        return result;
    }

    function renderDetailsOrder(order) {
        const result = order?.orderItems?.map((orderItem) => {
            const item = items.find((item) => item.id == orderItem.itemId);
            if (item) return <Typography variant='body1'>{`${orderItem.quantity}x ${item.title}.....${item.price}€`}</Typography>
        })
        return result;
    }

    function sendTicket(data) {
        const message = <Stack direction='column'>
            <Typography variant='h5'>
                {`Commande numéro ${data.id}`}
            </Typography>
            {renderDetailsOrder(data)}
        </Stack>
        return message;
    }

    return (
        <ListItem
            sx={{mt: 2, backgroundColor: '#ffffff', borderRadius: 5, boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.5)'}}
            divider
            secondaryAction={
                <IconButton onClick={() => deleteOrder(data.id)} edge="end" aria-label="delete">
                    <DeleteIcon color='error'/>
                </IconButton>
            }
        >
            <Tooltip title={<Stack
                direction='column'>{renderDetailsOrder(data)}{`TOTAL: ${calculateTotalForOrder(data)}€`}</Stack>}>
                <IconButton edge="end" aria-label="delete">
                    <InfoIcon color='info'/>
                </IconButton>
            </Tooltip>
            <ListItemText
                sx={{textAlign: 'center', m: 2}}
                primary={`commande numéro : ${data.id}`}
            />
            <> <ReactToPrint
                trigger={() => <React.Fragment/>}
                content={() => componentRef.current}
                ref={printRef}
            />
                <Grid sx={{visibility: 'hidden', maxHeight: '0px', maxWidth: '0px'}}>
                    <Receipt order={data} ticket={renderDetailsOrder(data)} ref={componentRef}/>
                </Grid>
            </>
            <IconButton onClick={() => printRef.current.handleClick()}><PrintIcon color='info'/></IconButton>
        </ListItem>
    );
};

export default Card;
