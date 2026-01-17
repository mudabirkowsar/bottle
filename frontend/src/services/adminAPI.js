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