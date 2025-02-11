import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './container/layout';
import LeftView from './container/leftview';
import Header from './container/header';
import Homepage from './container/homepage';
import WordLimit from './components/word_limit_textarea';


const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/container/layout" element={<Layout />} />    
      <Route path="/container/leftview" element={<LeftView />} />   
      <Route path="/container/header" element={<Header />} />
      <Route path="/container/homepage" element={<Homepage />} /> 
      <Route path="/components/word_limit_textarea" element={<WordLimit />} />       
      </Routes>
    </Router>
  );
};

export default App;
