import { orderConstants} from "../_constants/order.constants";
import { orderService} from "../_services/order.service";
import { alertActions } from './';
import { history } from '../_helpers';

export const orderActions = {
    create,
    getAll,
    updateStatus,
    _delete,

};

function create(order) {
    return dispatch => {
        dispatch(request(order));

        orderService.create(order)
            .then(
                order => {
                    dispatch(success());
                    dispatch(alertActions.success('order créé avec succés'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(order) { return { type: orderConstants.CREATE_REQUEST, order } }
    function success(order) { return { type: orderConstants.CREATE_SUCCESS, order } }
    function failure(error) { return { type: orderConstants.CREATE_FAILURE, error } }
}

function updateStatus(id, order) {
    return dispatch => {
        dispatch(request(order));

        orderService.updateStatus(id, order)
            .then(
                order => {
                    dispatch(success());
                    dispatch(alertActions.success('order créé avec succés'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(order) { return { type: orderConstants.CREATE_REQUEST, order } }
    function success(order) { return { type: orderConstants.CREATE_SUCCESS, order } }
    function failure(error) { return { type: orderConstants.CREATE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        orderService.getAll()
            .then(
                orders => dispatch(success(orders)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: orderConstants.GETALL_REQUEST } }
    function success(orders) { return { type: orderConstants.GETALL_SUCCESS, orders } }
    function failure(error) { return { type: orderConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        orderService.delete(id)
            .then(
                order => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: orderConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: orderConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: orderConstants.DELETE_FAILURE, id, error } }
}
