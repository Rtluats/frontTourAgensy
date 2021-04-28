import React, { Component } from 'react';
import HotelService from '../../services/HotelService';

class ViewHotelComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            hotel: {}
        }
    }

    componentDidMount(){
        HotelService.getHotelById(this.state.id).then( res => {
            this.setState({hotel: res.data});
        })
    }

    render() {
        return (
            <div>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">View Hotel</h3>
                    <div className="card-body">
                        <div className="row">
                            <label>Hotel Name:</label>
                            <div> { this.state.hotel.name } </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewHotelComponent;