import React, { useState, useEffect } from 'react';
import TourService from '../../services/TourSevice'

export default function ListComponent(props) {
    const [tours, setTours] = useState({});


    useEffect(() => {
        TourService.getTours().then((res)=>
            {
                setTours(res.data);
            }
        )
    })
    
    return (
        <div>
            {
                tours.map(
                    tour =>
                    <div key={tour.id} className="card">
                        <h5 className="card-title">{tour.title}</h5>
                        <div className="card-body">
                            <p className="card-text">{tour.discription}</p>
                            <a onClick={() => {props.history.push(`/tour-detail-view/${tour.id}`)}} className="card-link">Подробнее</a>
                        </div>
                    </div>
                )
            }           
        </div>
    )
}
