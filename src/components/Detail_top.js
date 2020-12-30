import React, { useContext } from 'react';
import { OPEN_Modal } from '../constants/X-constants';
import { DispatchContext } from "../contexts/X-index";
import { Link } from 'react-router-dom';

    


const Detail_top = () => {
    const dispatch = useContext(DispatchContext);
    let href=window.location.href;
    // console.log(href.match('detail')!=null);
    return (
        // <!-- 搜尋和新增 -->
        <div className="x-detail-top">
            <div className="x-search-box x-dib">
                <input type="search" placeholder="搜尋" id="x-search-bar"/>
                <span className="x-search-icon"><i className="fa fa-search"></i></span>
            </div>
            <div className="x-pinkbtn x-dib" onClick={() => dispatch({type: OPEN_Modal})}>新增</div>
            {href.match('detail')!=null?<Link to='/Makeup' className="x-pinkbtn x-dib">返回</Link>:""}
        </div>
    );
}

export default Detail_top;