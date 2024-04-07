import { AQICNData } from "../../interface/aqicn";
import { BaseComponent } from "../../interface/base-component";
import { getFeed } from "../../services/aqicn";
import { getColor } from "../../shared/color-picker";
import { ElementBuilder } from "../../shared/element-builder";
import './poi.scss';

export class Poi extends BaseComponent {
    private poi: Record<string, string> = {
        NEW_YORK: 'nyc',
        PARIS: 'paris',
        BEIJING: 'beijing',
        LONDON: 'london',
        LA: 'los-angeles',
        TOKYO: 'tokyo',
        SHANGHAI: 'shanghai',
    }

    private feeds: AQICNData[] = [];

    public render(): void {
        try {
            const container = this.getContainer();
            const ul = new ElementBuilder('ul')
                .class('poi')
                .elementId('poi')
                .build();
            const buttons = new ElementBuilder('div')
                .class('poi__buttons')
                .build();
            const sortDropdown = new ElementBuilder('select')
                .class('poi__buttons--sort')
                .build();
            // const filterDropdown = new ElementBuilder('select')
            //     .class('poi__filter')
            //     .build();

            for (let entry of Object.entries(SORT_OPTIONS)) {
                const option = new ElementBuilder('option')
                    .class('poi__option')
                    .appendHTML(`${entry[1]}`)
                    .build();
                    
                option.setAttribute('value', entry[1]);
                sortDropdown.append(option);
            }

            let sort = (a: AQICNData, b: AQICNData) => {
                return a.city.name.localeCompare(b.city.name);
            }
            const ref = this;
            sortDropdown.addEventListener('change', function(this: { value: string }) {
                switch(this.value) {
                    case SORT_OPTIONS.AQI_ASC:
                        sort = (a: AQICNData, b: AQICNData) => {
                            return a.aqi > b.aqi ? 1 : -1;
                        }
                        break;
                    case SORT_OPTIONS.AQI_DESC:
                        sort = (a: AQICNData, b: AQICNData) => {
                            return b.aqi > a.aqi ? 1 : -1;
                        }
                        break;
                    case SORT_OPTIONS.NAME_DESC:
                        sort = (a: AQICNData, b: AQICNData) => {
                            return b.city.name.localeCompare(a.city.name);
                        }
                        break;
                    default:
                        break;
                }
                ref.buildList(ul, sort);
            });

            buttons.append(sortDropdown);
            // buttons.append(filterDropdown);
            this.applyScrollFadeIn(buttons);
            container.append(buttons);
            
            const promises = [];
            for (let entry of Object.values(this.poi)) {
                promises.push(getFeed(entry));
            }

            Promise.all(promises)   
                .then((results) => {
                    this.feeds = results;
                })
                .then(() => this.buildList(ul, sort))
                .finally(() => {
                    container.append(ul);
                    this.resolve(null);
                })
        } catch(e) {
            console.error(e);
        }
    }

    private buildList(ul: Element, sort: (a: AQICNData, b: AQICNData) => number): void {
        ul.innerHTML = '';
        console.log(this.feeds);
        let list = [...this.feeds];
        list = list.sort(sort);
        console.log(list);
        for (let result of list) {
            const li = new ElementBuilder('li')
                .class('poi__item appear')
                .classList(getColor(result.aqi))
                .appendHTML(`
                    <h2 className="poi__item--city">${result.city.name}</h2>
                `)
                .appendHTML(`
                    <h2 classNAme="poi__item--aq">${result.aqi}</h2>
                `)
                .build();
            this.applyScrollFadeIn(li);
            ul.append(li);
        }
    }
}

enum SORT_OPTIONS {
    NAME_ASC = 'Name ascending',
    NAME_DESC = 'Name descending',
    AQI_ASC = 'AQI ascending',
    AQI_DESC = 'AQI descending',
}