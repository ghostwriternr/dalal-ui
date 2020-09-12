import axios from 'axios';
export const API_URL = "https://1d279099f9ad.ngrok.io";

export const createChannel = async () => {
    return axios.post(API_URL + "/channels");
}