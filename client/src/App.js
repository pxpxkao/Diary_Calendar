import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import DiaryRender from './component/Diary/DiaryRender';
import HomePage from './container/HomePage';
import LoginPage from './container/LoginPage';
import RegisterPage from './container/RegisterPage';
import CalendarPage from './container/CalendarPage';
import DiaryPage from './container/DiaryPage';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div className="App">
            <Switch>
              <Route exact path="/app" component={CalendarPage} />
              <Redirect from="/diary/home" to="/diary" />
              <Route exact path="/diary" component={DiaryPage} />
              <Route path="/diary/:id?" component={DiaryRender} />
              <Route exact path="/user/login" component={LoginPage} />
              <Route exact path="/user/register" component={RegisterPage} />
              <Route exact path="/" component={HomePage} />
            </Switch>
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
