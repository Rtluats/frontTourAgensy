import { Button } from 'bootstrap';
import React, { Component } from 'react';
import DecimalField from 'react-decimal-field';
import PriceListService from '../../services/PriceListService';
import TourService from '../../services/TourSevice';


class CreateTourComponent extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            id: this.props.match.params.id,
            title: '',
            description: '',
            priceLists: [],
            allPriceLists: [],
        }

        this.saveOrUpdateTour = this.saveOrUpdateTour.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    }

    componentDidMount(){
        if(this.state.id !== '_add'){
            TourService.getTourById(this.state.id).then((res) =>{
                let tour = res.data
                console.log(tour)
                this.setState({
                    id: tour.id,
                    title: tour.title,
                    description: tour.description,
                    priceLists: tour.priceLists,
                })
            })
        }
        if(this.state.id == '_add'){
            PriceListService.getPriceLists().then((res) => {
                this.setState({
                    allPriceLists: res.data
                })
            })
        }else{
            PriceListService.getPriceListByCityName(this.state.priceLists[0].country.countryName).then((res) => {
                this.setState({
                    allPriceLists: res.data
                })
            })
        }
    }

    saveOrUpdateTour = (p) => {
        p.preventDefault();

        let tour = {
            title: this.state.title,
            description: this.state.description
        };
        console.log(tour)
        if(this.state.id === '_add'){
            TourService.createTour(tour).then(res => {
                this.props.history.push('/tours');
            });
        }else{
            TourService.updateTour(tour, this.state.id).then(res => {
                this.props.history.push('/tours');
            });
        }
    }

    changeTitleHandler=(event)=>{
        this.setState({title: event.target.value});
    }

    changeDescriptionHandler=(event)=>{
        this.setState({description: event.target.value});
    }
    
    cancel(){
        this.props.history.goBack();
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center"> Add Tour </h3>
        }else{
            return <h3 className="text-center"> Update Tour </h3>
        }
    }

    addPriceList(){

    }

    deletePriceList(){
        
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
                                        <label>Title:</label>
                                        <input placeholder="Title" name="title" className="form-control"
                                            value={this.state.title} onChange={this.changeTitleHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Description:</label>
                                        <input placeholder="Description" name="description" className="form-control"
                                            value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>PriceLists:</label>
                                        <table className="table table-striped table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Hotel</th>
                                                    <th>City</th>
                                                    <th>Departure date</th>
                                                    <th>Number of days</th>
                                                    <th>Price</th>
                                                    <th>Description</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.priceLists.map(
                                                    p => 
                                                    <tr key={p.Id} >
                                                        <td>{p.hotel.name}</td>
                                                        <td>{p.hotel.city.name}</td>
                                                        <td>{p.departureDate}</td>
                                                        <td>{p.numberOfDays}</td>
                                                        <td>{p.price}</td>
                                                        <td>{p.description}</td>
                                                        <Button className="btn-success">Add to tour</Button>
                                                        <Button className="btn-danger">Delete from tour</Button>
                                                    </tr>
                                                )
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveOrUpdateTour}>Save</button>
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

export default CreateTourComponent;