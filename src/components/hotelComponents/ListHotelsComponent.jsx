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
    }

    viewHotel(id){
        this.props.history.push(`/hotel-view/${id}`)
    }

    deleteHotel(id){
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
                                        <td>{hotel.city.country.name}</td>
                                        <td>{hotel.city.name}</td>
                                        <td>
                                            <div className="btn-group">
                                                <button onClick = {() => this.editHotel(hotel.id)} className="btn btn-info">Update</button>
                                                <button style={{marginLeft: "10px"}} onClick = {() => this.deleteHotel(hotel.id)} className="btn btn-danger">Delete</button>
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