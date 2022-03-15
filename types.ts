export type WeatherInfo = {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
}

export type WeatherResponse = {
    main: WeatherInfo;
}

export type GeoLocation = {
    lat: number;
    lon: number;
}

export type GeoResponse = GeoLocation[];
