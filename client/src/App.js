import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Pages/Home/Home'
import LandingPage from './Pages/Landing/LandingPage'
import Form from './components/Form';
import Details from './components/Details';
import { Navbar } from './components/NavBar';
function App() {


  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/pokemons' component={Home} />
        <Route path='/create' component={Form} />
        <Route path='/pokemons/:id' component={Details} />
      </Switch>
    </Router>
  );
}
export default App;
