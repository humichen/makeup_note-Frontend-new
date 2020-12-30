import React,{ useContext,useEffect} from 'react';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import * as QueryString from "query-string";
import Cookie from "js-cookie"
import { StateContext, DispatchContext } from "../contexts/X-index"
import { MAKEUPS_INIT_ITEMS,MAKEUPS_ADD_ITEM,MAKEUPS_REMOVE_ITEM,OPEN_Modal_EDIT,MAKEUPS_EDIT_ITEM,SERVER_URL,MAKEUPS_DETAIL} from "../constants/X-constants"
import axios from "axios";


const MakeupListBox = () => {
    //取得dispatch,state的值
    const dispatch = useContext(DispatchContext);
    const {makeupsItems} = useContext(StateContext);
    const location = useLocation();
    const { qty,title,img,time,tag,color_code,note,type,edit_ID} = QueryString.parse(location.search);
    //新增
    const addToCart = async (qty,title,img,time,tag,color_code,note) => {
        var tag_array=tag.split(',');
        var color_code="#"+color_code;
        const { data } = await axios.post(SERVER_URL+'/api/makeups/addmakeups', {
            title,
            img,
            time,
            tag_array,
            qty,
            color_code,
            note
          });
        dispatch({ type: MAKEUPS_INIT_ITEMS, payload: data });
        // const addToCart = (qty,title,img,time,tag,color_code,note) => {
        // console.log(tag);
        // console.log(note);

        // if(makeupsItems.length==0){
        //     dispatch({
        //         type: MAKEUPS_ADD_ITEM,
        //         payload: {
        //           _id: "1",
        //           title: title,
        //           img: img,
        //           time: time,
        //           tag: tag_array,
        //           color: qty,
        //           color_code:"#"+color_code,
        //           note:note
        //         },
        //       });
        // }
        // else{
        //     dispatch({
        //         type: MAKEUPS_ADD_ITEM,
        //         payload: {
        //           _id: (parseInt(makeupsItems[makeupsItems.length-1]._id)+1).toString(),
        //           title: title,
        //           img: img,
        //           time: time,
        //           tag: tag_array,
        //           color: qty,
        //           color_code:"#"+color_code,
        //           note:note
        //         },
        //     });
        // }
    };
    //編輯
    const editToCart = async (qty,title,img,time,tag,color_code,note,edit_ID) => {
        var tag_array=tag.split(',');
        var color_code="#"+color_code;
        const { data } = await axios.put(SERVER_URL+'/api/makeups/'+edit_ID, {
            title,
            img,
            time,
            tag_array,
            qty,
            color_code,
            note
          });
        dispatch({ type: MAKEUPS_INIT_ITEMS, payload: data });
        // dispatch({
        //     type: MAKEUPS_EDIT_ITEM,
        //     payload: {
        //         _id: edit_ID,
        //         title: title,
        //         img: img,
        //         time: time,
        //         tag: tag_array,
        //         color: qty,
        //         color_code:"#"+color_code,
        //         note:note
        //     },
        // });
    };
    //刪除    
    const removeFromCart = async (_id) => {
        dispatch({ type: MAKEUPS_REMOVE_ITEM, payload: _id });
        const { data } = await axios.delete(`${SERVER_URL}/api/makeups/${_id}`);
        dispatch({ type: MAKEUPS_INIT_ITEMS, payload: data });
    };
    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`${SERVER_URL}/api/makeups/`)
            dispatch({ type: MAKEUPS_INIT_ITEMS, payload: data });
            // if(Cookie.getJSON("makeupsItems")==null){
            //     Cookie.set("makeupsItems", JSON.stringify(makeupsItems));
            // }
            // else{
            //     dispatch({ type: MAKEUPS_INIT_ITEMS, payload: Cookie.getJSON("makeupsItems") });
            // }
            // );
        };
        fetchProduct();
        dispatch({ type: MAKEUPS_DETAIL, payload: {title:"",img:"../img/img_default.png"} });
      }, []);

    useEffect(()=>{
          Cookie.set("makeupsItems", JSON.stringify(makeupsItems));
    }, [makeupsItems])

    useEffect(() => {
        //內容一樣就不會刷新
        if(type=="add_makeup"&&qty&&title&&img&&time&&tag&&color_code){
            addToCart(qty,title,img,time,tag,color_code,note);
        }
        else if(type=="edit_makeup"&&qty&&title&&img&&color_code&&time&&edit_ID){
            editToCart(qty,title,img,time,tag,color_code,note,edit_ID);
        }
    }, [qty,title,img,time,tag,color_code,note,type]);
    return (
        <div>
            {makeupsItems.length!=0?
                // <!-- 美妝管理列表 -->
                makeupsItems.map(makeup => (
                        <li className="x-list-box">
                            <div className="x-expired display-none"></div>
                            <img src={"../"+makeup.img} alt=""/>
                            <div className="x-list-detail">
                            <Link to={"/Makeup/detail/"+makeup._id}>
                                <div className="x-list-detail-title">
                                    {makeup.title}
                                </div>
                                <p>保存期限：{makeup.time}</p>
                                <p>色號：{makeup.qty}</p>
                            </Link>
                                <div className="x-list-detail-tag">
                                    {
                                        makeup.tag_array.slice(0, 4).map(tag => ( <button className="x-tag-btn">#{tag}</button> ))
                                    }
                                </div>
                            </div>
                            <div className="x-list-color " style={{backgroundColor : makeup.color_code}}>
                                <div className="x-list-colourpattern">
                                    {makeup.qty}
                                </div>
                            </div>
                            <button className="fa fa-ellipsis-v" id="x-tooltipmenu"></button>
                            <div className="x-tooltip">
                                <button className="x-tooltip-btn" onClick={() => dispatch({ type: OPEN_Modal_EDIT,payload:makeup})}>編輯</button>
                                <hr></hr>
                                <button className="x-tooltip-btn" onClick={() => removeFromCart(makeup._id)}>刪除</button>
                            </div>
                        </li>
                )):<div className="x-list-nothing">目前還沒新增任何美妝品喔<br></br>趕快來新增吧！</div>
            }
        </div>
    );
}

export default MakeupListBox;
