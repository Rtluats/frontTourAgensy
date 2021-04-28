import React, { Component } from 'react';
import PriceListService from '../../services/PriceListService';

class ListPriceListComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            priceLists: []
        }

        this.addPriceList = this.addPriceList.bind(this);
        this.editPriceList = this.editPriceList.bind(this);
        this.deletePriceList = this.deletePriceList.bind(this);
        this.viewPriceList = this.viewPriceList.bind(this);
    }

    viewPriceList(id){
        this.props.history.push(`/priceList-view/${id}`)
    }

    deletePriceList(id){
        PriceListService.deletePriceList(id).then( res => {
            this.setState({priceLists: this.state.priceLists.filter(h => h.id !== id)})
        });
    }

    editPriceList(id){
        this.props.history.push(`/priceList-add/${id}`)
    }

    componentDidMount(){
        PriceListService.getPriceLists().then((res)=>
            {
                this.setState({ priceLists: res.data });
                console.log(res.data);
            }
        )
    }

    addPriceList(){
        this.props.history.push('/priceList-add/_add')
    }

    render() {
        return (
            <div>
                <h2 className="text-center">PriceLists List</h2>
                <button type="button" className="btn btn-primary" onClick={this.addPriceList}>Add</button>
                <p/>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Price</th>
                                <th>Discount</th>
                                <th>Departure date</th>
                                <th>Number of days</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.priceLists.map(
                                    priceList =>
                                    <tr key = {priceList.id} >
                                        <td> {priceList.price} </td>
                                        <td> {priceList.discount} </td>
                                        <td> {priceList.departureDate} </td>
                                        <td> {priceList.numberOfDays} </td>
                                        <td>
                                            <button onClick = {() => this.editPriceList(priceList.id)} className="btn btn-info">Update</button>
                                            <button style={{marginLeft: "10px"}} onClick = {() => this.deletePriceList(priceList.id)} className="btn btn-danger">Delete</button>
                                            <button style={{marginLeft: "10px"}} onClick = {() => this.viewPriceList(priceList.id)} className="btn btn-info">View</button>
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

export default ListPriceListComponent;