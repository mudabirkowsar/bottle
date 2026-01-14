import api from "./api"

export const placeOrder = async (orderData) => {
    const response = await api.post('/', orderData);
    return response.data;
}

export const getOrders = async () => {
    const response = await api.get('/');
    return response.data;
}