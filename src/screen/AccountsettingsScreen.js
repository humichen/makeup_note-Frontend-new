import React, { useEffect, useState, useContext } from 'react';
import * as QueryString from "query-string";
import Cookie, { set } from "js-cookie";
import '../css/normalize.css';
import '../css/accountstyle.css';
import '../css/headerfooter.css';
import { Header, Footer } from '../components/HeaderFooter'
import { Link } from 'react-router-dom';
import { StateContext, DispatchContext } from "../contexts/X-index";
import { actionType } from "../constants/X-constants";

import img_user_L from '../img/img_user_L.png'
import icon_google from '../img/icon_google.png'
import icon_facebook_blue from '../img/icon_facebook_blue.png'

function AccountsettingsScreen() {
  const [me, setme] = useState(Cookie.getJSON("userInfo"))
  const [me2, setme2] = useState(me)
  console.log(me)
  const [option1, setoption1] = useState("")
  const [option2, setoption2] = useState("")
  const [option3, setoption3] = useState("")
  const [disable, setdisable] = useState(true)
  const [disable2, setdisable2] = useState(true)
  const [infrosave, setinfrosave] = useState("修改基本資料")
  const [pswsave, setpswsave] = useState("修改密碼")
  useEffect(() => {
    if (me.sex === "男") {
      setoption1("男")
      setoption2("女")
      setoption3("不願透露")
    } else if (me.sex === "女") {
      setoption1("女")
      setoption2("男")
      setoption3("不願透露")
    } else if (me.sex === "不願透露") {
      setoption1("不願透露")
      setoption2("女")
      setoption3("男")
    }
    setme2(Cookie.getJSON("userInfo"));
  }, [])


  return (
    <div className="App">
      <Header />
      <div className="h-main-setting">
        <div className="h-userleft-area">
          <img src={img_user_L} />
          <div className="h-userleft-title">{me2.username}</div>
          <div className="h-userleft-email">{me.email}</div>
          <Link to="/" className="h-logout-fillbtn">登出</Link>
        </div>
        <div className="h-userright-area">
          <div className="h-userinfrobox">
            <div className="h-userinfro-title-box">
              <div className="h-userinfro-title">基本資料</div>
              <button className="h-userinfro-changebtn" onClick={() => {
                setdisable(!disable);
                if (disable) {
                  setinfrosave("儲存")
                  // Cookie.set("userInfo", JSON.stringify(me));
                } else {
                  setinfrosave("修改基本資料")
                  Cookie.set("userInfo", JSON.stringify(me));
                  window.location.pathname="/Accountsettings";
                }
              }}
              >{infrosave}</button>
            </div>
            <div className="h-userinfro-layout">
              <div className="h-userinfro-answer-layout">
                <div className="h-userinfro-name-layout">
                  <div className="h-userinfro-name-title">姓名</div>
                  <input value={me.username} className="h-userinfro-name" id="h-userinfro-name" disabled={disable} onChange={(username) => setme({ ...me, username: username.target.value })} />
                </div>
                <div className="h-shorthr"></div>
                <div className="h-userinfro-birth-layout">
                  <div className="h-userinfro-birth-title">生日</div>
                  <input value={me.year + "/" + me.month + "/" + me.day} className="h-userinfro-birth" id="h-userinfro-birth" disabled={disable} onChange={
                    (birthday) => {
                      var birthA=birthday.target.value.split("/")
                      setme({ ...me, year:birthA[0],month:birthA[1],day:birthA[2]})
                    }}/>
                </div>
                <div className="h-shorthr"></div>
                <div className="h-userinfro-sex-layout">
                  <div className="h-userinfro-sex-title">性別</div>
                  <select className="h-userinfro-sex" id="h-userinfro-sex" disabled={disable} onChange={(sex) => setme({ ...me, sex: sex.target.value })}>
                    <option>{option1}</option>
                    <option>{option2}</option>
                    <option>{option3}</option>
                  </select>
                </div>
              </div>
              <img src={img_user_L} />
            </div>
          </div>
          <div className="h-accountinfrobox">
            <div className="h-accountinfro-title-box">
              <div className="h-accountinfro-title">帳戶資訊</div>
            </div>
            <div className="h-accountinfro-layout">
              <div className="h-accountinfro-answer-layout">
                <div className="h-accountinfro-email-layout">
                  <div className="h-accountinfro-email-title">電子信箱</div>
                  <div className="h-accountinfro-email">{me.email}</div>
                </div>
                <div className="h-longhr"></div>
                <div className="h-accountinfro-password-layout">
                  <div className="h-accountinfro-passwordbox-layout">
                    <div className="h-accountinfro-password-title">密碼</div>
                    <input type="password" value={me.password} className="h-accountinfro-password" disabled={disable2} onChange={(password) => setme({ ...me, password: password.target.value })} />
                  </div>
                  <button className="h-accountinfro-changebtn" onClick={() => {
                    setdisable2(!disable2);
                    if (disable2) {
                      setpswsave("儲存")
                    } else {
                      setpswsave("修改密碼")
                      Cookie.set("userInfo", JSON.stringify(me));
                    }
                  }} >{pswsave}</button>
                </div>
              </div>
            </div>
          </div>
          <div className="h-accountinfrobox">
            <div className="h-accountinfro-title-box">
              <div className="h-accountinfro-title">社群帳戶連接</div>
            </div>
            <div className="h-socialinfro-layout">
              <div className="h-socialinfro-answer-layout">
                <div className="h-socialinfro-google-layout">
                  <div className="h-socialinfro-googlebox-layout">
                    <img src={icon_google} />
                    <div className="h-socialinfro-google">Google Account</div>
                  </div>
                  <button className="h-socialinfro-changebtn">連結</button>
                </div>
                <div className="h-longhr"></div>
                <div className="h-socialinfro-fb-layout">
                  <div className="h-socialinfro-fbbox-layout">
                    <img src={icon_facebook_blue} />
                    <div className="h-socialinfro-fb">Facebook Account</div>
                  </div>
                  <button className="h-socialinfro-changebtn">連結</button>
                </div>
              </div>
            </div>
          </div>
          <div className="h-warninginfrobox">
            <div className="h-warninginfro-title-box">
              <div className="h-warninginfro-title">推播通知</div>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="h-warninginfro-layout">
              ＊在美妝品到期前30天及前15天會發送推播通知
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default AccountsettingsScreen;
