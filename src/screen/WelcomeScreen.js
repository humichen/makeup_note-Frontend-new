import React from 'react';
import '../css/normalize.css';
import '../css/welcomestyle.css';
import '../css/headerfooter.css';
import { Header, Footer } from '../components/HeaderFooter'
import { Link } from 'react-router-dom';

import icon_makeup from '../img/icon_makeup.png'
import icon_mantain from '../img/icon_mantain.png'

function HomeScreen() {
  return (
    <div className="App">
      <Header />
      <div className="h-main">
        <div className="h-welcomebg">
          <div className="h-notebookbg">
            <Link to="/Makeup" className="h-funcbtn h-funcbtn-left">
              <img src={icon_makeup} width="128" />
              <div className="h-funcbtn-title">美妝管理</div>
            </Link>
            <Link to="/Method" className="h-funcbtn h-funcbtn-right">
              <img src={icon_mantain} width="128" />
              <div className="h-funcbtn-title">方法管理</div>
            </Link>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomeScreen;
