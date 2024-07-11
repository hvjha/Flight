
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors({origin:['https://vercel.com/harsh-vardhan-jhas-projects/flight-mern/jEUMM8TazickrXDMTqGDCjfXJbaM']));
app.use(express.json());

app.post('/api/search', async (req, res) => {
    const { origin, destination, cabin } = req.body;

    // Validate request data
    if (!origin || !destination || !cabin) {
        return res.status(400).json({ error: 'Missing required fields: origin, destination, or cabin' });
    }

    // Set up headers for the API request
    const headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9,hi;q=0.8',
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    };

    const jsonData = {
        'origin': origin,
        'destination': destination,
        'partnerPrograms': [
            'Air Canada',
            'United Airlines',
            'KLM',
            'Qantas',
            'American Airlines',
            'Etihad Airways',
            'Alaska Airlines',
            'Qatar Airways',
            'LifeMiles',
        ],
        'stops': 2,
        'departureTimeFrom': '2024-07-09T00:00:00Z',
        'departureTimeTo': '2024-10-07T00:00:00Z',
        'limit': 302,
        'offset': 0,
        'cabinSelection': [cabin],
        'date': '2024-07-09T12:00:17.796Z',
    };

    try {
        const response = await axios.post('https://cardgpt.in/apitest', jsonData, { headers });
        res.json(response.data);
        console.log(response);
    } catch (error) {
        console.error('Error fetching data:', error.message);  // Log the error message
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
