import api from "./api"


export const placeOrder = async (orderData) => {
    const token = localStorage.getItem("token")
    const response = await api.post('/order', orderData,
        {
            headers:{
                Authorization: token
            }
        }
    );
    return response.data;
}

export const getOrders = async () => {
    const response = await api.get('/order');
    return response.data;
}