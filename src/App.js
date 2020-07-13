import React from 'react';
import Nav from './Components/Nav/Nav';
import routes from './routes';
import './App.css';

const App = props => {
  return (
    <div className="App">
      <Nav />
      {routes}
    </div>
  );
}

export default App;
