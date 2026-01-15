import api from "./api"


export const placeOrder = async (orderData) => {
    console.log(orderData)
    const response = await api.post('/order', orderData);
    return response.data;
}

export const getOrders = async () => {
    const response = await api.get('/order');
    return response.data;
}