import fetch from 'node-fetch';
import { GeoResponse, WeatherResponse } from '../types';
import { WEATHER_APP_ID } from './config';

async function resolveLocationName(location: string) {
    const limit = 1;
    const params = {
        appid: WEATHER_APP_ID,
        location,
        limit: limit.toString(),
    }
    const queryString = new URLSearchParams(params).toString();
    const url = `http://api.openweathermap.org/geo/1.0/direct?${queryString}`;
    const request = await fetch(url);

    const result = await request.json() as GeoResponse;
    return result[0];
}

async function getWeather(lat: number, lon: number) {

    const params = {
        appid: WEATHER_APP_ID,
        lat: lat.toString() ,
        lon: lon.toString() ,
    };
    const queryString = new URLSearchParams(params).toString();
    const url = `http://api.openweathermap.org/data/2.5/weather?${queryString}`;
    const request = await fetch(url);

    const result = await request.json() as WeatherResponse;
    return result.main;
}

async function getLocationWeather(location: string) {
    const {lat, lon} = await resolveLocationName(location);
    return getWeather(lat, lon);
}

export {
    resolveLocationName,
    getWeather,
    getLocationWeather,
};

