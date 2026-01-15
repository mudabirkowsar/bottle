import api from "./api"

export const submitQuery = async (queryData) => {
    const response = await api.post("/query", queryData);
    return response.data
}

export const getAllQuery = async () => {
    const response = await api.get("/query");
    return response.data;
}