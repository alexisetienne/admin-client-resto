import React from "react";
import {IconButton, ListItem, ListItemText, Stack, Tooltip} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import {orderActions} from "../../_actions/order.actions";
import {useDispatch} from "react-redux";


const Card = ({data, items, deleteOrder}) => {

    function calculateTotalForOrder(order) {
        let result = 0;
        order.orderItems.forEach((orderItem) => {
            const item = items.find((item) => item.id == orderItem.itemId);
            if(item) {
                const sum = orderItem.quantity * item.price;
                result += sum
            }
        })
        return result;
    }

    function renderDetailsOrder(order) {
        console.log('order: ', order, 'items: ', items);
        const result = order?.orderItems?.map((orderItem) => {
            const item = items.find((item) => item.id == orderItem.itemId);
           if(item) return <span>{`${item.title}.........${item.price}€`}</span>
        })
        return result;
    }

    return (
        <ListItem
            sx={{mt: 2,backgroundColor: '#ffffff', borderRadius: 5, boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.5)'}}
            divider
            secondaryAction={
                <IconButton onClick={() => deleteOrder(data.id)} edge="end" aria-label="delete">
                    <DeleteIcon color='error'/>
                </IconButton>
            }
        >
            <Tooltip title={<Stack direction='column' >{renderDetailsOrder(data)}{`TOTAL: ${calculateTotalForOrder(data)}€`}</Stack>}>
            <IconButton edge="end" aria-label="delete">
                <InfoIcon color='info'/>
            </IconButton>
            </Tooltip>
            <ListItemText
                sx={{textAlign: 'center', m:2}}
                primary={`commande numéro : ${data.id}`}
            />
        </ListItem>
    );
};

export default Card;
