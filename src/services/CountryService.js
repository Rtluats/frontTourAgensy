import axios from 'axios';
import authHeader from './auth-header';

const COUNTRY_API_BASE_URL = "http://localhost:8080/api/v1/countries";

class CountryService{

    getCountry(){
        return axios.get(COUNTRY_API_BASE_URL, { headers: authHeader() });
    }

    createCountry(hotel){
        return axios.post(COUNTRY_API_BASE_URL, hotel, { headers: authHeader() });
    }

    getCountryById(id){
        return axios.get(COUNTRY_API_BASE_URL + "/" + id, { headers: authHeader() });
    }

    updateCountry(country, id){
        return axios.put(COUNTRY_API_BASE_URL + "/" + id, country, { headers: authHeader() });
    }

    deleteCountry(id){
        return axios.delete(COUNTRY_API_BASE_URL + "/" + id, { headers: authHeader() });
    }
}

export default new CountryService()