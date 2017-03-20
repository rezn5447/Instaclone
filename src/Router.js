import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Login from './containers/Login';
import UserProfile from './containers/UserProfile';
import GramCreate from './containers/GramCreate';
import Stories from './containers/Stories';


const RouterComponent = () => {
  return (
    <Router>
      <Scene key="auth">
        <Scene key="login" component={Login} hideNavBar />
      </Scene>

      <Scene key="main">
        <Scene
          hideNavBar
          key="userProfile"
          component={UserProfile}
          initial
        />
        <Scene
          hideNavBar
          key="story"
          component={Stories}
        />
        <Scene
          key="gramcreate"
          component={GramCreate}
          title="Take A Gram!"
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
