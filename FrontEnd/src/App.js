import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route ,Switch  } from 'react-router-dom';


///boostrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/src/jquery';
import 'bootstrap/dist/js/bootstrap';

import Home from './comp/home';
import Dashbaord from './comp/Dashboard1';
import Login from './comp/Login';
import Register from './comp/Register';
import Tasks from './comp/Tasks'


function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/Dashboard' element={<Dashbaord />} />
              <Route path='/Login' element={<Login />} />
              <Route path='/Register' element={<Register />} />
              <Route path='/board/:id' element={<Tasks />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
