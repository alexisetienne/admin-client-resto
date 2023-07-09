import React from "react";
import Card from "./Card";
import ListDragAndDrop from "./List";
import {
    DragDropContext,
    Draggable,
} from "react-beautiful-dnd";
import { useState } from "react";
import {useDispatch} from "react-redux";
import {orderActions} from "../../_actions/order.actions";

const DragAndDrop = ({orders, itemsFromDb}) => {

    const dispatch = useDispatch();
    const itemsNormal = {
        available: [],

        assigned: [],
    };

    orders.forEach((order) => {
        if(order.status === 'in progress' || order.status == 'new') itemsNormal.available.push(order);
        else {
            itemsNormal.assigned.push(order);
        }
    })

    const [items, setItems] = useState(itemsNormal);

    const deleteOrder = (id) => {
        dispatch(orderActions._delete(id));
        const itemsAvailable = items.available.filter((item) => item.id !== id )
        const itemsAssigned = items.assigned.filter((item) => item.id !== id )
        setItems({...items, available: itemsAvailable, assigned: itemsAssigned})
    }

    const removeFromList = (list, index) => {
        const result = Array.from(list);
        const [removed] = result.splice(index, 1);
        return [removed, result];
    };

    const addToList = (list, index, element) => {
        const result = Array.from(list);
        result.splice(index, 0, element);
        return result;
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        if(result.destination.droppableId == 'assigned') {
            const updateOrder = orders.find((order) => order.id == parseInt(result.draggableId))
            dispatch(orderActions.updateStatus(result.draggableId, {...updateOrder, status: 'ready'}))
        }
        else {
            const updateOrder = orders.find((order) => order.id == parseInt(result.draggableId))
            dispatch(orderActions.updateStatus(result.draggableId, {...updateOrder, status: 'in progress'}))
        }
        const listCopy = { ...items };
        const sourceList = listCopy[result.source.droppableId];
        const [removedElement, newSourceList] = removeFromList(
            sourceList,
            result.source.index
        );
        listCopy[result.source.droppableId] = newSourceList;

        const destinationList = listCopy[result.destination.droppableId];
        listCopy[result.destination.droppableId] = addToList(
            destinationList,
            result.destination.index,
            removedElement
        );
        setItems(listCopy);
    };

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <div style={{display: 'flex', padding: '12px', justifyContent: 'center'}}>
                    <ListDragAndDrop title="Commandes en preparations" onDragEnd={onDragEnd} name="available">
                        {items.available.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id + ""} index={index}>
                                {(
                                    provided,
                                    snapshot
                                ) => (
                                    <div>
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <Card deleteOrder={deleteOrder} data={item} items={itemsFromDb}/>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </ListDragAndDrop>
                    <ListDragAndDrop title="Commandes prêtes" onDragEnd={onDragEnd} name="assigned">
                        {items.assigned.map((item, index) => (
                            <Draggable draggableId={item.id + ""} index={index} key={item.id}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <Card key={item.id} deleteOrder={deleteOrder} data={item} items={itemsFromDb} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </ListDragAndDrop>
                </div>
            </DragDropContext>
        </>
    );
};

export default DragAndDrop;
