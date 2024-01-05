import './App.css';

import Header from './components/Header';
import Main from './components/main';
import React from 'react';

//  importing css 
import "./css/header.css"
import "./css/main.css"

// import mobile  css 

import "./mobileResponsive/Header.css"
import "./mobileResponsive/Main.css"
function App() {

  return (
    <div>
      <Header/>
      <Main/>
     
    </div>
  );
}

export default App;
