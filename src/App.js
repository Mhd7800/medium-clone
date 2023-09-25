import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from './components/HomePage'

function App() {
  return (
    <Router>
      <Routes>
        <Route 
        path="getting-started" element={<HomePage/>}
        />
      </Routes>
    </Router>
  );
}

export default App;
