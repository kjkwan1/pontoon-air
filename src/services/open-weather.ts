import { OpenWeatherResponse } from "../interface/open-weather";

const base_url: string = 'http://api.openweathermap.org/data/2.5';
const key: string = '7ad51fd3e96ec6f08a57ccffb3de144f';

enum REQUEST_PARAMS {
    AIR_POLLUTION = 'air_pollution',
    LAT = 'lat',
    LON = 'lon',
    KEY = 'appid'
}

export async function getPollutionData(lat: number, lon: number): Promise<OpenWeatherResponse> {
    const requestUrl = `${base_url}/${REQUEST_PARAMS.AIR_POLLUTION}?${REQUEST_PARAMS.LAT}=${lat}&${REQUEST_PARAMS.LON}=${lon}&${REQUEST_PARAMS.KEY}=${key}`;
    const response = await fetch(requestUrl);
    return response.json();
}