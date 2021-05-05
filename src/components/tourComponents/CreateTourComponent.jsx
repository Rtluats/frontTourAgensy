import { Button } from 'bootstrap';
import React, { Component } from 'react';
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
            file: '',
            imagePreviewUrl: ''
        }

        this.saveOrUpdateTour = this.saveOrUpdateTour.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.addPriceList = this.addPriceList.bind(this);
        this.deletePriceList = this.deletePriceList.bind(this);
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

        PriceListService.getPriceLists().then((res) => {
            this.setState({
                allPriceLists: res.data
            })
        })
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

    addPriceList(priceList){
        if(!this.state.priceLists.includes(priceList)){
            this.setState({priceLists: this.state.priceLists.add(priceList)})
        }
    }

    deletePriceList(priceList){
        if(this.state.priceLists.includes(priceList)){
            this.setState({priceLists: this.state.priceLists.filter(p => p.id !== priceList.id)})
        }
    }

    getButton(p){
        if(this.state.priceLists.includes(p)){
            return <Button className="btn-danger" onClick={() => this.deletePriceList(p)}>Delete from tour</Button>
        } else {
            return <Button className="btn-success" onClick={() => this.addPriceList(p)}>Add to tour</Button>
        }
    }

    // handleSubmit(e) {
    //     e.preventDefault();
    //   }
    
    // handleImageChange(e) {
    //     e.preventDefault();
    
    //     let reader = new FileReader();
    //     let file = e.target.files[0];
    
    //     reader.onloadend = () => {
    //       this.setState({
    //         file: file,
    //         imagePreviewUrl: reader.result
    //       });
    //     }
    
    //     reader.readAsDataURL(file)
    // }

    render() {
        // let {imagePreviewUrl} = this.state;
        // let $imagePreview = null;
        // if (imagePreviewUrl) {
        //     $imagePreview = (<img src={imagePreviewUrl} />);
        // } else {
        //     $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        // }

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
                                    {/* <div>
                                        <label>Image:</label>
                                        <div className="previewComponent">
                                            <form onSubmit={(e)=>this._handleSubmit(e)}>
                                            <input className="fileInput" type="file" 
                                                onChange={(e)=>this.handleImageChange(e)} />
                                            <button className="submitButton" 
                                                type="submit" 
                                                onClick={(e)=>this.handleSubmit(e)}>Upload Image</button>
                                            </form>
                                            <div className="imgPreview">
                                                {$imagePreview}
                                            </div>
                                        </div>
                                    </div> */}
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
                                                this.state.allPriceLists.map(
                                                    p => 
                                                    <tr key={p.Id} >
                                                        <td>{p.hotel.name}</td>
                                                        <td>{p.hotel.city.name}</td>
                                                        <td>{p.departureDate}</td>
                                                        <td>{p.numberOfDays}</td>
                                                        <td>{p.price}</td>
                                                        <td>{p.description}</td>
                                                        <td>
                                                            <div className="btn-group">
                                                                {this.getButton(p)}
                                                            </div>
                                                        </td>
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