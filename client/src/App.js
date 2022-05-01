import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Pages/Home/Home'
import LandingPage from './Pages/Landing/LandingPage'
import Create from './Pages/Create';
function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route exact path={'/'} component={Home} />
    //   </Routes>
    // </BrowserRouter>
    <Router>
      <Switch>
        <Route path='/' exact>
          <LandingPage />
        </Route>
        <Route path="/pokemons" >
          <Home />
        </Route>
        <Route>
          <Create />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
