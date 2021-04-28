import React, { Component } from 'react';
import PriceListService from '../../services/PriceListService';

class ViewPriceListComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            priceList: {}
        }
    }

    componentDidMount(){
        PriceListService.getPriceListById(this.state.id).then( res => {
            this.setState({priceList: res.data});
        });
    }

    render() {
        return (
            <div>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">View PriceList</h3>
                    <div className="card-body">
                        <div className="row">
                            <label>Price:</label>
                            <div> { this.state.priceList.price } </div>
                        </div>
                        <div className="row">
                            <label>Discount:</label>
                            <div> { this.state.priceList.discount } </div>
                        </div>
                        <div className="row">
                            <label>Departure date:</label>
                            <div> { this.state.priceList.departureDate } </div>
                        </div>
                        <div className="row">
                            <label>Number of days:</label>
                            <div> { this.state.priceList.numberOfDays } </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewPriceListComponent;