import React from 'react';
import '../css/normalize.css';
import '../css/indexstyle.css';
import '../css/headerfooter.css';
import { Headerbefore, Footerbefore } from '../components/HeaderFooter'
import { Link } from 'react-router-dom';

import img_indexpic from '../img/img_indexpic.png'
import img_makeup from '../img/img_makeup.png'
import img_matain from '../img/img_matain.png'
import img_girl from '../img/img_girl.png'
import img_girl2 from '../img/img_girl2.png'

function HomeScreen() {
  return (
    <div className="App">
      <Headerbefore />
      <div className="h-main">
        <div className="h-banner">
          <div className="h-slognlayout">
            <div className="h-slogn">管理美妝的絕佳平台</div>
            <Link to="/Signup" className="h-signup">開始使用</Link>
          </div>
        </div>
        <div className="h-intro" id="intro">
          <div className="h-intro-title">平台簡介</div>
          <div className="h-intro-content-layout">
            <div className="h-intro-content">美妝筆記本提供美妝管理、方法管理功能，協助愛美的妳更快速更方便管理化妝品和保養品以及收藏網路上分享的化妝、保養方式，讓你輕鬆變美麗！</div>
            <img src={img_indexpic} />
          </div>
        </div>
        <div className="h-makeupbox">
          <img src={img_makeup} />
          <div className="h-makeup-layout">
            <div className="h-makeup-title">化妝品管理功能</div>
            <div className="h-makeup-content">協助你更快了解目前自己擁有多少化妝品、保養品以及在快過期時發送通知給你，另外我們還提供了色號卡的功能，無論在何處你都可以掌握已有的化妝品色號，讓被欲望沖昏頭的你控制自己購物的衝動。</div>
          </div>
        </div>
        <div className="h-matainbox">
          <div className="h-matain-layout">
            <div className="h-matain-title">方法管理功能</div>
            <div className="h-matain-content">提供一個龐大空間讓你儲存網路上分享的美妝及保養方式，並透過標籤功能幫你分類，讓你不用再東翻西找，創建專屬自己的美容百科全書。</div>
          </div>
          <img src={img_matain} />
        </div>
        <div className="h-about" id="about">
          <div className="h-about-title">關於我們</div>
          <div className="h-about-content-layout">
            <div className="h-about-content">由兩個喜歡粉色的人組成，網站的各項功能皆由我們精心設計，希望這個美妝筆記本可以讓大家更方便的管理自己的化妝品！</div>
            <div className="h-aboutimg">
              <img src={img_girl} />
              <img src={img_girl2} />
            </div>
          </div>
        </div>
      </div>
      <Footerbefore />
    </div>
  );
}

export default HomeScreen;
