import React, { Component } from 'react';
import TourService from '../../services/TourSevice';

class ListToursComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            tours: []
        }

        this.addTour = this.addTour.bind(this);
        this.editTour = this.editTour.bind(this);
        this.deleteTour = this.deleteTour.bind(this);
        this.viewTour = this.viewTour.bind(this);
    }

    viewTour(id){
        this.props.history.push(`/tour-view/${id}`)
    }

    deleteTour(id){
        TourService.deleteTour(id).then( res => {
            this.setState({tours: this.state.tours.filter(t => t.id !== id)})
        });
    }

    editTour(id){
        this.props.history.push(`/tour-add/${id}`);
    }

    componentDidMount(){
        TourService.getTours().then((res)=>
            {
                this.setState({ tours: res.data });
            }
        )
    }

    addTour(){
        this.props.history.push('/tour-add/_add');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Tours List</h2>
                <button className="btn btn-primary" onClick={this.addTour}>Add</button>
                <p/>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.tours.map(
                                    tour =>
                                    <tr key = {tour.id}>
                                        <td> {tour.title} </td>
                                        <td> {tour.description} </td>
                                        <td>
                                            <button onClick = {() => this.editTour(tour.id)} className="btn btn-info">Update</button>
                                            <button style={{marginLeft: "10px"}} onClick = {() => this.deleteTour(tour.id)} className="btn btn-danger">Delete</button>
                                            <button style={{marginLeft: "10px"}} onClick = {() => this.viewTour(tour.id)} className="btn btn-info">View</button>
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

export default ListToursComponent;