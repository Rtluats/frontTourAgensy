import React, { Component } from 'react';
import TourService from '../../services/TourSevice';

class ViewTourComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            tour: {}
        }
    }

    componentDidMount(){
        TourService.getTourById(this.state.id).then( res => {
            this.setState({tour: res.data});
        })
    }

    render() {
        return (
            <div>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">View tour</h3>
                    <div className="card-body">
                        <div className="row">
                            <label>Title:</label>
                            <div> { this.state.tour.title } </div>
                        </div>
                        <div className="row">
                            <label>Description:</label>
                            <div> { this.state.tour.description } </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewTourComponent;