import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserList from './components/UserList';
import Login from './components/Login';
import Home from './components/Home';
import AddUser from './components/AddUser';
import UpdateUser from './components/UpdateUser';
import ConsumerList from './components/ConsumerList';
import AddConsumer from './components/AddConsumer';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/PrivateRoute';
import { setCurrentUser } from './actions';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer,compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
//set current user
if(localStorage.jwtToken){
  //set token header
  setAuthToken(localStorage.jwtToken);
  const jwtDecoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecoded));
}
class App extends Component {
  render() {
    return (
     <Provider store={store}>
       <Router>
         <section>
           <Navbar />
           <Switch>
             <PrivateRoute exact path="/" component={Home}/>
             <PrivateRoute exact path="/users" component={UserList}/>
             <PrivateRoute exact path="/adduser" component={AddUser}/>
             <PrivateRoute exact path="/update/:id" component={UpdateUser}/>
             <PrivateRoute exact path="/consumers" component={ConsumerList}/>
             <PrivateRoute exact path="/addconsumer" component={AddConsumer}/>
             <Route exact path="/login" component={Login}/>
           </Switch>
         </section>
       </Router>
     </Provider>
    );
  }
}

export default App;
