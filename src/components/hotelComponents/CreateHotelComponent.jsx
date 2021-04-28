import React, { Component } from 'react';
import HotelService from '../../services/HotelService';

class CreateHotelComponent extends Component {
    
    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.saveOrUpdateHotel = this.saveOrUpdateHotel.bind(this);
    }

    componentDidMount(){
        if(this.state.id !== '_add'){
            HotelService.getHotelById(this.state.id).then((res) => {
                let hotel = res.data;
                this.setState({
                    id: hotel.id,
                    name: hotel.name
                })
            });
        }   
    }

    saveOrUpdateHotel = (h) => {
        h.preventDefault();
        let hotel = {
            name: this.state.name
        };
        
        if(this.state.id === '_add'){

            HotelService.createHotels(hotel).then(res => {
                this.props.history.push('/hotels');
            });
        }else{
            HotelService.updateHotel(hotel, this.state.id).then(res => {
                this.props.history.push('/hotels');
            });
        }
        
    }

    changeNameHandler=(event)=>{
        this.setState({name: event.target.value});
    }
    
    cancel(){
        this.props.history.goBack();
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center"> Add Hotel </h3>
        }else{
            return <h3 className="text-center"> Update Hotel </h3>
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
                                        <label>Name:</label>
                                        <input placeholder="Name" name="name" className="form-control"
                                            value={this.state.name} onChange={this.changeNameHandler}/>
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveOrUpdateHotel}>Save</button>
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

export default CreateHotelComponent;