import React from 'react'
import CityService from '../../services/CityService'

export default function CreateCityComponent(props) {
    const [city, setCity] = useState({})
    const [id, setId] = useState({})

    useEffect(() => {
        setId(props.match.params.id)
        if(id !== '_add' ){
            CityService.getCityById(id).then(res => {
                setCity(res.data)
            })
        };
    })

    function saveOrUpdateCity (c) {
        let saveCity = {
            name:city.name,
            countryName: city.countryName,
        }

        if ( id !== '_add'){
            
        }
    }

    
    return (
        <div>
            
        </div>
    )
}
