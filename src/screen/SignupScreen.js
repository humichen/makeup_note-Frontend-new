import React, { useEffect, useState, useContext} from 'react';
import * as QueryString from "query-string";
import Cookie from "js-cookie";
import '../css/normalize.css';
import '../css/headerfooter.css';
import '../css/loginsignupstyle.css';
import { Headerlogin } from '../components/HeaderFooter';
import { Link } from 'react-router-dom';
import { StateContext, DispatchContext } from "../contexts/X-index";
import {actionType,SERVER_URL} from "../constants/X-constants";
import axios from "axios";

import medata from '../json/user_data.json'

function SignupScreen(props) {
  const [me, setme] = useState(medata)
  console.log(me)

  const { userSignin } = useContext(StateContext);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useContext(DispatchContext);
  const { redirect } = QueryString.parse(props.location.search);
  const submitHandler = async (e) => {
    e.preventDefault();
    if(me.email==""||me.day=="日"||me.day==""||me.month=="月"||me.month==""||me.password==""||me.sex=="請選擇"||me.sex==""||me.username==""||me.year=="年"||me.year==""){
      alert("欄位不可空白")
    }else{
      const name = me.username;
      const email = me.email;
      const password =me.password;
      const year=me.year;
      const month=me.month;
      const day=me.day;
      const sex=me.sex;
      dispatch({ type: actionType.USER_SIGNIN_SUCCESS, payload: {me} });
      try {
        const { data } = await axios.post(SERVER_URL+'/api/users/register', {
           name,
           email,
           password,
           year,
           month,
           day,
           sex,
        });
        dispatch({ type: actionType.USER_REGISTER_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));

        Cookie.set("userInfo", JSON.stringify(me));//要刪

        window.location.pathname="/Welcome";
      } catch (error) {
        dispatch({
          type: actionType.USER_REGISTER_FAIL,
          payload: error.message,
        });
      }
      
     
    }
    
    console.log("success")
  }
  var A=[];
  var B=[];
  var C=[];
  for (let i = 2020; i >=1920; i--) {
    A.push(i)  
  }
  for (let i = 1; i <=12; i++) {
    B.push(i)  
  }
  for (let i = 1; i <=31; i++) {
    C.push(i)  
  }
  console.log(B)
  console.log(C)


  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  return (
    <div className="App">
      <Headerlogin />
      <div className="h-main">
        <div className="h-login-title">註冊</div>
        <div className="h-asking-layout">
          <div className="h-asking-content">已經擁有帳戶？</div>
          <Link to="/Login" className="h-asking-textbtn">點此登入</Link>
        </div>
        <div className="h-signinbox">
          <div className="h-signin-contentarea">
            <div className="h-userbox">
              <label for="username" className="h-inputlabel">使用者姓名</label>
              <input id="username" type="text" className="h-input" onChange={(username) => setme({ ...me, username: username.target.value })} />
            </div>
            <div className="h-s-emailbox">
              <label for="email" className="h-inputlabel">電子信箱</label>
              <input id="email" type="text" className="h-input" onChange={(email) => setme({ ...me, email: email.target.value })} />
            </div>
            <div className="h-s-passwordbox">
              <label for="password" className="h-inputlabel">設定密碼</label>
              <input id="password" type="password" className="h-input" onChange={(password) => setme({ ...me, password: password.target.value })} />
            </div>
            <div className="h-birthbox">
              <div className="h-birthday-title">生日</div>
              <div className="h-birthdayselect-box">
                <select className="h-select" id="year" onChange={(year) => setme({ ...me, year: parseInt(year.target.value) })}>
                  <option value="0">年</option>
                  {
                    A.map(ma=><option value={ma} key={ma}>{ma}</option>)
                  }
                </select>
                <select className="h-select" id="month" onChange={(month) => setme({ ...me, month: parseInt(month.target.value) })}>
                  <option value="0">月</option>
                  {
                    B.map(ma=><option value={ma} key={ma}>{ma}</option>)
                  }
                </select>
                <select className="h-select" id="day" onChange={(day) => setme({ ...me, day: parseInt(day.target.value) })}>
                  <option value="0">日</option>
                  {
                    C.map(ma=><option value={ma} key={ma}>{ma}</option>)
                  }
                </select>
                {/* <input type="text" placeholder="西元年" className="h-yearinput" id="year" /> */}
                {/* <input type="text" placeholder="月" className="h-yearinput" id="month" /> */}
                {/* <input type="text" placeholder="日" className="h-yearinput" id="date" /> */}
              </div>
            </div>
            <div className="h-sexbox">
              <div className="h-sex-title">性別</div>
              <select className="h-select" id="sex" onChange={(sex) => setme({ ...me, sex:sex.target.value})}>
                <option>請選擇</option>
                <option>女</option>
                <option>男</option>
                <option>不願透露</option>
              </select>
            </div>
            <div className="h-loginbox">
              <Link to="/Welcome" onClick={submitHandler} className="h-signup-fillbtn">註冊</Link>
            </div>
          </div>
          <div className="h-socialbox">
            <Link to="#" className="h-googlebox">
              <div className="h-googleimg"></div>
              <div className="h-googlecontent">Sign up with Google</div>
            </Link>
            <Link to="#" className="h-fbbox">
              <div className="h-fbimg"></div>
              <div className="h-fbcontent">Sign up with Facebook</div>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupScreen;
