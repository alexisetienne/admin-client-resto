import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import {items} from "./items.reducer";
import { order } from "./order.reducer"

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    items,
    alert,
    order,
});

export default rootReducer;
