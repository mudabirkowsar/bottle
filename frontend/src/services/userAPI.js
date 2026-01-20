import api from "./api"

export const createUser = async (userData) => {
    const response = await api.post('/user/create-user', userData);
    return response
}

export const loginUser = async (userData) => {
    const response = await api.post('/user/login-user', userData);
    return response;
}

export const verifyOTP = async (userData) => {
    console.log(userData.otp)
    const response = await api.post('/user/verify-email', userData);
    return response
}