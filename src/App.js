import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
  componentWillMount() {
  // Initialize Firebase
  const config = {
      apiKey: 'AIzaSyDlXdF9u36KId82iHH-vA5eufkFKFaGpeo',
      authDomain: 'instaclone-99a11.firebaseapp.com',
      databaseURL: 'https://instaclone-99a11.firebaseio.com',
      storageBucket: 'instaclone-99a11.appspot.com',
      messagingSenderId: '687863757687'
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
