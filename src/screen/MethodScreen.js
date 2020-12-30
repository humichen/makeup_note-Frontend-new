import React from 'react';
// import { Link } from "react-router-dom";
import Tag from "../components/Tag";
// 上方搜尋列跟新增按鈕
import Detail_top from "../components/Detail_top";
// 方法列表
import MethodList from "../components/MethodList";
import { Header, Footer } from '../components/HeaderFooter';


const MethodScreen = () => {
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