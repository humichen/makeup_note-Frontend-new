import React, { useReducer } from 'react';
import { Route, Switch } from "react-router-dom";
import Tag from "../components/Tag";
// 上方搜尋列跟新增按鈕
import Detail_top from "../components/Detail_top";
// 美妝品列表
import MakeupList from "../components/MakeupList";
// 美妝品詳細葉面
import MakeupDetail from "../components/MakeupDetail";
import { Header, Footer } from '../components/HeaderFooter';



const MakeupScreen = () => {
    return (
        <div>
            <Header />
            <Detail_top />
            <div className="x-detail">
                <Tag />
                {/* 分隔線 */}
                {/* <div className="x-divider"></div> */}
                <hr></hr>
                <Switch>
                    <Route path='/Makeup/detail/:id' component={MakeupDetail}/>
                    <Route path='/Makeup' component={MakeupList}/>
                </Switch>
            </div>
            <Footer />
        </div>
    );
}
export default MakeupScreen;