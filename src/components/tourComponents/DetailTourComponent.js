import {React, useState, useEffect} from 'react';
import authService from '../../services/auth.service';
import CommentService from '../../services/CommentService';
import PriceListService from '../../services/PriceListService';
import TourSevice from '../../services/TourSevice';
import userService from '../../services/user.service';


export default function DetailTourComponent(props) {
    const [tour, setTour] = useState({});
    const [isUser] = useState(authService.getCurrentUser() == null ? false : true);
    const [priceList, setPriceList] = useState({});
    const [hotel, setHotel] = useState({});
    const [city, setCity] = useState({});
    const [country, setCountry] = useState({});
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const tourId = props.match.params.tourId;
        const priceListId = props.match.params.priceListId;
        TourSevice.getTourById(tourId).then(res =>{
            const data = res.data;
            setTour(data);
            if(data.priceLists.length===1){
                setPriceList(data.priceLists[0]);
                setHotel(data.priceLists[0].hotel);
                setCountry(data.priceLists[0].hotel.city.country);
                setCity(data.priceLists[0].hotel.city);
            } else{
                setPriceList(data.priceLists.filter(p => p.id === priceListId)[0]);
                setHotel(data.priceLists.filter(p => p.id === priceListId)[0].hotel);
                setCountry(data.priceLists.filter(p => p.id === priceListId)[0].hotel.city.country);
                setCity(data.priceLists.filter(p => p.id === priceListId)[0].hotel.city);
            }
            
        });
       

        CommentService.getCommentsByPriceListId(priceListId).then(res =>{
            setComments(res.data);
        });
        
        userService.getGroupsByPriceListId(priceListId).then(res =>{
            setGroups(res.data);
        });

    },[props.match.params.tourId, props.match.params.priceListId])

    function addComment(event){
        let saveComment = {
            message: comment,
        }   

        CommentService.createComments(props.match.params.priceListId, saveComment).then(res =>{
            comments.push(saveComment)
        })
    }

    function handleChangeComment(event){
        setComment(event.target.value);
        event.preventDefault();
    }

    function buy(e){
        e.preventDefault();
        PriceListService.buyATour(props.match.params.priceListId).then(res =>{
            console.log(res.data);
        })
    }

    function formatDate(string){
        let options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute:'numeric'};
        return new Date(string).toLocaleDateString([],options);
    }

    return (
        <div>
            <div className="card col-md-12 ">
                <h3 className="text-center">Tour</h3>
                <div className="card-body">
                    <div className="row">
                        <label><strong>Title:</strong>{ tour.title }</label>
                    </div>
                    <div className="row">
                        <label><strong>Description:</strong>{tour.description }</label>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row justify-content-md-center"> 
                        <div className="col col-lg-4">
                            {
                                isUser&&(
                                    <div className="row">
                                        <textarea value={comment} onChange={handleChangeComment}/>
                                        <button className="btn btn-success" onClick={addComment}>Отправить</button>
                                    </div>
                                )
                            }
                            <ul>
                                {   
                                    comments.map(
                                        c => 
                                            <li key={c.id}>
                                                <div className="row">
                                                    <lable><strong>First name:</strong>{c.userInfo.firstName} <strong>Last name:</strong>{c.userInfo.lastName} <br/><strong>Date:</strong>{ formatDate(c.localDateTime)}</lable>
                                                    <br/>
                                                    <div>
                                                        <label><strong>Text:</strong></label>
                                                        {c.message}
                                                    </div>
                                                </div>
                                            </li>
                                        )                
                                }
                            </ul> 
                        </div>
                        <div className="col">
                            <div className="card-body">
                                <div className="row">
                                    <label><strong>Hotel:</strong>{hotel.name}</label>
                                </div>
                                <div className="row">
                                    <label><strong>Country:</strong>{country.name}</label>
                                </div>
                                <div className="row">
                                    <label><strong>City:</strong>{city.name}</label>
                                </div>
                                <div className="row">
                                    <label><strong>Number of days:</strong>{priceList.numberOfDays}</label>
                                </div>
                                <div className="row">
                                    <label><strong>Departure date:</strong>{priceList.departureDate}</label>
                                </div>
                                <div className="row">
                                    <label><strong>Price:</strong>{priceList.price}</label>
                                </div>
                                <div className="row">
                                    <label><strong>Discount:</strong>{priceList.discount}</label>
                                </div>
                                {
                                    isUser&&(
                                        <button className="btn btn-success" onClick={(e)=> buy(e)} >Buy</button>    
                                    )
                                }
                            </div>
                        </div>
                        {
                            isUser&&groups.length>0&&(
                                <div className="col">
                                    <label>My groups</label>
                                    {
                                        groups.map(
                                            item => 
                                            <ul key={item.id}>
                                                {
                                                    item.userInfoList.map(
                                                        userInfo=>
                                                        <li key={userInfo.id}>
                                                            <div className="row">
                                                                <lable><strong>First name:</strong>{userInfo.firstName} <strong>Last name:</strong>{userInfo.lastName}</lable>
                                                                <br/>
                                                            </div>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
