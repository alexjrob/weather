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
    console.log('Request URL:', url)
    const request = await fetch(url);

    const result = await request.json() as GeoResponse;
    console.log('Response body:', JSON.stringify(result, null, 4));
    return result[0];
}

async function getGeoWeather(lat: number, lon: number) {

    const params = {
        appid: WEATHER_APP_ID,
        lat: lat.toString() ,
        lon: lon.toString() ,
    };
    const queryString = new URLSearchParams(params).toString();
    const url = `http://api.openweathermap.org/data/2.5/weather?${queryString}`;
    console.log('Request URL:', url)
    const request = await fetch(url);

    const result = await request.json() as WeatherResponse;
    console.log('Response body:', JSON.stringify(result, null, 4));
    return result.main;
}

async function getLocationWeather(location: string) {
    const {lat, lon} = await resolveLocationName(location);
    return getGeoWeather(lat, lon);
}

export {
    resolveLocationName,
    getGeoWeather,
    getLocationWeather,
};

