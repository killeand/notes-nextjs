import axios from "axios";

export const axiosClient = globalThis.axios || axios.create({
    baseURL: process.env.NEXTAUTH_URL
});

globalThis.axios = axiosClient;