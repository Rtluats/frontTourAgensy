import React, { Component } from 'react';
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";

export default class HeaderComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            showManagerBoard: false,
            currentUser: undefined,
            title: '',
        }

        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
    
        if (user) {
          this.setState({
            currentUser: user,
            showManagerBoard: user.roles.includes("ROLE_MANAGER"),
          });
        }
      }
    
    logOut() {
        AuthService.logout();
    }

    searchHandler(e){
        this.setState({
            title: e.target.value,
        })
        e.preventDefault();
    }

    findByTitle(){
        this.props.history.push(`/search/${this.state.title}`)
    }


    render() {
        const { currentUser, showManagerBoard} = this.state;
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div class="container-fluid">
                            <div><label className="navbar-brand">Tour Agensy</label></div>
                            <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2" type="search" placeholder="tour" aria-label="Search"/>
                                <button onClick={() => this.searchHandler} onChange={() => this.findByTitle} className="btn btn-outline-success my-2 my-sm-0" type="submit">Search by tour</button>
                            </form>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {currentUser && (
                                    
                                    <li className="nav-item">
                                        <Link to={"/"} className="nav-link">
                                        Home
                                        </Link>
                                    </li>
                                    
                            )}
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                {showManagerBoard && (
                                    
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Work
                                        </a>
                                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li><a className="dropdown-item" href="/hotels">Hotel List</a></li>
                                            <li><a className="dropdown-item" href="/priceLists">priceList List</a></li>
                                            <li><a className="dropdown-item" href="/tours">Tour List</a></li>
                                        </ul>
                                    </li>
                                    
                                )}
                            </div>
                            </ul>
                            {currentUser ? (
                                <div className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link to={"/profile"} className="nav-link">
                                            {currentUser.username}
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/login" className="nav-link" onClick={this.logOut}>
                                        Logout
                                        </a>
                                    </li>
                                </div>
                            ) : (
                                <div className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link to={"/login"} className="nav-link">
                                        Login
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to={"/register"} className="nav-link">
                                        Sign Up
                                        </Link>
                                    </li>
                                </div>
                            )}
                        </div>
                    </nav>
                </header>
            </div>
        )
    }
}
