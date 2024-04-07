import { AQICNData, AQICNResponse } from "../interface/aqicn";

const base_url: string = 'http://api.waqi.info';
const key: string = '98b19a40d1364ba5b5b75edbe6f17e5a3ae8bc41';

enum REQUEST_PARAMS {
    FEED = 'feed',
    TOKEN = 'token'
}

export async function getFeed(state: string): Promise<AQICNData> {
    const requestUrl = `${base_url}/${REQUEST_PARAMS.FEED}/${state}/?${REQUEST_PARAMS.TOKEN}=${key}`;
    const response = await fetch(requestUrl);
    return response.json().then((response: AQICNResponse) => response.data);
}