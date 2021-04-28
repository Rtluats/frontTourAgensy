import React, { useState, useEffect } from 'react';
import TourService from '../../services/TourSevice';


export default function DetailComponent(props) {
    const [tour, setTour] = useState({});

    useEffect(() => {
        TourService.getById(props.match.params.id).then(res => {
            setTour(res.data);
        });
    })


    return (
        <div>
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center">Detail tour</h3>
                <div className="card-body">
                    <div className="row">
                        <label>Title:</label>
                        <div> { this.state.tour.title } </div>
                    </div>
                    <div className="row">
                        <label>Description:</label>
                        <div> { this.state.tour.description } </div>
                    </div>
                    {
                        tour.priceLists.map(
                            priceList => 
                            <div key={priceList.id} className="card">
                                <div class="card-body">
                                    <div className="card-body">
                                        <div className="row">
                                            <label>Hotel:</label>
                                            <div> { priceList.hotel.name } </div>
                                        </div>
                                        <div className="row">
                                            <label>Price:</label>
                                            <div> { priceList.price } </div>
                                        </div>
                                        <div className="row">
                                            <label>Discount:</label>
                                            <div> { priceList.discount } </div>
                                        </div>
                                        <div className="row">
                                            <label>Departure date:</label>
                                            <div> { priceList.departureDate } </div>
                                        </div>
                                        <div className="row">
                                            <label>Number of days:</label>
                                            <div> { priceList.numberOfDays } </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
