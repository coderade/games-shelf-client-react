import axios from "axios";

export const ShelfApi = axios.create({
    baseURL: "http://localhost:4000/v1"
});
