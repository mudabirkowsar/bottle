import api from "./api";

export const getAllUsers = () => {
    const token = localStorage.getItem('token')
    const response = api.get('/admin/all-users',
        {
            headers: {
                Authorization: token
            }
        }
    );
    return response
}