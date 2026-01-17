import api from "./api";

const token = localStorage.getItem('token')
export const getAllUsers = () => {
    const response = api.get('/admin/all-users',
        {
            headers: {
                Authorization: token
            }
        }
    );
    return response
}

export const getAllQueries = () => {
    const response = api.get('/admin/all-queries', {
        headers: {
            Authorization: token
        }
    })
    return response
}

export const getALlOrders = () => {
    const response = api.get('/admin/all-orders', {
        headers: {
            Authorization: token
        }
    })
    return response
}


export const updateOrderStatus = (id, status) => {
    const response = api.put(`/admin/update-status/${id}`, { status }, {
        headers: {
            Authorization: token
        }
    })
    return response
}