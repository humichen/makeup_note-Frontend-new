import React,{ useContext,useEffect,useState} from 'react';
import { Link } from "react-router-dom";
import { useLocation,useHistory } from "react-router-dom";
import * as QueryString from "query-string";
import Cookie from "js-cookie"
import { StateContext, DispatchContext } from "../contexts/X-index"
import { actionType,MAKEUPS_INIT_ITEMS,MAKEUPS_ADD_ITEM,MAKEUPS_REMOVE_ITEM,OPEN_Modal_EDIT,MAKEUPS_EDIT_ITEM,SERVER_URL,MAKEUPS_DETAIL} from "../constants/X-constants"
import axios from "axios";


const MakeupListBox = () => {
    //切換頁面
    const history = useHistory();
    //取得dispatch,state的值
    const dispatch = useContext(DispatchContext);
    const {makeupsItems} = useContext(StateContext);
    // const [me, setme] = useState(localStorage.getItem("userInfo"))
    const { userSignin } = useContext(StateContext);
    const { loading, userInfo, error } = userSignin;
    const [me, setme] = useState(userInfo)

    const location = useLocation();
    const { qty,title,img,time,tag,color_code,note,type,edit_ID,tag_w} = QueryString.parse(location.search);
    //新增
    const addToCart = async (qty,title,img,time,tag,color_code,note) => {
        try {
            const id =userInfo._id
            var tag_array=tag.split(',');
            var color_code="#"+color_code;
            const { data } = await axios.post(SERVER_URL+'/api/makeups/addmakeups', 
            {
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
        try {
            var tag_array=tag.split(',');
            var color_code="#"+color_code;
            const id =userInfo._id
            const { data } = await axios.put(SERVER_URL+'/api/makeups/'+edit_ID, 
            {
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
            // console.log("編輯後"+makeupsItems);
        } catch (error) {
            if(error.response.status == 401){
                localStorage.removeItem("userInfo");
                dispatch({ type: actionType.USER_LOGOUT });
                history.push("/login");
            }
        }
        
    };
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
        } catch (error) {
            if(error.response.status == 401){
                localStorage.removeItem("userInfo");
                dispatch({ type: actionType.USER_LOGOUT });
                history.push("/login");
            }
        }
        
    };
    //今天
    var Today=new Date();
    //計算天數相差
    var DateDiff = function (sDate1, sDate2) { // sDate1 和 sDate2 是 2016-06-18 格式
        var oDate1 = new Date(sDate1);
        var oDate2 = new Date(sDate2);
        var iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); // 把相差的毫秒數轉換為天數
        return iDays;
    };
    //找出裡面有選中tag的資料
    const ContainTag = (tag) => {
        history.push("/Makeup"+"?tag_w="+tag+"&type=ContainTag");
    };
    useEffect(() => {
        if(type=="ContainTag"&&tag_w){
            console.log("從詳細頁回來，[type,tag_w]載入")
        }
        else{
            try {
                // console.log("userInfo._id"+userInfo._id+"JSON.parse(me)._id"+JSON.parse(me)._id)
                const id =userInfo._id
                const fetchProduct = async () => {
                    const { data } = await axios.post(`${SERVER_URL}/api/makeups/`,
                    {id},
                    {
                        headers: { Authorization: `Bearer ${userInfo.token}` },
                    })
                    dispatch({ type: MAKEUPS_INIT_ITEMS, payload: data });
                };
                fetchProduct();
                dispatch({ type: MAKEUPS_DETAIL, payload: {title:"",img:"../img/img_default.png"} });
            } catch (error) {
                if(error.response.status == 401){
                    localStorage.removeItem("userInfo");
                    dispatch({ type: actionType.USER_LOGOUT });
                    history.push("/login");
                }
            }
            
        }
        
      }, []);

    useEffect(()=>{
          Cookie.set("makeupsItems", JSON.stringify(makeupsItems));
    }, [makeupsItems])

    useEffect(() => {
        // const id =userInfo._id
        const id =userInfo._id
        //內容一樣就不會刷新
        if(type=="add_makeup"&&qty&&title&&img&&time&&tag&&color_code){
            addToCart(qty,title,img,time,tag,color_code,note);
        }
        else if(type=="edit_makeup"&&qty&&title&&img&&color_code&&time&&edit_ID){
            editToCart(qty,title,img,time,tag,color_code,note,edit_ID);
        }
        else if(type=="ContainTag"&&tag_w){

            try {
                const SearchTag = async () => {
                    const { data } = await axios.post(`${SERVER_URL}/api/makeups/containTag/${tag_w}`,
                    {id},
                    {
                        headers: { Authorization: `Bearer ${userInfo.token}` },
                    })
                    dispatch({ type: MAKEUPS_INIT_ITEMS, payload: data });
                };
                SearchTag();
            } catch (error) {
                if(error.response.status == 401){
                    localStorage.removeItem("userInfo");
                    dispatch({ type: actionType.USER_LOGOUT });
                    history.push("/login");
                }
            }
            
        }
        else{
            // console.log(userInfo.token+"[type,tag_w]"+userInfo._id)
            try {
                const fetchProduct = async () => {
                    const { data } = await axios.post(`${SERVER_URL}/api/makeups`,
                    {id},
                    {
                        headers: { Authorization: `Bearer ${userInfo.token}` },
                    })
                    dispatch({ type: MAKEUPS_INIT_ITEMS, payload: data });
                };
                fetchProduct();
                dispatch({ type: MAKEUPS_DETAIL, payload: {title:"",img:"../img/img_default.png"} });
            } catch (error) {
                if(error.response.status == 401){
                    localStorage.removeItem("userInfo");
                    dispatch({ type: actionType.USER_LOGOUT });
                    history.push("/login");
                }
            }
            
        }
    }, [qty,title,img,time,tag,color_code,note,type,tag_w]);
    return (
        <div>
            {makeupsItems.length!=0?
                // <!-- 美妝管理列表 -->
                makeupsItems.map(makeup => (
                        <li className={DateDiff(Today,makeup.time)<3?"x-list-box x-list-box-expired":"x-list-box"}>
                            <div className={DateDiff(Today,makeup.time)<3?"x-expired":"x-expire display-none"}></div>
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
                                        makeup.tag_array.slice(0, 4).map(tag => ( <button className="x-tag-btn" onClick={()=>ContainTag(tag)}>#{tag}</button> ))
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
