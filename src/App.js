import React, {Component} from 'react';
import Movies from './components/moviesComponent';
import NavBar from './components/navbar';
import { Switch, Route, Redirect } from 'react-router-dom';
import Rentals from './components/rentals';
import Customers from './components/customers';
import NotFound from './components/notFound';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import './App.css';

class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <main className='container'>
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/movies/:id" component={MovieForm}/>
            <Route path="/movies" component={Movies} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/customers" component={Customers} />
            <Route path="/not-found" component={NotFound} />
            <Redirect exact from="/" to="/movies" />
            <Redirect to="not-found"/>
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
