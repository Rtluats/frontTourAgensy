import { Button } from 'bootstrap';
import React, { useState, useEffect } from 'react';
import TourService from '../../services/TourSevice';

// класс для просмотра конкретного тура + отелей!!!!!(много) + дней отдыха
// тут очень интересно как бы можно было сдеать вывод прайс-листов горизонтально
// или типо как матрица
//  *|*|*
//  *|*|*
//  *|*|*
// что-то типо такого
export default function DetailTourPriceListsComponent(props) {
    const [tour, setTour] = useState([]);

    useEffect(() => {
        TourService.getById(props.match.params.id).then(res => {
            setTour(res.data);
        });
    })

    function getDetailTourComponent(id){
        props.history.push(`/tour-detail-view/${tour.id}&&${id}}`) // 
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
                        <div> { tour.description } </div>
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
                                       <Button className="btn btn-success" onClick={()=> getDetailTourComponent(priceList.id)} >Buy</Button>
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
