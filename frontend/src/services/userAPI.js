import api from "./api"

const token = localStorage.getItem("token")

export const createUser = async (userData) => {
    const response = await api.post('/user/create-user', userData);
    return response
}

export const loginUser = async (userData) => {
    const response = await api.post('/user/login-user', userData);
    return response;
}

export const verifyOTP = async (userData) => {
    const response = await api.post('/user/verify-email', userData);
    return response
}

export const getUserOrders = async () => {
    const response = await api.get('/user/get-all-orders', {
        headers: {
            Authorization:token
        }
    })
    return response
}