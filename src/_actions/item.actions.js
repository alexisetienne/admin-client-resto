import { itemConstants } from '../_constants';
import { itemService} from "../_services/item.service";
import { alertActions } from './';
import { history } from '../_helpers';

export const itemActions = {
    create,
    getAll,
    update,
    _delete,

};

function create(item) {
    return dispatch => {
        dispatch(request());

        itemService.create(item)
            .then(
                items => {
                    dispatch(success(items));
                    dispatch(alertActions.success('item créé avec succés'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: itemConstants.CREATE_REQUEST } }
    function success(items) { return { type: itemConstants.CREATE_SUCCESS, items } }
    function failure(error) { return { type: itemConstants.CREATE_FAILURE, error } }
}

function update(item) {
    return dispatch => {
        dispatch(request());

        itemService.update(item)
            .then(
                items => {
                    dispatch(success(items));
                    dispatch(alertActions.success('item mis à jour avec succés'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: itemConstants.UPDATE_REQUEST } }
    function success(items) { return { type: itemConstants.UPDATE_SUCCESS, items } }
    function failure(error) { return { type: itemConstants.UPDATE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        itemService.getAll()
            .then(
                items => dispatch(success(items)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: itemConstants.GETALL_REQUEST } }
    function success(items) { return { type: itemConstants.GETALL_SUCCESS, items } }
    function failure(error) { return { type: itemConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        itemService.delete(id)
            .then(
                item => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: itemConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: itemConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: itemConstants.DELETE_FAILURE, id, error } }
}
