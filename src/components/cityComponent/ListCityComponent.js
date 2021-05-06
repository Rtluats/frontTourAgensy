import {React, useState, useEffect} from 'react'
import CityService from '../../services/CityService'

export default function ListCityComponent(props) {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        CityService.getCities().then(res => {
            setCities(res.data);
        });
    });

    function deleteCity(e, id) {
        e.preventDefault();
        CityService.deleteCity(id).then(res => {
            setCities(cities.filter(c => c.id !== id));
        });
    }
    
    function editCity(e, id) {
        props.history.push(`/cities-add/${id}`);
    }

    function addCity(e){
        props.history.push(`/cities-add/_add`);
    }

    return (
            <div>
                <h2 className="text-center">Cities List</h2>
                <button type="button" className="btn btn-primary " onClick={(e) => addCity(e)}>Add</button>
                <p/>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>City Name</th>
                                <th>Country Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cities.map(
                                    city =>
                                    <tr key = {city.id}>
                                        <td> {city.name} </td>
                                        <td> {city.country == null ? "Hasn't rel country" :city.country.name} </td>
                                        <td>
                                            <div className="btn-group">
                                                <button onClick = {(e) => editCity(e, city.id)} className="btn btn-info">Update</button>
                                                <button style={{marginLeft: "10px"}} onClick = {(e) => deleteCity(e, city.id)} className="btn btn-danger">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
    )
}
