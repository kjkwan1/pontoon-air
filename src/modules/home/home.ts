import { Header } from "../../components/header/header";
import { HeaderMain } from "../../components/shared/header-main";
import { HomeCurrentAQI } from "./components/home-current-aqi";
import './style.scss';
import './home.scss';
import '../../index';
import { Poi } from "../../components/poi/poi";
import { ElementBuilder } from "../../shared/element-builder";
import { Contact } from "../../components/footer/contact";
import { ExtraData } from "./components/extra-data";
import { Subheading } from "../../components/shared/subheading";
import { Forecast } from "./components/forecast";

document.addEventListener('DOMContentLoaded', async () => {
    const header = new Header('body');
    const homeCurrentAQI = new HomeCurrentAQI('home');
    const forecastSubheading = new Subheading('home', 'Forecast', 'fa-solid fa-cloud');
    const extraHeader = new Subheading('home', 'Atmospheric data', 'fa-solid fa-book');
    const poiHeading = new HeaderMain('home', 'Trending Cities', 'Places you may find interesting', 'fa-solid fa-globe');
    const poi = new Poi('home');
    const contactHeading = new HeaderMain('contact', 'Contact us', 'Reach out if you have any questions', 'fa-solid fa-phone');
    const contact = new Contact('contact');

    header.render();
    homeCurrentAQI.render();
    await homeCurrentAQI.onRendered;
    forecastSubheading.render();

    const forecastData = homeCurrentAQI.getForecastData();
    const forecast = new Forecast('home', forecastData);
    forecast.render();
    extraHeader.render();

    const [lat, lon] = homeCurrentAQI.getLocationData();
    const extraData = new ExtraData('home', lat, lon);

    extraData.render();
    await extraData.onRendered;
    poiHeading.render();
    poi.render();
    await poi.onRendered;

    const contactSection = new ElementBuilder('section')
        .class('contact')
        .elementId('contact')
        .build();
    const bodyRef = document.getElementById('body');
    bodyRef?.append(contactSection);
    contactHeading.render();
    contact.render();
});

var previousPos = window.scrollY;

window.onscroll = () => {
    const currentScrollPos = window.scrollY;
    const header = document.getElementById('header');
    if (!header) {
        return;
    }

    if (currentScrollPos > previousPos && currentScrollPos > 670) {
        header.classList.remove('fixed');
        header.classList.add('hidden');
    } else {
        header.classList.add('fixed');
        header.classList.remove('hidden');
    }
    previousPos = currentScrollPos;
}