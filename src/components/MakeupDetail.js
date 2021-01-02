import React,{ useContext,useEffect,useState} from 'react';
// 美妝彈出視窗(還要放編輯)
import MakeupModal from "./MakeupModal";
import { useHistory } from "react-router-dom";
import { StateContext, DispatchContext } from "../contexts/X-index"
import { actionType,OPEN_Modal_EDIT,MAKEUPS_DETAIL,SERVER_URL,MAKEUPS_REMOVE_ITEM,MAKEUPS_INIT_ITEMS } from "../constants/X-constants"
import axios from "axios";
import img_default from '../img/img_default.png';
import * as QueryString from "query-string";
import { useLocation } from "react-router-dom";
import Cookie from "js-cookie"


const MakeupDetail = ({match}) => {
    //切換頁面
    const history = useHistory();
    //取得dispatch,state的值
    const dispatch = useContext(DispatchContext);
    const state = useContext(StateContext);
    const {makeupsItems} = useContext(StateContext);
    const { userSignin } = useContext(StateContext);
    const { loading, userInfo, error } = userSignin;
    // const [me, setme] = useState(localStorage.getItem("userInfo"))
    const [me, setme] = useState(userInfo)
    
    const location = useLocation();

    const {makeup_detail} = useContext(StateContext);
    const { qty,title,img,time,tag,color_code,note,type,edit_ID} = QueryString.parse(location.search);

    //今天
    var Today=new Date();
    //計算天數相差
    var DateDiff = function (sDate1, sDate2) { // sDate1 和 sDate2 是 2016-06-18 格式
        var oDate1 = new Date(sDate1);
        var oDate2 = new Date(sDate2);
        var iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); // 把相差的毫秒數轉換為天數
        return iDays;
    };
    const makeupId = match.params.id;
    //刪除    
    const removeFromCart = async (_id) => {
        try {
            const id =userInfo._id
            dispatch({ type: MAKEUPS_REMOVE_ITEM, payload: _id });
            const { data } = await axios.delete(`${SERVER_URL}/api/makeups/${_id}`,
            {
                headers: { Authorization: `Bearer ${userInfo.token}` },
                data :{id:id}
            });
            dispatch({ type: MAKEUPS_INIT_ITEMS, payload: data });
            history.push("/Makeup");
        } catch (error) {
            
            if(error.response.status == 401){
                localStorage.removeItem("userInfo");
                dispatch({ type: actionType.USER_LOGOUT });
                history.push("/login");
            }

        }
        
    };

    //編輯
    const editToCart = async (qty,title,img,time,tag,color_code,note,edit_ID) => {
        var tag_array=tag.split(',');
        var color_code="#"+color_code;
        try {
            const id =userInfo._id
            const { data } = await axios.put(SERVER_URL+'/api/makeups/'+edit_ID, {
                title,
                img,
                time,
                tag_array,
                qty,
                color_code,
                note,
                id
            },
            {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });
            dispatch({ type: MAKEUPS_INIT_ITEMS, payload: data });
            const fetchProduct = async () => {
                try {
                    const id =userInfo._id
                    const { data } = await axios.post(`${SERVER_URL}/api/makeups/${makeupId}`,
                    {id},
                    {
                        headers: { Authorization: `Bearer ${userInfo.token}` },
                    });
                    dispatch({ type: MAKEUPS_DETAIL, payload: data });
                }
                catch(error){
                    if(error.response.status == 401){
                        localStorage.removeItem("userInfo");
                        dispatch({ type: actionType.USER_LOGOUT });
                        history.push("/login");
                    }
                }
            };
            fetchProduct();
        } catch (error) {
            if(error.response.status == 401){
                localStorage.removeItem("userInfo");
                dispatch({ type: actionType.USER_LOGOUT });
                history.push("/login");
            }
        }
        
    };

    //找出裡面有選中tag的資料
    const ContainTag = (tag) => {
        history.push("/Makeup"+"?tag_w="+tag+"&type=ContainTag");
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const id =userInfo._id
                const { data } = await axios.post(`${SERVER_URL}/api/makeups/${makeupId}`,
                {id},
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                });
                dispatch({ type: MAKEUPS_DETAIL, payload: data });
            }
            catch(error){
                if(error.response.status == 401){
                    localStorage.removeItem("userInfo");
                    dispatch({ type: actionType.USER_LOGOUT });
                    history.push("/login");
                }
            }
        };
        fetchProduct();
    }, []);
    useEffect(()=>{
        Cookie.set("makeupsItems", JSON.stringify(makeupsItems));
    }, [makeupsItems])

    useEffect(() => {
        //內容一樣就不會刷新
        if(type=="edit_makeup"&&qty&&title&&img&&color_code&&time&&edit_ID){
            editToCart(qty,title,img,time,tag,color_code,note,edit_ID);
        }
    }, [qty,title,img,time,tag,color_code,note,type]);

    return (
        <div className="x-makeup-editpage">
            <div className={DateDiff(Today,makeup_detail.time)<3?"x-makeup-edit-detail x-list-box-expired":"x-makeup-edit-detail"}>
                <div className={DateDiff(Today,makeup_detail.time)<3?"x-expired":"x-expire display-none"}></div>
                <img src={makeup_detail.img!==""?"../../"+makeup_detail.img:img_default} onerror="javascript:this.src='../img/img_default.png'" alt=""/>
                <div className="x-editpage-detail">
                    <div className="x-editpage-detail-title">{makeup_detail.title}</div>
                    <p>保存期限：{makeup_detail.time}</p>
                    <p>色號：{makeup_detail.qty}</p>
                </div>
                <div className="x-method-tag">
                    { makeup_detail.tag_array===undefined? console.log("還沒載入"):makeup_detail.tag_array.map(option => 
                        <button className="x-tag-btn" onClick={()=>ContainTag(option)}>#{option}</button>
                    )}
                </div>
                <button id="x-tooltipmenu" className="fa fa-ellipsis-v"></button>
                <div className="x-tooltip">
                    <button className="x-tooltip-btn" onClick={() => dispatch({ type: OPEN_Modal_EDIT,payload:makeup_detail})}>編輯</button>
                    <hr></hr>
                    <button className="x-tooltip-btn" onClick={() => removeFromCart(makeup_detail._id)}>刪除</button>
                </div>
                <div className="x-makeup-note">
                    <h1>備註</h1>
                    <textarea  id="x-makeup-input" disabled defaultValue={makeup_detail.note}></textarea>
                    <div className="x-method-color " style={{backgroundColor : makeup_detail.color_code}}>
                        <div className="x-method-colourpattern">
                            {makeup_detail.qty}
                        </div>
                    </div>
                </div>
            </div>
            <MakeupModal />
        </div>
    );
}

export default MakeupDetail;