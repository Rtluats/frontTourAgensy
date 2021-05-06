import React, { Component } from 'react';
import HotelService from '../../services/HotelService';

class ListHotelsComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            hotels: []
        }

        this.addHotel = this.addHotel.bind(this);
        this.editHotel = this.editHotel.bind(this);
        this.deleteHotel = this.deleteHotel.bind(this);
        this.viewHotel = this.viewHotel.bind(this);
        this.getCityName = this.getCityName.bind(this);
        this.getCountryName = this.getCountryName.bind(this);
    }

    viewHotel(id){
        this.props.history.push(`/hotel-view/${id}`)
    }

    deleteHotel(e, id){
        e.preventDefault();
        HotelService.deleteHotel(id).then( res => {
            this.setState({hotel: this.state.hotels.filter(h => h.id !== id)})
        });
    }

    editHotel(id){
        this.props.history.push(`/hotel-add/${id}`)
    }

    componentDidMount(){
        HotelService.getHotels().then((res)=>
            {
                this.setState({ hotels: res.data });
            }
        )
    }

    addHotel(){
        this.props.history.push('/hotel-add/_add')
    }

    getCountryName(h){
        if(h.city == null || h.city.country == null){
            return "Hasn't rel country"
        } else {
            return h.city.country.name;
        }
    }

    getCityName(h){
        if (h.city == null){
            return "Hasn't rel city"
        } else {
            return h.city.name;
        }
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Hotels List</h2>
                <button type="button" className="btn btn-primary " onClick={this.addHotel}>Add</button>
                <p/>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Hotel Name</th>
                                <th>Country</th>
                                <th>City</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.hotels.map(
                                    hotel =>
                                    <tr key = {hotel.id}>
                                        <td>{hotel.name} </td>
                                        <td>{this.getCountryName(hotel)}</td>
                                        <td>{this.getCityName(hotel)}</td>
                                        <td>
                                            <div className="btn-group">
                                                <button onClick = {() => this.editHotel(hotel.id)} className="btn btn-info">Update</button>
                                                <button style={{marginLeft: "10px"}} onClick = {(e) => this.deleteHotel(e, hotel.id)} className="btn btn-danger">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListHotelsComponent;