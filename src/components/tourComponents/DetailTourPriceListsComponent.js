import React, { useState, useEffect } from 'react';
import TourService from '../../services/TourSevice';


export default function DetailTourPriceListsComponent(props) {
    const [tour, setTour] = useState({});
    const [priceLists, setPriceLists] = useState([]);
    const [country, setCountry] = useState({});
    const [city, setCity] = useState({});

    useEffect(() => {
        TourService.getTourById(props.match.params.id).then(res => {
            console.log(res.data)
            setTour(res.data);
            setPriceLists(res.data.priceLists);
            setCity(res.data.priceLists[0].hotel.city);
            setCountry(res.data.priceLists[0].hotel.city.country);
        });
    },[props.match.params.id])

    function getDetailTourComponent(id){
        props.history.push(`/tour-buy-view/${tour.id}&&${id}`)
    }

    return (
        <div>
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center">Tour</h3>
                <div className="card-body">
                    <div className="row">
                        <label><strong>Title: </strong>{tour.title}</label>
                        
                    </div>
                    <div className="row">
                        <label><strong>Country: </strong>{country.name}</label>
                        
                    </div>
                    <div className="row">
                        <label><strong>City:</strong>{city.name }</label>
                        
                    </div>
                    <div className="row">
                        <label><strong>Description:</strong></label>
                        <div> {tour.description } </div>
                    </div>
                </div>
            </div>
            <div className="album py-5 bg-light">
                <div className="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {
                            priceLists.map(
                                priceList => 
                                <div key={priceList.id}>
                                    <div className="col">
                                        <div className="card shadow-sm">
                                            <label><strong> Hotel: </strong>{priceList.hotel.name}</label>
                                            <div class="card-body">
                                                <p class="card-text">
                                                    <label><strong>Price:</strong> {priceList.price}</label>
                                                    <br/>
                                                    <label><strong>Discount:</strong> {priceList.discount}</label>
                                                    <br/>
                                                    <label><strong>Number of days:</strong> {priceList.numberOfDays}</label>
                                                    <label><strong>Date departure:</strong> {priceList.departureDate}</label>
                                                </p>
                                            </div>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="btn-group">
                                                    <button className="btn btn-success" onClick={()=> getDetailTourComponent(priceList.id)} >Buy</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }     
                    </div>
                </div>
            </div>
        </div>
    )
}
