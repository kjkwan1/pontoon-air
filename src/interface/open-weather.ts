export interface OpenWeatherResponse {
    coord: number[];
    list: OpenWeatherListData[];
}

export interface OpenWeatherListData {
    dt: number;
    main: {
        aqi: number;
    };
    components: OpenWeatherComponents;
}

export interface OpenWeatherComponents {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number
}