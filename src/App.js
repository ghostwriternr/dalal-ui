import React from 'react';
import './App.css';
import { Router, Route, Switch} from 'react-router-dom';
import homePage from './components/homePage/homePage';
import history from './history';
import channelPage from './components/channelPage/channelPage';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={homePage} />
          <Route path="/:id" component={channelPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
