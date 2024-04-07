export interface AQICNResponse {
    status: string;
    data: AQICNData;
}

export interface AQICNData {
    aqi: number;
    attributions: Attribution[];
    city: CityData;
    debug: { sync: string };
    dominentpol: string;
    forecast: {
        daily: {
            o3: any[];
            pm10: any[];
            pm25: PM25Data[];
        }
    }
    // iaqi
    idx: number;
    time: TimeData;
}

export interface PM25Data {
    avg: number;
    day: string;
    max: number;
    min: number;
}

export interface Attribution {
    logo: string;
    name: string;
    url: string;
}

export interface CityData {
    geo: number[];
    location: string;
    name: string;
    url: string;
}

export interface TimeData {
    iso: string;
    s: string;
    tz: string;
}

export interface LegendData {
    msg: string;
    status: string;
}