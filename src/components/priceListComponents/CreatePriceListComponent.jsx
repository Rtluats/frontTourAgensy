import { Button } from 'bootstrap';
import React, { Component } from 'react';
import DecimalField from 'react-decimal-field';
import HotelService from '../../services/HotelService';
import PriceListService from '../../services/PriceListService';


class CreatePriceListComponent extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            id: this.props.match.params.id,
            price: 0.00,
            discount: 0.00,
            departureDate: null,
            numberOfDays: 0,
            hotel: {},
            allHotels:[],
            tour: {},
        }

        this.saveOrUpdatePriceList = this.saveOrUpdatePriceList.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changeDepartureDateHandler = this.changeDepartureDateHandler.bind(this);
        this.changeDiscountHandler = this.changeDiscountHandler.bind(this);
        this.changeNumberOfDaysHandler = this.changeNumberOfDaysHandler.bind(this);
        this.deleteHotel = this.deleteHotel.bind(this)
        this.addHotel = this.addHotel.bind(this)
    }

    componentDidMount(){
        if(this.state.id !== '_add'){
            PriceListService.getPriceListById(this.state.id).then((res) =>{
                let priceList = res.data
                this.setState({
                    id: priceList.id,
                    price: priceList.price,
                    discount: priceList.discount,
                    departureDate: priceList.departureDate,
                    numberOfDays: priceList.numberOfDays,
                    hotel: priceList.hotel,
                    tour: priceList.tour,
                })
            })
        }
        
        HotelService.getHotels().then(res => {
            this.setState({
                hotels: res.data
            })
        })
    }

    saveOrUpdatePriceList = (p) => {
        p.preventDefault();
        let priceList = {
            price: this.state.price,
            discount: this.state.discount,
            departureDate: this.state.departureDate,
            hotel: this.state.hotel,
            tour: this.state.tour
        };

        if(this.state.id === '_add'){
            PriceListService.createPriceList(priceList).then(res => {
                this.props.history.push('/priceLists');
            });
        }else{
            PriceListService.updatePriceList(priceList, this.state.id).then(res => {
                this.props.history.push('/priceLists');
            });
        }
    }

    changePriceHandler=(event)=>{
        this.setState({price: event.target.value});
    }

    changeDiscountHandler=(event)=>{
        this.setState({discount: event.target.value});
    }

    changeNumberOfDaysHandler=(event)=>{
        this.setState({numberOfDays: event.target.value});
    }

    changeDepartureDateHandler=(event)=>{
        this.setState({departureDate: event.target.value});
    }
    
    cancel(){
        this.props.history.goBack();
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center"> Add PriceList </h3>
        }else{
            return <h3 className="text-center"> Update PriceList </h3>
        }
    }

    loadFile(){
        
    }

    deleteHotel(){
        this.setState({hotel: null})
        
    }

    addHotel(h){
        this.setState({hotel: h})
    }

    getButton(h){
        if(this.state.hotel === h){
            return <Button className="btn btn-danger" onClick={() => this.deleteHotel(h)}>Delete from PriceList</Button>

        } else {
            return <Button className="btn btn-success" onClick={() => this.addHotel(h)}>Add to PriceList</Button>

        }
    }    

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6  offset-md-3 offset-md-3">
                            {this.getTitle()}
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Price:</label>
                                        <DecimalField  className="form-control"
                                            value={this.state.price} onChange={this.changePriceHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Discount:</label>
                                        <DecimalField className="form-control"
                                            value={this.state.discount} onChange={this.changeDiscountHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Departure date:</label>
                                        <input name="departureDate" className="form-control" type="date"
                                            value={this.state.departureDate} onChange={this.changeDepartureDateHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Number of days:</label>
                                        <input type="number" placeholder="numberOfDays" name="numberOfDays" className="form-control"
                                            value={this.state.numberOfDays} onChange={this.changeNumberOfDaysHandler}/>
                                    </div>
                                    <div>Hotel List</div>
                                    <table>
                                        <thead>
                                            <th>Hotel</th>
                                            <th>City</th>
                                            <th>Country</th>
                                            <th>Actions</th>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.hotels.map(
                                                h =>
                                                <tr key={h.id}>
                                                    <td>{h.name}</td>
                                                    <td>{h.city.name}</td>
                                                    <td>{h.country.name}</td>
                                                    <td> {this.getButton(h)} </td>
                                                </tr>
                                            )
                                        }
                                        </tbody>
                                    </table>
                                    <button className="btn btn-success" onClick={this.saveOrUpdatePriceList}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreatePriceListComponent;