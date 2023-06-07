import React from "react";
import {ListItem, List, IconButton, Typography, Grid, Box, ListItemText, styled} from "@mui/material";
import {
    Droppable,
} from "react-beautiful-dnd";
import DeleteIcon from '@mui/icons-material/Delete';


const ListDragAndDrop = ({ children, name, title }) => {

    const Demo = styled('div')(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
    }));
    function generate(element) {
        return [0, 1, 2].map((value) =>
            React.cloneElement(element, {
                key: value,
            }),
        );

    }
    return (
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
            <Grid container alignItems="center" justifyContent="center" spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ mt: 4, mb: 2 }} align="center" variant="h6" component="div">
                        {title}
                    </Typography>
                    <Demo>
                        <List>
                            <Droppable droppableId={name}>
                                {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                >
                                    {children}
                                </div>
                            )}
                            </Droppable>
                        </List>
                    </Demo>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ListDragAndDrop;
