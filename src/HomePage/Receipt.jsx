import React from 'react';

import {Divider, Stack, Typography} from "@mui/material";

export const Receipt = React.forwardRef((props, ref) => {
    console.log(props)
    return (
            <Stack sx={{minHeight: 50}} ref={ref} direction='column'>
                <Stack>
                    <Typography variant='h5'>
                        {`Commande numéro: ${props.order.id}`}
                    </Typography>
                </Stack>
                <Typography variant='body2'>
                    {`Retrait pour: ${props.order.withdrawalHour}`}
                </Typography>
                <Stack sx={{mt: 3, mb:5}}>
                    {props.ticket}
                </Stack>
                <Stack>
                    <Divider/>
                </Stack>
            </Stack>
    )
});

