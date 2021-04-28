import React from 'react'
import CityService from '../../services/CityService'

export default function ListCityComponent(props) {
    function deleteCity(e, id) {
        CityService.deleteCity(id).then(res => {
            setCities({cities: cities.filter(c => c.id != id)})
        })
    }
    
    function editCity(e, id) {
        props.history.push(`/city-add/${id}`)
    }

    function addCity(e){
        props.history.push(`/city-add/_add`)
    }

    const [cities, setCities] = useState([{}])

    useEffect(() => {
        CityService.getCities().then(res => {
            setCities(res.data)
        })
        /* return () => {
            cleanup
        } */
    }/* , [input] */)


    return (
            <div>
                <h2 className="text-center">Cities List</h2>
                <button type="button" className="btn btn-primary " onClick={() => addCity}>Add</button>
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
                                        <td> {city.country.name} </td>
                                        <td>
                                            <button onClick = {editCity(() => city.id)} className="btn btn-info">Update</button>
                                            <button style={{marginLeft: "10px"}} onClick = {() => deleteCity(city.id)} className="btn btn-danger">Delete</button>
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
