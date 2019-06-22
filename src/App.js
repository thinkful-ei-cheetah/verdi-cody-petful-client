import React from 'react';
import './App.css';
import { Link, Switch, Route } from 'react-router-dom';
import HomePage from './routes/HomePage/HomePage'
import AdoptionsPage from './routes/AdoptionsPage/AdoptionsPage'
import NotFoundPage from './routes/NotFoundPage/NotFoundPage'

class App extends React.Component {
  state = {

  }

  render() {
    return (
      <div className="app">
        <header role='banner'>
          <nav role='navigation'>
            <Link to='/'>AdoptMe!</Link>
          </nav>
        </header>
        <main role='main'>
          <Switch>
            <Route exact path='/' component={HomePage}></Route>
            <Route path='/adoptions' component={AdoptionsPage}></Route>
            <Route component={NotFoundPage}></Route>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
