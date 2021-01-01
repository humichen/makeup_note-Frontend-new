import React, { useEffect, useState, useContext } from 'react';
import * as QueryString from "query-string";
import Cookie from "js-cookie";
import '../css/normalize.css';
import '../css/headerfooter.css';
import '../css/loginsignupstyle.css'
import { Headerlogin } from '../components/HeaderFooter'
import { Link } from 'react-router-dom';
import { StateContext, DispatchContext } from "../contexts/X-index";
import {actionType,SERVER_URL} from "../constants/X-constants";
import axios from "axios";

function LoginScreen(props) {
  // const [me, setme] = useState(Cookie.getJSON("userInfo"))
  const [email, setemail] = useState("")
  const [password, setpsw] = useState("")

  const { userSignin } = useContext(StateContext);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useContext(DispatchContext);
  const { redirect } = QueryString.parse(props.location.search);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (email == "") {
      alert("電子信箱不可為空")
    } else if (password == "") {
      alert("密碼不可為空")
    } else {
      // if (email === me.email) {
      //   if (password === me.password) {
      //     window.location.pathname = "/Welcome";
      //   } else {
      //     alert("密碼錯誤")
      //   }
      // }
      // else {
      //   alert("此帳戶不存在")
      // }
      dispatch({
        type: actionType.USER_SIGNIN_REQUEST,
        payload: { email, password },
      });
      try {
        const { data } = await axios.post(SERVER_URL+"/api/users/signin", {
          email,
          password,
        });
        dispatch({ type: actionType.USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
        props.history.push("/Welcome");
        console.log("success")
      } catch (error) {
        dispatch({
          type: actionType.USER_SIGNIN_FAIL,
          payload: error.message,
        });
        if(error.response.status == 401){
          localStorage.removeItem("userInfo");
          alert("帳號或密碼錯誤");
        }
      }
    }
  }

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
        <div className="h-login-title">登入</div>
        <div className="h-asking-layout">
          <div className="h-asking-content">還沒有帳戶嗎？</div>
          <Link to="/Signup" className="h-asking-textbtn">點此註冊</Link>
        </div>
        <div className="h-signinbox">
          <div className="h-signin-contentarea">
            <div className="h-emailbox">
              <label for="email" className="h-inputlabel">電子信箱</label>
              <input id="email" type="email" className="h-input" onChange={(email) => setemail(email.target.value)} />
            </div>
            <div className="h-passwordbox">
              <label for="password" className="h-inputlabel">密碼</label>
              <input id="password" type="password" className="h-input" onChange={(password) => setpsw(password.target.value)} />
            </div>
            <div className="h-featurebox">
              <div>
                <input type="checkbox" id="remember" className="h-remember-checkbox" /><label for="remember">記住我</label>
              </div>
              <Link to="#" className="h-forgetpassword">忘記密碼?</Link>
            </div>
            <div className="h-loginbox">
              <Link to="/Welcome" onClick={submitHandler} className="h-login-fillbtn">登入</Link>
            </div>
          </div>
          <div className="h-socialbox">
            <Link to="#" className="h-googlebox">
              <div className="h-googleimg"></div>
              <div className="h-googlecontent">Log in with Google</div>
            </Link>
            <Link to="#" className="h-fbbox">
              <div className="h-fbimg"></div>
              <div className="h-fbcontent">Log in with Facebook</div>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
