import React from 'react'
import CountryService from '../../services/CountryService'

export default function CreateUpdateCountryComponent(props) {
    const [name, setName] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        setId(props.match.params.id)
        if (id !== '_add'){
            CountryService.getCountryById(id).then(res => {
                let country = res.data
                setName(country.name)
            })
        }   
    })

    function saveOrUpdateCountry(c){
        c.preventDefault()

        let country = {
            name: name
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
                                    
                                <button className="btn btn-success" onClick={saveOrUpdateCountry}>Save</button>
                                <button className="btn btn-danger" onClick={cancel} style={{marginLeft: "10px"}}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
