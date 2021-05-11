import React, { useState, useEffect } from 'react';
import TourService from '../../services/TourSevice'

export default function ListComponent(props) {
    const [tours, setTours] = useState([]);


    useEffect(() => {
        TourService.getToursByTitle(props.match.params.title).then((res)=>
            {
                setTours(res.data);
            }
        )
    },[props.match.params.title])
    
    return (
        <div>
            <label>Resalts of Search: "{props.match.params.title}"</label>
            {
                tours.map(
                    tour =>
                    <div key={tour.id} className="card">
                        <h5 className="card-title">Title:{tour.title}</h5>
                        <div className="card-body">
                            <p>Country: {tour.priceLists[0].hotel.city.country.name}</p>
                            <p>City: {tour.priceLists[0].hotel.city.name}</p>
                            <p className="card-text">Description:{tour.description}</p>
                            <button className="card-link btn-primary" onClick={() => {props.history.push(`/tour-detail-view/${tour.id}`)}} >Подробнее</button>
                        </div>
                    </div>
                )
            }           
        </div>
    )
}
