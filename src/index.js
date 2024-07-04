import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals.js';
import Menu from "./pages/menu.jsx";
import Login from "./pages/login.jsx";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Router>
<Routes>
    <Route path="/" element={<Login />} />
    <Route path="/menu" element={<Menu />} />
    </Routes>
    </Router>
);

reportWebVitals();