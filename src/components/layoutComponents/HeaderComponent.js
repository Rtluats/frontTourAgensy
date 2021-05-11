import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { useHistory } from "react-router-dom";

export default function HeaderComponent(props) {
    let history = useHistory();
    const [showManagerBoard, setShowManagerBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [title, setTitle] = useState('');   
    
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            setShowManagerBoard(user.roles.includes("ROLE_MANAGER"))
        }
    },[])

    function logOut() {
        AuthService.logout();
    }

    function searchHandler(e){
        e.preventDefault();
        setTitle(e.target.value);
    }

    function findByTitle(){
        history.push(`/search/${title}`);
    }

    return (
        <div>
                <header>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="container-fluid">
                            <div><label className="navbar-brand">Tour Agensy</label></div>
                            <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2" onChange={(e)=>searchHandler(e)} value={title} type="search" placeholder="tour" aria-label="Search"/>
                                <button className="btn btn-outline-success my-2 my-sm-0" onClick={()=>findByTitle()}>Search by tour</button>
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
                                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Work
                                        </a>
                                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li><a className="dropdown-item" href="/cities">Cities</a></li>
                                            <li><a className="dropdown-item" href="/countries">Countries</a></li>
                                            <li><a className="dropdown-item" href="/hotels">Hotels</a></li>
                                            <li><a className="dropdown-item" href="/priceLists">priceLists</a></li>
                                            <li><a className="dropdown-item" href="/tours">Tours</a></li>
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
                                        <a href="/login" className="nav-link" onClick={()=>logOut()}>
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
