import axios from 'axios';
import authHeader from './auth-header';

const CITY_API_BASE_URL = "http://localhost:8080/api/v1/cities";

class CityService{

    getCities(){
        return axios.get(CITY_API_BASE_URL, { headers: authHeader() });
    }

    createCities(hotel){
        return axios.post(CITY_API_BASE_URL, hotel, { headers: authHeader() });
    }

    getCityById(id){
        return axios.get(CITY_API_BASE_URL + "/" + id, { headers: authHeader() });
    }

    updateCity(hotel, id){
        return axios.put(CITY_API_BASE_URL + "/" + id, hotel, { headers: authHeader() });
    }

    deleteCity(id){
        return axios.delete(CITY_API_BASE_URL + "/" + id, { headers: authHeader() });
    }
}

export default new CityService()