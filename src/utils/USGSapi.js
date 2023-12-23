
import axios from 'axios';

// Define the API endpoint URL
const baseUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/';
const endpoints = Object.freeze({
    day: '/all_day.geojson',
    hour: '/all_hour.geojson',
    month: '/all_month.geojson',
    week: '/all_week.geojson',
});

// Make the API call using Axios
export default async function getData(length) {
    let endpoint;
    switch (length) {
        case 'day':
            endpoint = endpoints.day;
            break;
        case 'hour':
            endpoint = endpoints.hour;
            break;
        case 'month':
            endpoint = endpoints.month;
            break;
        case 'week':
            endpoint = endpoints.week;
            break;
        default:
            endpoint = endpoints.hour;
    }

    try {
        const response = await axios.get(baseUrl + endpoint);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}
