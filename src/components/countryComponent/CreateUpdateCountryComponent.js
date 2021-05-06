import {React, useState, useEffect} from 'react';
import CountryService from '../../services/CountryService';
import CityService from '../../services/CityService';


export default function CreateUpdateCountryComponent(props) {
    const [name, setName] = useState('');
    const [cities, setCities] = useState([]);
    const [allCities, setAllCities] = useState([]);

    useEffect(() => {
        if (props.match.params.id !== '_add'){
            CountryService.getCountryById(props.match.params.id).then(res => {
                let country = res.data;
                console.log(country)
                setName(country.name);
                setCities(country.cities);
            })
        }   

        CityService.getCities().then(res => {
            setAllCities(res.data);
        })
    }, [props.match.params.id])

    function saveOrUpdateCountry(c){
        c.preventDefault();

        let country = {
            name: name,
            cities: cities
        }

        console.log(country)

        if(props.match.params.id === '_add'){
            CountryService.createCountry(country).then(res => {
                props.history.push('/countries');
            })
        } else {
            CountryService.updateCountry(country, props.match.params.id).then(res => {
                props.history.push('/countries');
            })
        }
    }

    function changeNameHandler(e){
        e.preventDefault();
        setName(e.target.value);
    }

    function getTitle(){
        if(props.match.params.id !== '_add'){
            return <h3 className='text-center'> Update Country </h3>;
        } else {
            return <h3 className='text-center'> Add Country </h3>;
        }
    }

    function cancel(){
        props.history.goBack();
    }

    function addCity(e, c){
        e.preventDefault();
        if(!cities.some((cit) => cit.id === c.id)){
            setCities([...cities, c]);
        }
    }

    function deleteCity(e, c){
        e.preventDefault();
        if(cities.some((cit) => cit.id === c.id)){
            setCities(cities.filter(city => city.id !== c.id));
        }
    }

    function getButton(c){
        if(cities.some((cit) => cit.id === c.id)){
            return <button className="btn btn-danger" onClick={(e) => deleteCity(e, c)}>Delete</button>;
        } else {
            return <button className="btn btn-success" onClick={(e) => addCity(e, c)}>Add</button>;
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
                                            <th>Related country</th>
                                            <th>is Add</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allCities.map(
                                                c=>
                                                <tr key={c.id}>
                                                    <td>{c.name}</td>
                                                    <td>{c.country == null? "Hasn't rel country": c.country.name}</td>
                                                    <td>{cities.some((cit) => cit.id === c.id)?"Yes":"No"}</td>
                                                    <td>{getButton(c)}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                                <div className="btn-group">
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
