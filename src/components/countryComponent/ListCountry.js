import React from 'react'
import CountryService from '../../services/CountryService'

export default function ListCountry(props) {
    const [country, setCountry] = useState([])

    useEffect(() => {
        CountryService.getCountry().then(res => {
            setCountry(res.data)
        })
    })
    
    function editCountry(e, id){
        props.history.push(`/country-add/${id}`)
    }

    function addCountry(e){
        props.history.push(`/country-add/_add`)
    }

    function deleteCountry(e, id){
        CountryService.deleteCountry(id).then(res => {
            setCountry(country.filter(c => c.id != id))
        })
    }

    return (
        <div>
            <h2 className="text-center">Country List</h2>
            <button type="button" className="btn btn-primary " onClick={() => addCountry}>Add</button>
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
                                        <button onClick = {() => editCountry(c.id)} className="btn btn-info">Update</button>
                                        <button style={{marginLeft: "10px"}} onClick = {() => deleteCountry(c.id)} className="btn btn-danger">Delete</button>
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
