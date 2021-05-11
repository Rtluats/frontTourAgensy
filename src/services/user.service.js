import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/v1/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getManagerBoard() {
    return axios.get(API_URL + 'man', { headers: authHeader() });
  }

  getUserInfo(username){
    return axios.get(API_URL + `userInfo/${username}`, { headers: authHeader() });
  }

  getGroupsByPriceListId(id){
    return axios.get(API_URL + `userInfo/getGroupsByPriceListId/${id}`, { headers: authHeader() });
  }
}

export default new UserService();