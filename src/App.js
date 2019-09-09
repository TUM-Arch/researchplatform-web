import React from 'react';
import MainPage from './components/MainPage';
import ErrorPage from './components/ErrorPage';
import LoginPage from './components/LoginPage';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route exact path="/" component= { LoginPage } />
      <Route path="/main" component= { MainPage }/>
      <Route path="/error" component= { ErrorPage }/>
      <Route path="/login" component= { LoginPage }/>
    </Router>
  );
}

export default App;
