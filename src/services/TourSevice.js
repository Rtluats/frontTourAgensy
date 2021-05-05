import axios from 'axios';
import authHeader from './auth-header';

const TOUR_API_BASE_URL = "http://localhost:8080/api/v1/tours";

class TourService{

    getTours(){
        return axios.get(TOUR_API_BASE_URL, { headers: authHeader() });
    }

    createTour(tour){
        return axios.post(TOUR_API_BASE_URL, tour, { headers: authHeader() });
    }

    buyATour(id){
        return axios.post(TOUR_API_BASE_URL + `/byuATour/${id}`, { headers: authHeader() });
    }

    getTourById(id){
        return axios.get(TOUR_API_BASE_URL + "/" + id, { headers: authHeader() });
    }

    getToursByTitle(title){
        return axios.get(TOUR_API_BASE_URL + "/" + title, { headers: authHeader() });
    }

    updateTour(tour, id){
        return axios.put(TOUR_API_BASE_URL + "/" + id, tour, { headers: authHeader() });
    }

    deleteTour(id){
        return axios.delete(TOUR_API_BASE_URL + "/" + id, { headers: authHeader() });
    }

}

export default new TourService()