import { Button } from 'bootstrap';
import React from 'react'
import authService from '../../services/auth.service'
import CommentService from '../../services/CommentService';
import TourSevice from '../../services/TourSevice';

// класс для просмотра конкретного тура + отеля + дней отдыха
export default function DetailTourComponent(props) {
    const [tour, setTour] = useState({});
    const [isUser, setIsUser] = useState(false);
    const [priceList, setPriceList] = useState({})
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    useEffect(() => {
        const user = authService.getCurrentUser();
        const tourId = props.match.params.tourId;
        const priceListId =  props.match.params.priceListId;

        if(user){
            setIsUser(true);
        }

        TourSevice.getTourById(tourId).then(res =>{
            setTour(res.data);
            setPriceList(tour.priceLists.filter(p => p.id == priceListId)[0]);
        });

        CommentService.getCommentsByPriceListId(priceListId).then(res =>{
            setComments(res.data);
        })
    })

    function addComment(event){
        let saveComment = {
            message: comment,
            priceList: priceList,
            user: authService.getCurrentUser(), // ?? точно так
        }

        CommentService.addComment(saveComment).then(res =>{
            comments.push(saveComment)
        })
    }

    function handleChangeComment(event){
        setComment(event.target.value);
        event.preventDefault();
    }

    return (
        <div>
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center">Tour</h3>
                <div className="card-body">
                    <div className="row">
                        <label>Title:</label>
                        <div> { tour.title } </div>
                    </div>
                    <div className="row">
                        <label>Description:</label>
                        <div> {tour.description } </div>
                    </div>
                    <div class="container-fluid">
                        <div class="row justify-content-md-center"> 
                            <div class="col col-lg-4">
                                {
                                    isUser&&(
                                        <div className="row">
                                            <textarea value={comment} onChange={handleChangeComment}/>
                                            <Button className="btn btn-success" onClick={addComment}>Отправить</Button>
                                        </div>
                                    )
                                }
                                <ul>
                                    {   
                                        comments.map(
                                            c => 
                                                <li>
                                                    <div className="row">
                                                        <lable>{c.user.userInfo.firstName} {c.user.userInfo.lastName} {c.dateTime}</lable>
                                                        <div>{c.message}</div>
                                                    </div>
                                                </li>
                                        )
                                    
                                    }
                                </ul> 
                            </div>
                            <div class="col">
                                <div className="card-body">
                                    <div className="row">
                                        <label>Hotel:</label>
                                        <div> { priceList.hotel.name } </div>
                                    </div>
                                    <div className="row">
                                        <label>Country:</label>
                                        <div> { priceList.hotel.city.country.name} </div>
                                    </div>
                                    <div className="row">
                                        <label>City:</label>
                                        <div> { priceList.hotel.city.name} </div>
                                    </div>
                                    <div className="row">
                                        <label>Number of days:</label>
                                        <div> { priceList.numberOfDays } </div>
                                    </div>
                                    <div className="row">
                                        <label>Departure date:</label>
                                        <div> { priceList.departureDate } </div>
                                    </div>
                                    <div className="row">
                                        <label>Price:</label>
                                        <div> { priceList.price } </div>
                                    </div>
                                    <div className="row">
                                        <label>Discount:</label>
                                        <div> { priceList.discount } </div>
                                    </div>
                                    <Button className="btn btn-success" onClick={()=> buy} >Buy</Button>    
                                </div>
                            </div>        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
