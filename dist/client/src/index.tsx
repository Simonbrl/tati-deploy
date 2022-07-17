import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import './style/index.scss';
import Navigation from './components/Navigation';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Listing from './pages/Listing';
import Login from './pages/Login';
import Subscribe from './pages/Subscribe';
import Administration from './pages/Administration';
import Search from './pages/Search';
import Profile from './pages/Profile';
import {CookiesProvider} from 'react-cookie';
import Checkout from './pages/Checkout';


ReactDOM.render(
  <CookiesProvider>
    <Router>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/product/:keyname" element={<Product/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/subscribe" element={<Subscribe/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/profile/:module" element={<Profile/>} />
        <Route path="/category/:keyname" element={<Listing/>} />
        <Route path="/admin" element={<Administration/>} />
        <Route path="/search/:search" element={<Search/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  </CookiesProvider>,
  document.getElementById('root')
);
