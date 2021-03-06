import axios from 'axios';
import authHeader from './auth-header';

const COMMENT_API_BASE_URL = "http://localhost:8080/api/v1/comments";

class CommentService{

    getComment(){
        return axios.get(COMMENT_API_BASE_URL, { headers: authHeader() });
    }

    createComments(id,comment){
        return axios.post(COMMENT_API_BASE_URL + `/commentToPriceList/${id}`, comment, { headers: authHeader() });
    }

    getCommentById(id){
        return axios.get(COMMENT_API_BASE_URL + "/" + id, { headers: authHeader() });
    }

    getCommentsByPriceListId(id){
        return axios.get(COMMENT_API_BASE_URL + "/byPriceListId/" + id, { headers: authHeader() });
    }

    updateComment(hotel, id){
        return axios.put(COMMENT_API_BASE_URL + "/" + id, hotel, { headers: authHeader() });
    }

    deleteComment(id){
        return axios.delete(COMMENT_API_BASE_URL + "/" + id, { headers: authHeader() });
    }
}

export default new CommentService()