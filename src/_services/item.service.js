import config from 'config';
import { authHeader } from '../_helpers';

export const itemService = {
    create,
    getAll,
    update,
    delete: _delete
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/items/all`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/items/${id}`, requestOptions).then(handleResponse);
}

function create(item) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({title: item.title, description: item.description, category: item.category, price: item.price})
    };

    return fetch(`${config.apiUrl}/api/items/create`, requestOptions).then(handleResponse).then(item => {
        return item;
    });
}

function update(item) {
    const requestOptions = {
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: item.title,
            description: item.description,
            category: item.category,
            price: item.price
        })
    };

    return fetch(`${config.apiUrl}/api/items/update/${item.id}`, requestOptions).then(handleResponse).then(item => {
        return item;
    });
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/items/delete/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
