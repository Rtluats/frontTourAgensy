import React from 'react'
import CountryService from '../../services/CountryService'
import CityService from '../../services/CityService'
import { Button } from 'bootstrap'


export default function CreateUpdateCountryComponent(props) {
    const [name, setName] = useState('')
    const [cities, setCities] = useState([])
    const [id, setId] = useState('')
    const [allCities, setAllCities] = useState([])

    useEffect(() => {
        setId(props.match.params.id)
        if (id !== '_add'){
            CountryService.getCountryById(id).then(res => {
                let country = res.data
                setName(country.name)
                setCities(country.cities)
            })
        }   

        CityService.getCities().then(res => {
            setAllCities(res.data)
        })
    })

    function saveOrUpdateCountry(c){
        c.preventDefault()

        let country = {
            name: name,
            cities: cities
        }

        if(id !== '_add'){
            CountryService.createCountry(country).then(res => {
                props.history.push('/countries')
            })
        } else {
            CountryService.updateCountry(country, id).then(res => {
                props.history.push('/countries')
            })
        }
    }

    function changeNameHandler(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function getTitle(){
        if(id !== '_add'){
            return <h3 className='text-center'> Update Country </h3> 
        } else {
            return <h3 className='text-center'> Add Country </h3>
        }
    }

    cancel = () => {
        props.history.goBack()
    }

    function addCity(c){
        if(!cities.contains(c)){
            cities.add(c);
        }
    }

    function deleteCity(c){
        if(cities.contains(c)){
            cities.remove(c);
        }
    }

    function getButton(c){
        if(cities.contains(c)){
            return <Button className="btn btn-danger" onClick={() => deleteCity(c)}>Delete</Button>
        } else {
            return <Button className="btn btn-success" onClick={() => addCity(c)}>Add</Button>
        }
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6  offset-md-3 offset-md-3">
                        {getTitle()}
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input placeholder="Name" name="name" className="form-control"
                                        value={name} onChange={changeNameHandler}/>
                                </div>
                                <label>Cities List</label>
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>is Add</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allCities.map(
                                                c=>
                                                <tr>
                                                    <td>{c.name}</td>
                                                    <td>{cities.contains(c)}</td>
                                                    <td>{getButton(c)}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                                <div class="btn-group">
                                    <button className="btn btn-success" onClick={saveOrUpdateCountry}>Save</button>
                                    <button className="btn btn-danger" onClick={cancel} style={{marginLeft: "10px"}}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
