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

    public render(): void {
        try {
            const container = this.getContainer();
            const ul = new ElementBuilder('ul')
                .class('poi')
                .elementId('poi')
                .build();
            
            const promises = [];
            for (let entry of Object.values(this.poi)) {
                promises.push(getFeed(entry));
            }

            Promise.all(promises)   
                .then((results) => {
                    for (let result of results) {
                        const li = new ElementBuilder('li')
                            .class('poi__item appear')
                            .classList(getColor(result.aqi))
                            .appendHTML(`
                                <h2 className="poi__item--city"
                                >${result.city.name}</h2>
                            `)
                            .appendHTML(`
                                <h2 classNAme="poi__item--aq">${result.aqi}</h2>
                            `)
                            .build();
                        this.applyScrollFadeIn(li);
                        ul.append(li);
                    }
                })
                .finally(() => {
                    container.append(ul);
                    this.resolve(null);
                })
        } catch(e) {
            console.error(e);
        }
    }
}