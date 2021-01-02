import React,{ useContext,useEffect,useState} from 'react';
// import { Link } from "react-router-dom";
// import methods from '../json/Method.json';
import { useLocation,useHistory } from "react-router-dom";
import * as QueryString from "query-string";
import { StateContext, DispatchContext } from "../contexts/X-index"
import { actionType,METHODS_ADD_ITEM,METHODS_INIT_ITEMS,METHODS_REMOVE_ITEM,METHODS_EDIT_ITEM,OPEN_Modal_EDIT,SERVER_URL} from "../constants/X-constants"
import Cookie from "js-cookie"
import axios from "axios";

const MethodListBox = () => {
    //切換頁面
    const history = useHistory();
    //取得dispatch,state的值
    const dispatch = useContext(DispatchContext);
    const {methodsItems} = useContext(StateContext);
    // const [me, setme] = useState(localStorage.getItem("userInfo"))
    const { userSignin } = useContext(StateContext);
    const { loading, userInfo, error } = userSignin;
    const [me, setme] = useState(userInfo)

    const location = useLocation();
    const { title,website,tag,type,edit_ID,tag_w} = QueryString.parse(location.search);
    //新增
    const addToCart = async (title,website,tag) => {
        try {
            var tag_array=tag.split(',');
            const id =userInfo._id
            const { data } = await axios.post(SERVER_URL+'/api/methods/addmethods',
            {
                title,
                website,
                tag_array,
                id},
            {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });
            dispatch({ type: METHODS_INIT_ITEMS, payload: data });
        } catch (error) {
            if(error.response.status == 401){
                localStorage.removeItem("userInfo");
                dispatch({ type: actionType.USER_LOGOUT });
                history.push("/login");
            }
        }
    };
    //編輯
    const editToCart = async (title,website,tag,edit_ID) => {
        try {
            const id =userInfo._id
            var tag_array=tag.split(',');
            const { data } = await axios.put(SERVER_URL+'/api/methods/'+edit_ID, 
            {
                title,
                website,
                tag_array,
                id
            },
            {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });
            dispatch({ type: METHODS_INIT_ITEMS, payload: data });
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
            dispatch({ type: METHODS_REMOVE_ITEM, payload: _id });
            const { data } = await axios.delete(`${SERVER_URL}/api/methods/${_id}`, 
            {
                headers: { Authorization: `Bearer ${userInfo.token}` },
                data :{id:id}
            });
            dispatch({ type: METHODS_INIT_ITEMS, payload: data });
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
        history.push("/Method"+"?tag_w="+tag+"&type=ContainTag");
    };
    //初始化methodsItems
    useEffect(() => {
        try {
            const id =userInfo._id
            const fetchProduct = async () => {
                const { data } = await axios.post(`${SERVER_URL}/api/methods/`,
                {id},
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                })
                dispatch({ type: METHODS_INIT_ITEMS, payload: data });
            };
            fetchProduct();
        } catch (error) {
            if(error.response.status == 401){
                localStorage.removeItem("userInfo");
                dispatch({ type: actionType.USER_LOGOUT });
                history.push("/login");
            }
        }
        console.log(userInfo._id)
        console.log(userInfo.token)
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
        else if(type=="ContainTag"&&tag_w){
            try {
                const id =userInfo._id
                const SearchTag = async () => {
                    const { data } = await axios.post(`${SERVER_URL}/api/methods/containTag/${tag_w}`,
                    {id},
                    {
                        headers: { Authorization: `Bearer ${userInfo.token}` },
                    })
                    dispatch({ type: METHODS_INIT_ITEMS, payload: data });
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
            try {
                const id =userInfo._id
                const fetchProduct = async () => {
                    const { data } = await axios.post(`${SERVER_URL}/api/methods/`,
                    {id},
                    {
                        headers: { Authorization: `Bearer ${userInfo.token}` },
                    })
                    dispatch({ type: METHODS_INIT_ITEMS, payload: data });
                };
                fetchProduct();
            } catch (error) {
                if(error.response.status == 401){
                    localStorage.removeItem("userInfo");
                    dispatch({ type: actionType.USER_LOGOUT });
                    history.push("/login");
                }
            }
            
        }
    }, [title,website,tag,type,tag_w]);
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
                                    method.tag_array.slice(0, 4).map(tag => ( <button className="x-tag-btn" onClick={()=>ContainTag(tag)}>#{tag}</button> ))
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