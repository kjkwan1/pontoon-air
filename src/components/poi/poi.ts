import { AQICNData } from "../../interface/aqicn";
import { BaseComponent } from "../../interface/base-component";
import { getFeed } from "../../services/aqicn";
import { getColor } from "../../shared/color-picker";
import { ElementBuilder } from "../../shared/element-builder";
import './poi.scss';

const DEFAULT_SORT = (a: AQICNData, b: AQICNData) => {
    return a.city.name.localeCompare(b.city.name);
}

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
    private ulRef!: Element;
    private currentSort: (a: AQICNData, b: AQICNData) => number = DEFAULT_SORT;

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
            const search = new ElementBuilder('input')
                .attribute('placeholder', 'Search city...')
                .elementId('poi-search')
                .class('poi__search')
                .build();
            // const filterDropdown = new ElementBuilder('select')
            //     .class('poi__filter')
            //     .build();

            this.ulRef = ul;

            for (let entry of Object.entries(SORT_OPTIONS)) {
                const option = new ElementBuilder('option')
                    .class('poi__option')
                    .appendHTML(`${entry[1]}`)
                    .build();
                    
                option.setAttribute('value', entry[1]);
                sortDropdown.append(option);
            }
            const ref = this;
            sortDropdown.addEventListener('change', function(this: { value: string }) {
                switch(this.value) {
                    case SORT_OPTIONS.AQI_ASC:
                        ref.currentSort = (a: AQICNData, b: AQICNData) => {
                            return b.aqi < a.aqi ? 1 : -1;
                        }
                        break;
                    case SORT_OPTIONS.AQI_DESC:
                        ref.currentSort = (a: AQICNData, b: AQICNData) => {
                            return b.aqi > a.aqi ? 1 : -1;
                        }
                        break;
                    case SORT_OPTIONS.NAME_DESC:
                        ref.currentSort = (a: AQICNData, b: AQICNData) => {
                            return b.city.name.localeCompare(a.city.name);
                        }
                        break;
                    default:
                        break;
                }
                ref.buildList(true);
            });

            search.addEventListener('change', function(this: { value: any }) {
                ref.search(this.value);
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
                .then(() => this.buildList(true))
                .finally(() => {
                    const searchContaier = new ElementBuilder('div')
                        .class('poi__search-container')
                        .build();

                    searchContaier.append(search);
                    container.append(this.ulRef);
                    container.append(searchContaier);
                    this.resolve(null);
                })
        } catch(e) {
            console.error(e);
        }
    }

    private async search(input: string): Promise<void> {
        let feeds = [...this.feeds];
        try {
            const feed = await getFeed(input);
            feeds = [feed, ...feeds];
        } catch(e) {
            console.error(e);
            const search = document.getElementById('poi-search');
            search?.classList.add('warn')
            setTimeout(() => {
                search?.classList.remove('warn');
            }, 1500);
            return;
        }
        this.feeds = feeds;
        this.buildList();
    }

    private buildList(shouldSort = false): void {
        this.ulRef.innerHTML = '';
        this.ulRef.scrollTo({ top: 0 });
        let list = [...this.feeds];
        list = shouldSort ? list.sort(this.currentSort) : list;
        for (let result of list) {
            const li = new ElementBuilder('li')
                .class('poi__item appear')
                .classList(getColor(result.aqi))
                .appendHTML(`<h2 class="poi__item--city">${result.city.name}</h2>`)
                .appendHTML(`<h2 class="poi__item--aq">${result.aqi}</h2>`)
                .build();
            this.applyScrollFadeIn(li);
            this.ulRef.append(li);
        }
    }
}

enum SORT_OPTIONS {
    NAME_ASC = 'Name ascending',
    NAME_DESC = 'Name descending',
    AQI_ASC = 'AQI ascending',
    AQI_DESC = 'AQI descending',
}