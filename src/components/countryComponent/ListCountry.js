import {React, useState, useEffect} from 'react'
import CountryService from '../../services/CountryService'

export default function ListCountry(props) {
    const [country, setCountry] = useState([])

    useEffect(() => {
        CountryService.getCountry().then(res => {
            setCountry(res.data)
        })
    })
    
    function editCountry(e, id){
        props.history.push(`/countries-add/${id}`)
    }

    function addCountry(e){
        props.history.push(`/countries-add/_add`)
    }

    function deleteCountry(e, id){
        e.preventDefault();
        CountryService.deleteCountry(id).then(res => {
            setCountry(country.filter(c => c.id !== id))
        })
    }

    return (
        <div>
            <h2 className="text-center">Country List</h2>
            <button type="button" className="btn btn-primary " onClick={(e) => addCountry(e)}>Add</button>
            <p/>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Country Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            country.map(
                                c =>
                                <tr key = {c.id}>
                                    <td> {c.name} </td>
                                    <td>
                                        <button onClick = {(e) => editCountry(e, c.id)} className="btn btn-info">Update</button>
                                        <button style={{marginLeft: "10px"}} onClick = {(e) => deleteCountry(e, c.id)} className="btn btn-danger">Delete</button>
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
