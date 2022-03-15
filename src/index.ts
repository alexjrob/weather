import * as express from 'express';
import { SERVER_PORT } from './config';
import { getLocationWeather } from './weather';
const app = express();

// Serve weather location
app.get('/weather/:location', async (req, res) => {
    const { location } = req.params;
    const weather = await getLocationWeather(location);
    res.json(weather);
});

// Serve documentation
app.use(express.static('public'));

app.listen(SERVER_PORT, () => {
    console.log(`Listening on http://localhost:${SERVER_PORT}/`);
});
