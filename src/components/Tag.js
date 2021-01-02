import React,{ useContext,useEffect,useState} from 'react';
import { StateContext, DispatchContext} from "../contexts/X-index"
import { useLocation,useHistory,Link } from "react-router-dom";
import axios from "axios";
import { actionType,SERVER_URL,TAG_INIT} from "../constants/X-constants"
import * as QueryString from "query-string";



const Tag = () => {
    //切換頁面
    const history = useHistory();
    //取得dispatch,state的值
    const dispatch = useContext(DispatchContext);
    const {tags_all} = useContext(StateContext);
    const {makeupsItems} = useContext(StateContext);
    const {methodsItems} = useContext(StateContext);
    // const [me, setme] = useState(localStorage.getItem("userInfo"))
    const { userSignin } = useContext(StateContext);
    const { loading, userInfo, error } = userSignin;
    const [me, setme] = useState(userInfo)

    let href=window.location.href;
    var tags=[]
    const location = useLocation(); 
    const {qty,title,img,time,tag,color_code,note,type,tag_w} = QueryString.parse(location.search); 
    const tagNorepeat =  (items) => {
        items.map(item => item.tag_array.map(tag=> tags.push(tag))) 
        var result=tags.filter(function(element, index, arr){
            return arr.indexOf(element) === index;
        })
        return result
    };
    //找出裡面有選中tag的資料
    const ContainTag = (tag) => {
        if(href.match('Makeup')!==null){
            history.push("/Makeup"+"?tag_w="+tag+"&type=ContainTag");
        }
        else{
            history.push("/Method"+"?tag_w="+tag+"&type=ContainTag");
        }
    };
    //載入標籤
    useEffect(() => {
        const id =userInfo._id
        const fetchProduct = async () => {
            if(href.match('Makeup')!==null){
                try {
                    const { data } = await axios.post(`${SERVER_URL}/api/makeups/`,
                    {id},
                    {
                        headers: { Authorization: `Bearer ${userInfo.token}` },
                    })
                    dispatch({ type: TAG_INIT, payload: data });
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
                    const { data } = await axios.post(`${SERVER_URL}/api/methods/`,
                    {id},
                    {
                        headers: { Authorization: `Bearer ${userInfo.token}` },
                    })
                    dispatch({ type: TAG_INIT, payload: data });
                    
                } catch (error) {
                    if(error.response.status == 401){
                        localStorage.removeItem("userInfo");
                        dispatch({ type: actionType.USER_LOGOUT });
                        history.push("/login");
                    }
                }
                
            }
        };
        fetchProduct();
    }, []);
    //載入標籤
    useEffect(() => {
        const id =userInfo._id
        const fetchProduct = async () => {
            if(href.match('Makeup')!==null){
                try {
                    const { data } = await axios.post(`${SERVER_URL}/api/makeups/`,
                    {id},
                    {
                        headers: { Authorization: `Bearer ${userInfo.token}` },
                    })
                    dispatch({ type: TAG_INIT, payload: data });                    
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
                    const { data } = await axios.post(`${SERVER_URL}/api/methods/`,
                    {id},
                    {
                        headers: { Authorization: `Bearer ${userInfo.token}` },
                    })
                    dispatch({ type: TAG_INIT, payload: data }); 
                } catch (error) {
                    if(error.response.status == 401){
                        localStorage.removeItem("userInfo");
                        dispatch({ type: actionType.USER_LOGOUT });
                        history.push("/login");
                    }
                }

                

            }
        };
        fetchProduct();
    }, [qty,title,img,time,tag,color_code,note,type,tag_w,makeupsItems,methodsItems]);
    return (
        // 標籤
        <div className="x-tag">
            <h1 className="x-tag-title">標籤</h1>
            {
                href.match('Makeup')!==null?
                <Link to={"/Makeup"} className="x-tag-all">顯示全部</Link>:
                <Link to={"/Method"} className="x-tag-all">顯示全部</Link>
            }
            <div className="x-tag-box">
            {/* {
            href.match('Makeup')!==null?
                makeupsItems.length===0?
                <div className="x-tag-nothing">目前還沒新增任何標籤喔<br></br>推薦使用：口紅,氣墊</div>
                : 
                tagNorepeat(makeupsItems).map(tag =><button className="x-tag-btn" onClick={()=>ContainTag(tag)}>#{tag}</button>)
            :
                methodsItems.length===0?
                <div className="x-tag-nothing">目前還沒新增任何標籤喔<br></br>推薦使用：夜間保養,遮瑕方式</div>
                :    
                tagNorepeat(methodsItems).map(tag =><button className="x-tag-btn" onClick={()=>ContainTag(tag)}>#{tag}</button>)
            } */}
            {
                tags_all.length===0?
                    href.match('Makeup')!==null? <div className="x-tag-nothing">目前還沒新增任何標籤喔<br></br>推薦使用：口紅,氣墊</div>:<div className="x-tag-nothing">目前還沒新增任何標籤喔<br></br>推薦使用：夜間保養,遮瑕方式</div>
                :
                tagNorepeat(tags_all).map(tag =><button className={tag_w===tag?"x-tag-btn x-tag-btn-select":"x-tag-btn "} onClick={()=>ContainTag(tag)}>#{tag}</button>)
            }
            </div>
        </div>
    );
}

export default Tag;