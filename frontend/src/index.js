import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Landing,Contact,Login,Register,Links,Profile,AutoJournals} from './components/component-service'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import UserProvider from './auth/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>   
          <Route index element={<Landing />} ></Route>   
          <Route path="contact" element={<Contact />}></Route>  
          <Route path="register" element={<Register />}></Route>  
          <Route path="login" element={<Login />}></Route>  
          <Route path="links" element={<Links />}></Route>  
          <Route path="profile" element={<Profile />}></Route>  
          <Route path="autojournal" element={<AutoJournals />}></Route>  
        </Route>          
      </Routes>
    </BrowserRouter>
  </UserProvider>
);
