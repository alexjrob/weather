import fetch from "node-fetch";
import { getGeoWeather, getLocationWeather, resolveLocationName } from "./weather";

const mockedFetch = jest.mocked(fetch);

jest.mock('node-fetch');

const { Response } = jest.requireActual('node-fetch');

describe('Weather API', () =>{ 
    afterEach(() => {
        jest.resetAllMocks()
    })
    describe('resolveLocationName', () => {
        it('Resolves a location name', async () => {
            const response = new Response(JSON.stringify([
                {
                    lat: 0.01,
                    lon: 0.2,
                }
            ]));
            mockedFetch.mockResolvedValueOnce(response);

            const result = await resolveLocationName('test-location');
            expect(mockedFetch).toHaveBeenCalledWith(
                `http://api.openweathermap.org/geo/1.0/direct?appid=test-weather-app-id&location=test-location&limit=1`
            );
            expect(result).toEqual({
                lat: 0.01,
                lon: 0.2
            });
        });

        it.skip('Throws an error if no results exist', async () => {
        });
    });

    describe('getGeoWeather', () => {
        it('Returns the weather for a lat/lon', async () => {
            const response = new Response(JSON.stringify({
                main: {
                    temp: 321,
                    pressure: 5234,
                    humidity: 5123,
                    temp_min: 8293,
                    temp_max: 12,
                }
            }));
            mockedFetch.mockResolvedValueOnce(response);

            const result = await getGeoWeather(1, 2);
            expect(mockedFetch).toHaveBeenCalledWith(
                `http://api.openweathermap.org/data/2.5/weather?appid=test-weather-app-id&lat=1&lon=2`
            );
            expect(result).toEqual({
                temp: 321,
                pressure: 5234,
                humidity: 5123,
                temp_min: 8293,
                temp_max: 12,
            })
        });
    });

    describe('getLocationWeather', () => {
        it('Returns teh weather for a location name', async () => {

            mockedFetch.mockResolvedValueOnce(
                new Response(JSON.stringify([
                    {
                        lat: 0.01,
                        lon: 0.2,
                    }
                ]))
            );
            mockedFetch.mockResolvedValueOnce(
                new Response(JSON.stringify({
                    main: {
                        temp: 111,
                        pressure: 222,
                        humidity: 333,
                        temp_min: 444,
                        temp_max: 555,
                    }
                }))
            );
            
            const result = await getLocationWeather('test location');

            expect(result).toEqual({
                temp: 111,
                pressure: 222,
                humidity: 333,
                temp_min: 444,
                temp_max: 555,
            });

        });
    });
})