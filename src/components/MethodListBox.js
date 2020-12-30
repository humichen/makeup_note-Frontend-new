import React,{ useContext,useEffect} from 'react';
// import { Link } from "react-router-dom";
// import methods from '../json/Method.json';
import { useLocation } from "react-router-dom";
import * as QueryString from "query-string";
import { StateContext, DispatchContext } from "../contexts/X-index"
import { METHODS_ADD_ITEM,METHODS_INIT_ITEMS,METHODS_REMOVE_ITEM,METHODS_EDIT_ITEM,OPEN_Modal_EDIT,SERVER_URL} from "../constants/X-constants"
import Cookie from "js-cookie"
import axios from "axios";

const MethodListBox = () => {
    //取得dispatch,state的值
    const dispatch = useContext(DispatchContext);
    const {methodsItems} = useContext(StateContext);
    const location = useLocation();
    const { title,website,tag,type,edit_ID} = QueryString.parse(location.search);
    //新增
    const addToCart = async (title,website,tag) => {
        var tag_array=tag.split(',');
        const { data } = await axios.post(SERVER_URL+'/api/methods/addmethods', {
            title,
            website,
            tag_array,
          });
        dispatch({ type: METHODS_INIT_ITEMS, payload: data });
        // if(methodsItems.length==0){
        //     dispatch({
        //         type: METHODS_ADD_ITEM,
        //         payload: {
        //             _id: "1",
        //             title: title,
        //             web: website,
        //             tag: tag_array
        //         },
        //       });
        // }
        // else{
        //     dispatch({
        //         type: METHODS_ADD_ITEM,
        //         payload: {
        //             _id: (parseInt(methodsItems[methodsItems.length-1]._id)+1).toString(),
        //             title: title,
        //             web: website,
        //             tag: tag_array
        //         },
        //     });
        // }
    };
    //編輯
    const editToCart = async (title,website,tag,edit_ID) => {
        var tag_array=tag.split(',');
        const { data } = await axios.put(SERVER_URL+'/api/methods/'+edit_ID, {
            title,
            website,
            tag_array,
          });
        dispatch({ type: METHODS_INIT_ITEMS, payload: data });
    };
    //刪除
    const removeFromCart = async (_id) => {
        dispatch({ type: METHODS_REMOVE_ITEM, payload: _id });
        const { data } = await axios.delete(`${SERVER_URL}/api/methods/${_id}`);
        dispatch({ type: METHODS_INIT_ITEMS, payload: data });
    };
    //初始化methodsItems
    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`${SERVER_URL}/api/methods/`)
            dispatch({ type: METHODS_INIT_ITEMS, payload: data });
        };
        fetchProduct();
      }, []);
    //methodsItems有變化時
    useEffect(()=>{
        Cookie.set("methodsItems", JSON.stringify(methodsItems));
    }, [methodsItems])
    useEffect(() => {
        //內容一樣就不會刷新
        if(type=="add_method"&&title&&website&&tag){
            addToCart(title,website,tag);
        }
        else if(type=="edit_method"&&title&&website&&tag&&edit_ID){
            editToCart(title,website,tag,edit_ID);
        }
    }, [title,website,tag,type]);
    return (
        <div>
            {methodsItems.length!=0?
                // <!-- methods方法列表(每個method) -->
                methodsItems.map(method => (
                    <li className="x-method-box">
                        <div className="x-method-detail">
                            <div className="x-method-title">
                                <a href={method.website} target="_blank">{method.title}</a>
                            </div>
                            <div className="x-method-tag">
                                    {
                                    method.tag_array.slice(0, 4).map(tag => ( <button className="x-tag-btn">#{tag}</button> ))
                                    }
                            </div>
                        </div>
                        <button className="fa fa-ellipsis-v" id="x-tooltipmenu"></button>
                        <div className="x-tooltip">
                            <button className="x-tooltip-btn" onClick={() => dispatch({ type: OPEN_Modal_EDIT,payload:method})}>編輯</button>
                            <hr></hr>
                            <button className="x-tooltip-btn" onClick={() => removeFromCart(method._id)}>刪除</button>
                        </div>
                    </li>
            )):<div className="x-list-nothing">目前還沒新增任何方法喔<br></br>趕快來新增吧！</div>
            }
        </div>
    );
}
export default MethodListBox;