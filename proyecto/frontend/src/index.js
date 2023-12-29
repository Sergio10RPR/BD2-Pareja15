import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {Login} from './components/login/login'
import {Form} from './components/form/form'
import reportWebVitals from './reportWebVitals';
import { NavBar } from './components/navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/home/home';
import { Profile } from './components/profile/profile';
import { CalendarUser } from './components/calendar/calendar';
import { Event} from './components/eventsUser/event'
import { Buy } from './components/record/buy';
import { UserBuy } from './components/record/userbuy';
import { SeatPage } from './components/seat/seatpage';
import { UsersRegisters } from './components/user_register/user_register'
import { AuditRecord } from './components/record/audit'
import { SearchEvent } from './components/searchevent/searchevent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Form></Form>}></Route>
      <Route exact path='/login' element={<Login></Login>}></Route>
      <Route exact path='/navbar' element={<NavBar></NavBar>}></Route>
      <Route exact path='/home' element={<Home></Home>}></Route>
      <Route exact path='/calendarUser' element={<CalendarUser></CalendarUser>}></Route>
      <Route exact path='/profile' element={<Profile></Profile>}></Route>
      <Route exact path='/events' element={<Event></Event>}></Route>
      <Route exact path='/form' element={<Form></Form>}></Route>
      <Route exact path='/buy' element={<Buy></Buy>}></Route>
      <Route exact path='/userbuy' element={<UserBuy></UserBuy>}></Route>
      <Route exact path='/seat' element={<SeatPage></SeatPage>}></Route>
      <Route exact path='/usersregisters' element={<UsersRegisters></UsersRegisters>}></Route>
      <Route exact path='/AuditRecord' element={<AuditRecord></AuditRecord>}></Route>
      <Route exact path='/searchevent' element={<SearchEvent></SearchEvent>}></Route>
    </Routes>
    </BrowserRouter>

   
    
        
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
