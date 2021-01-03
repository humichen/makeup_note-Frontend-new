import React,{ useContext } from 'react';
// import { Link } from "react-router-dom";
import { StateContext} from "../contexts/X-index";
import Tag from "../components/Tag";
// 上方搜尋列跟新增按鈕
import Detail_top from "../components/Detail_top";
// 方法列表
import MethodList from "../components/MethodList";
import { Header, Footer } from '../components/HeaderFooter';


const MethodScreen = (props) => {
    const { userSignin } = useContext(StateContext);
    const { loading, userInfo, error } = userSignin;
    if(userInfo===""){
      props.history.push("/Login");
    }
    return (
        <div>
            <Header/>
            <Detail_top />
            <div className="x-detail">
                <Tag />
                {/* 分隔線 */}
                {/* <div class="x-divider"></div> */}
                <hr></hr>
                <MethodList />
            </div>
            <Footer/>
        </div>
    );
}
export default MethodScreen;