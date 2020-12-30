import React from 'react';
// import { Link } from "react-router-dom";
// 方法列表(每個)
import MethodListBox from "../components/MethodListBox";
import MethodModal from "../components/MethodModal";

const MethodList = () => {
    return (
        // <!-- 方法管理 -->
        <ul className="x-method">
            <MethodListBox />
            <MethodModal />
        </ul>
    );
}
export default MethodList;