import api from "./api"

export const submitQuery = async (queryData) => {
    const token = localStorage.getItem("token")
    alert(token)
    const response = await api.post("/query", queryData, {
        headers: {
            Authorization: token
        }
    });
    return response.data
}

export const getAllQuery = async () => {
    const response = await api.get("/query");
    return response.data;
}