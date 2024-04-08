import { AQICNData, LegendData, PM25Data } from "../../../interface/aqicn";
import { BaseComponent } from "../../../interface/base-component";
import { getFeed } from "../../../services/aqicn";
import { getTextColor } from "../../../shared/color-picker";
import { ElementBuilder } from "../../../shared/element-builder";

import './home-current-aqi.scss';

const legendData: { [key: string]: LegendData } = {
    GOOD: {
        msg: '(0-50) Good',
        status: 'good',
    },
    MODERATE: {
        msg: '(51-100) Moderate',
        status: 'moderate',
    },
    UNHEALTHY_AT_RISK: {
        msg: '(101-150) Worse',
        status: 'unhealthy-at-risk',
    },
    UNHEALTHY: {
        msg: '(151-200) Unhealthy',
        status: 'unhealthy',
    },
    VERY_UNHEALTHY: {
        msg: '(201-300) Bad',
        status: 'very-unhealthy',
    },
    HAZARDOUS: {
        msg: '(300+) Hazardous',
        status: 'hazardous',
    },
}

export class HomeCurrentAQI extends BaseComponent {
    private initialData = Promise.resolve();
    private lat!: number;
    private lon!: number;
    private forecast!: PM25Data[];
    private previousData = {
        cityName: '',
        airQuality: 0,
    }

    public render(): void {
        try {
            const container = this.getContainer();
            this.buildContainer(container);
            const aqiCurrent = document.getElementById(AQI_IDS.MAIN_AIR_QUALITY);
            const aqiIdx = document.getElementById(AQI_IDS.MAIN_IDX);
            const aqiCity = document.getElementById(AQI_IDS.MAIN_CITY);
            const aqiState = document.getElementById(AQI_IDS.MAIN_STATE);

            this.buildPollutionMeter(container);
            const airQuality = document.getElementById(AQI_IDS.P_AIR_QUALITY);
            const index = document.getElementById(AQI_IDS.P_IDX);
            const lat = document.getElementById(AQI_IDS.P_LAT);
            const lon = document.getElementById(AQI_IDS.P_LON);

            if (!aqiCurrent|| !aqiIdx || !aqiCity || !aqiState || !airQuality || !index || !lat || !lon) {
                return;
            }
            const updateAQI = () => {
                return getFeed('charlotte').then((data: AQICNData) => {
                    if (data.city.name === this.previousData.cityName && data.aqi === this.previousData.airQuality) {
                        return;
                    }
                    this.lat = data.city.geo[0];
                    this.lon = data.city.geo[1];
                    const cityIcon = new ElementBuilder('i')
                        .class('aqi__userdata--icon text-unhealthy-at-risk fa-solid fa-city')
                        .build();
                    container.classList.add(getTextColor(data.aqi))
                    aqiCurrent.innerText = data.aqi.toString();
                    aqiCity.append(cityIcon);
                    aqiCity.innerHTML += data.city.name.startsWith('Friendship')
                        ? 'Charlotte'
                        : data.city.name;
                    airQuality.innerText = data.aqi.toString();
                    index.innerText = data.idx.toString();
                    lat.innerText = this.lat.toString();
                    lon.innerText = this.lon.toString();
                    this.previousData.airQuality = data.aqi;
                    this.previousData.cityName = data.city.name;
                    this.forecast = data.forecast.daily.pm25;
                });
            };
            this.initialData = updateAQI().then(() => this.resolve(null));
            this.initialData.then(() => setInterval(updateAQI, 1000));
        } catch(error) {
            console.error(error);
        }
    }

    public getLocationData(): [number, number] {
        return [this.lat, this.lon];
    }

    public getForecastData(): PM25Data[] {
        return this.forecast;
    }

    private buildContainer(container: Element): void {
        const element = new ElementBuilder('div')
            .class('aqi appear-down')
            .appendHTML(`
                <div class="aqi__userdata">
                    <h2 class="aqi__userdata--city" id="${AQI_IDS.MAIN_CITY}"></h2>
                    <h3 class="aqi__userdata--state" id="${AQI_IDS.MAIN_STATE}"></h3>
                </div>
            `)
            .appendHTML(`
                <div class="aqi__feed">
                    <div class="aqi__aq">
                        <h1 class="aqi__aq--title">Air Quality</h1>
                        <h2 class="aqi__aq--current" id="${AQI_IDS.MAIN_AIR_QUALITY}"></h2>
                        <p class="aqi__aq--idx" id="${AQI_IDS.MAIN_IDX}"></p>
                        <i class="aqi__aq--icon fa-solid fa-wind"></i>
                    </div>
                </div>
            `)
            .build();

        const legend = new ElementBuilder('div')
            .class('aqi__legend')
            .build();

        for (let key of Object.keys(legendData)) {
            const data = legendData[key];
            const legendItem = new ElementBuilder('div')
                .class('aqi__legend--item')
                .appendHTML(`
                    <span class="aqi__legend--msg">${data.msg}</span>
                    <span class="aqi__legend--bar ${data.status}"></span>
                `)
                .build();
            legend.append(legendItem)
        }
        this.applyScrollFadeIn(legend);
        this.applyScrollFadeIn(element);
        container.append(element);
        container.append(legend);
    }

    private buildPollutionMeter(container: Element) {
        const configs = [
            {
                title: 'Air quality',
                id: AQI_IDS.P_AIR_QUALITY,
            },
            {
                title: 'Index',
                id: AQI_IDS.P_IDX,
            },
            {
                title: 'Lat',
                id: AQI_IDS.P_LAT,
            },
            {
                title: 'Lon',
                id: AQI_IDS.P_LON,
            },
        ];

        const element = new ElementBuilder('div')
            .class('aqi__pollution appear-down')
            .elementId('pollution')
            .build();

        for (let config of configs) {
            const info = new ElementBuilder('div')
                .class('aqi__pollution--info')
                .appendHTML(`
                    <h2>${config.title}</h2>
                    <h2 class="aqi__pollution--value" id="${config.id}"></h2>
                `)
                .build();
            this.applyScrollFadeIn(element);
            element.append(info);
        }

        container.append(element);
    }
}

enum AQI_IDS {
    MAIN_AIR_QUALITY = 'aq',
    MAIN_IDX = 'idx',
    MAIN_CITY = 'city',
    MAIN_STATE = 'state',
    P_AIR_QUALITY = 'p-aq',
    P_IDX = 'p-idx',
    P_LAT = 'p-lat',
    P_LON = 'p-long',
}