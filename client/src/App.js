import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/home'

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route exact path={'/'} component={Home} />
    //   </Routes>
    // </BrowserRouter>
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
