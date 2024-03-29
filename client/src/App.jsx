import { useState, useEffect } from 'react'
import './App.css'
import {Route, Routes} from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import PlacesPage from './pages/PlacesPage';
import PlacesFormPage from './pages/PlacesFormPage';
import PlacePage from './pages/PlacePage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage';

axios.defaults.baseURL = import.meta.env.VITE_BASE_API;
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={ <Layout /> }>
          <Route index element={ <IndexPage /> } />
          <Route path='/login' element={ <LoginPage /> } />
          <Route path='/register' element={ <RegisterPage /> } />
          <Route path='/profile' element={ <ProfilePage /> } />  
          <Route path='/profile/places' element={ <PlacesPage /> } />
          <Route path='/profile/places/new' element={ <PlacesFormPage /> } />
          <Route path='/profile/places/:id' element={ <PlacesFormPage /> } />
          <Route path='/place/:id' element={ <PlacePage /> } />
          <Route path='/profile/bookings' element={ <BookingsPage /> } />
          <Route path='/profile/bookings/:id' element={ <BookingPage /> } />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
