import React, { useState, useEffect } from 'react';
import TourService from '../../services/TourSevice'

export default function ListComponent(props) {
    const [tours, setTours] = useState({});


    useEffect(() => {
        TourService.getToursByTitle(props.match.params.title).then((res)=>
            {
                setTours(res.data);
            }
        )
    })
    
    return (
        <div>
            <label>Resalts of Search: "{props.match.params.title}"</label>
            {
                tours.map(
                    tour =>
                    <div key={tour.id} className="card">
                        <h5 className="card-title">{tour.title}</h5>
                        <div className="card-body">
                            <label>Country: {tour.priceLists[0].hotel.city.country.name}</label>
                            <label>City: {tour.priceLists[0].hotel.city.name}</label>
                            <p className="card-text">{tour.discription}</p>
                            <button onClick={() => {props.history.push(`/tour-detail-view/${tour.id}`)}} className="card-link">Подробнее</button>
                        </div>
                    </div>
                )
            }           
        </div>
    )
}
