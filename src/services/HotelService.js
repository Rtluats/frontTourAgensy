import axios from 'axios';
import authHeader from './auth-header';

const HOTEL_API_BASE_URL = "http://localhost:8080/api/v1/hotels";

class HotelService{

    getHotels(){
        return axios.get(HOTEL_API_BASE_URL, { headers: authHeader() });
    }

    createHotels(hotel){
        return axios.post(HOTEL_API_BASE_URL, hotel, { headers: authHeader() });
    }

    getHotelById(id){
        return axios.get(HOTEL_API_BASE_URL + "/" + id, { headers: authHeader() });
    }

    getHotelByCity(name){
        return axios.get(HOTEL_API_BASE_URL + "/" + name, { headers: authHeader() });
    }

    updateHotel(hotel, id){
        return axios.put(HOTEL_API_BASE_URL + "/" + id, hotel, { headers: authHeader() });
    }

    deleteHotel(id){
        return axios.delete(HOTEL_API_BASE_URL + "/" + id, { headers: authHeader() });
    }
}

export default new HotelService()