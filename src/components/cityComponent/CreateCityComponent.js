import React from 'react'
import CityService from '../../services/CityService'

export default function CreateCityComponent(props) {
    const [name, setName] = useState('')
    const [countryName, setCountryName] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        setId(props.match.params.id)
        if(id !== '_add' ){
            CityService.getCityById(id).then(res => {
                let city = res.data
                setCountryName(city.countryName)
                setName(city.name)
            })
        };
    })

    function saveOrUpdateCity (c) {
        c.preventDefault()

        let saveCity = {
            name:name,
            countryName: countryName,
        }

        if (id !== '_add'){
            CityService.createCities(saveCity).then(res => {
                props.history.push('/cities')
            })
        } else {
            CityService.updateCity(saveCity, id).then(res => {
                props.history.push('/cities')
            })
        }
    }

    function changeNameHandler(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function changeCountryNameHandler(e){
        e.preventDefault()
        setCountryName(e.target.value)
    }
    
    function getTitle(){
        if(id === '_add'){
            return <h3 className='text-center'> Add City </h3>
        } else {
            return <h3 className='text-center'> Update City </h3> 
        }
    }

    cancel = () => {
        props.history.goBack()
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
                                    
                                <div className="form-group">
                                    <label>Country Name:</label>
                                    <input placeholder="Country name" name="countryName" className="form-control"
                                        value={countryName} onChange={changeCountryNameHandler}/>
                                </div>

                                <button className="btn btn-success" onClick={saveOrUpdateCity}>Save</button>
                                <button className="btn btn-danger" onClick={cancel} style={{marginLeft: "10px"}}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
