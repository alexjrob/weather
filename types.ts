export type WeatherInfo = {
    main: {
        temp: number;
        pressure: number;
        humidity: number;
        temp_min: number;
        temp_max: number;
    }
    clouds: number;
    weather: {
        main: string;
        description: string;
    }[];
}

export type WeatherResponse = {
    main: {
        temp: number;
        pressure: number;
        humidity: number;
        temp_min: number;
        temp_max: number;
    }
    clouds: {
        all: number;
    }
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
}

export type GeoLocation = {
    lat: number;
    lon: number;
}

export type GeoResponse = GeoLocation[];
