import axios from 'axios';
import authHeader from './auth-header';

const PRICE_LIST_API_BASE_URL = "http://localhost:8080/api/v1/priceLists";

class PriceListService{

    getPriceLists(){
        return axios.get(PRICE_LIST_API_BASE_URL, { headers: authHeader() });
    }

    createPriceList(priceList){
        return axios.post(PRICE_LIST_API_BASE_URL, priceList, { headers: authHeader() });
    }

    getPriceListById(id){
        return axios.get(PRICE_LIST_API_BASE_URL + "/" + id, { headers: authHeader() });
    }

    getPriceListByCityName(name){
        return axios.get(PRICE_LIST_API_BASE_URL + "/" + name, { headers: authHeader() });
    }

    updatePriceList(priceList, id){
        return axios.put(PRICE_LIST_API_BASE_URL + "/" + id, priceList, { headers: authHeader() });
    }

    deletePriceList(id){
        return axios.delete(PRICE_LIST_API_BASE_URL + "/" + id, { headers: authHeader() });
    }

}

export default new PriceListService()