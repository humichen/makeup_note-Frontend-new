// import logo from './logo.svg';
// import './App.css';
import React, { useReducer } from 'react';
import './css/x_main.css';
import MakeupScreen from "./screen/MakeupScreen";
import MethodScreen from "./screen/MethodScreen";
import HomeScreen from './screen/HomeScreen';
import LoginScreen from './screen/LoginScreen'
import SignupScreen from './screen/SignupScreen'
import WelcomeScreen from './screen/WelcomeScreen'
import AccountsettingsScreen from './screen/AccountsettingsScreen'
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";


import { StateContext, DispatchContext } from "./contexts/X-index"
import { initialAppState, appReducer } from "./reducer/appReducer"

function App() {
  const [state, dispatch] = useReducer(appReducer, initialAppState)
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route path="/Accountsettings" component={ AccountsettingsScreen} />
              <Route path="/Welcome" component={WelcomeScreen} />
              <Route path="/Login" component={LoginScreen} />
              <Route path="/Signup" component={SignupScreen} />
              <Route path='/Makeup' component={MakeupScreen} />
              <Route path='/Method' component={MethodScreen} />
              <Route path="/" exact={true} component={HomeScreen} />
            </Switch>
          </div>
        </BrowserRouter>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
