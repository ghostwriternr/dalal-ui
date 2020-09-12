import axios, { AxiosResponse } from 'axios';
import { ChannelResponse } from '../components/configurationTab/configuratiionTab';
export const API_URL = "https://1d279099f9ad.ngrok.io";

export const createChannel = () => {
    return axios.post(API_URL + "/channels");
}

export const getChannel = (uuid: string): Promise<AxiosResponse<ChannelResponse>> => {
    return axios.get(`${API_URL}/channels/${uuid}`);
}

interface updateInput {
    uuid: string;
    code: string;
    target: string;
    language: string;
}

export const update = ({ uuid, code, target, language }: updateInput) => {
    var requestData = {
        language,
        function: code,
        target
    };
    const url = `${API_URL}/channels/${uuid}`;
    return axios.put(url, requestData);
}

export const getTemplates = async () => {
    return axios.get(`${API_URL}/templates`);
}