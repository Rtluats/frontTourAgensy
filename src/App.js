import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import ListHotelsComponent from './components/hotelComponents/ListHotelsComponent';
import ListToursComponent from './components/tourComponents/ListToursComponent';
import ListPriceListComponent from './components/priceListComponents/ListPriceListComponent';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HeaderComponent from './components/layoutComponents/HeaderComponent';
import FooterComponent from './components/layoutComponents/FooterComponent';
import CreateHotelComponent from './components/hotelComponents/CreateHotelComponent';
import ViewHotelComponent from './components/hotelComponents/ViewHotelComponent';
import CreateTourComponent from './components/tourComponents/CreateTourComponent';
import ViewTourComponent from './components/tourComponents/ViewTourComponent';
import CreatePriceListComponent from './components/priceListComponents/CreatePriceListComponent';
import ViewPriceListComponent from './components/priceListComponents/ViewPriceListComponent';

import DetailComponent from './components/tourComponents/DetailComponent';
import ListComponent from './components/elementsComponent/ListComponent';
import Login from './components/elementsComponent/LoginComponent';
import Register from './components/elementsComponent/RegisterComponent';
import Profile from './components/elementsComponent/ProfileComponent';
import BoardManager from './components/elementsComponent/BoardManagerComponent';


function App() {
  return (
    <div>
      <Router>
      <HeaderComponent/>
          
            <div className="container">
              <Switch>
                <Route path="/hotels" exact component={ListHotelsComponent}></Route>
                <Route path="/hotel-add/:id" component={CreateHotelComponent}></Route>
                <Route path="/hotel-view/:id" component={ViewHotelComponent}></Route>
                <Route path="/tours" component={ListToursComponent}></Route>
                <Route path="/tour-add/:id" component={CreateTourComponent}></Route>
                <Route path="/tour-view/:id" component={ViewTourComponent}></Route>
                <Route path="/priceLists" component={ListPriceListComponent}></Route>
                <Route path="/priceList-add/:id" component={CreatePriceListComponent}></Route>
                <Route path="/priceList-view/:id" component={ViewPriceListComponent}></Route>
                <Route path="/tour-detail-view/:id" component={DetailComponent}></Route>
                <Route path="/tour-list-view" component={ListComponent}></Route>
                <Route path="/login" component={Login} ></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/profile" component={Profile}></Route>
                <Route path="/man" component={BoardManager}></Route>
              </Switch>
            </div>
          <FooterComponent/>
      </Router>
    </div>
  );
}

export default App;