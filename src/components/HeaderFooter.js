import React, {useContext } from 'react';
// import Cookie from "js-cookie";
import '../css/normalize.css';
import '../css/indexstyle.css';
import '../css/headerfooter.css';
import { Link } from 'react-router-dom';
import { StateContext, DispatchContext } from "../contexts/X-index";
import {actionType} from "../constants/X-constants";

import icon_expandarrow from '../img/icon_expandarrow.png'
import img_user from '../img/img_user.png'

export function Headerbefore() {
  return (
    <div className="navbox">
      <div className="nav-logo" id="nav-logo">
        <a href='#nav-logo' className="nav-logo-text">美妝筆記本</a>
      </div>
      <nav className="nav-layout">
        <div className="navlist">
          <a href='#intro' className="navlist-item">平台簡介</a>
          <a href='#about' className="navlist-item">關於我們</a>
        </div>
        <Link to='/Login' className="h-login-button">登入</Link>
      </nav>
    </div>
  );
}
export function Footerbefore() {
  return (
    <div className="footerbox">
      <div className="h-decorate-pink"></div>
      <div className="footer-layout">
        <div className="footerlist-layout">
          <div className="footerlist">
            <Link to='/' className="footer-logo">美妝筆記本</Link>
            <a href='#intro' className="footerlist-item">平台簡介</a>
            <a href='#about' className="footerlist-item">關於我們</a>
          </div>
          <div className="footercopyright">&copy; 美妝筆記本 陳鈺文 李淯萱 2021</div>
        </div>

      </div>
    </div>
  );
}
export function Headerlogin() {
  return (
    <div className="navbox">
      <div className="nav-logo">
        <Link to='/' className="nav-logo-text">美妝筆記本</Link>
      </div>
      <nav className="nav-login-layout">
        <Link to='/' className="h-login-button">返回</Link>
      </nav>
    </div>
  );
}
export function Header() {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const { userSignin: {userInfo} } = state;
  // const [me, setme] = useState(JSON.parse(localStorage.getItem("userInfo")))
  // console.log(me)

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch({ type: actionType.USER_LOGOUT });
    // props.history.push("/");
  }
  return (
    <div className="navbox">
      <div className="nav-logo">
        <Link to='/Welcome' className="nav-logo-text">美妝筆記本</Link>
      </div>
      <nav className="nav-layout">
        <div className="navlist">
          <Link to='/Makeup' className="navlist-item">美妝管理</Link>
          <Link to='/Method' className="navlist-item">方法管理</Link>
        </div>
        <button className="nav-userbox">
          <img src={img_user} width="34" height="34" />
          <div className="nav-userbox-title">{userInfo.name}</div>
          <img src={icon_expandarrow} width="14" height="14" />
        </button>
        <div className="nav-droparea">
          <Link to="/Accountsettings" className="nav-setting">帳戶管理</Link>
          <Link to="/" className="nav-logout" onClick={handleLogout}>登出</Link>
        </div>
      </nav>
    </div>
  );
}
export function Footer() {
  return (
    <div className="footerbox">
      <div className="h-decorate-pink"></div>
      <div className="footer-layout">
        <div className="footerlist-layout">
          <div className="footerlist">
            <Link to='/' className="footer-logo">美妝筆記本</Link>
            <Link to='/Makeup' className="footerlist-item">美妝管理</Link>
            <Link to='/Method' className="footerlist-item">方法管理</Link>
          </div>
          <div className="footercopyright">&copy; 美妝筆記本 陳鈺文 李淯萱 2021</div>
        </div>

      </div>
    </div>
  );
}