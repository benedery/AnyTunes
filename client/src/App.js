import React from 'react';
import './App.css';
import { Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import ResultsList from "./components/ResultsList";
import FullResultItem from "./components/FullResultItem";
import Header from './components/Header.js'
import Register from './components/Register'
import Login from './components/Login'
import TopTen from './components/TopTen';
import AdminPanel from './components/AdminPanel';

const Routes = () => {
  return (
    <div>
      <Route path="/" component={Login} exact />
      <Route path="/index" component={SearchBar} exact />
      <Route path="/index" component={ResultsList} exact />
      <Route path="/itunes/:id" component={FullResultItem} exact />
      <Route path="/register" component={Register} exact />
      <Route path="/topten" component={TopTen} exact />
      <Route path="/admin" component={AdminPanel} exact />
    </div>
  );
};
const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes />
    </div>
  );
}

export default App
