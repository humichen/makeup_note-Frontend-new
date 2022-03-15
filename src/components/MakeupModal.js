import React, { useContext, useEffect, useState } from "react";
//切換頁面https://stackoverflow.com/questions/59560120/reactjs-typeerror-cannot-read-property-push-of-undefined
import { useHistory } from "react-router-dom";
import { StateContext, DispatchContext } from "../contexts/X-index";
import {
  CLOSE_Modal,
  CLOSE_Modal_EDIT,
  SERVER_URL,
  MAKEUPS_DATA_INIT,
} from "../constants/X-constants";
import img_default from "../img/img_default.png";
import axios from "axios";

const MakeupModal = () => {
  //切換葉面
  const history = useHistory();
  // console.log(props);
  //取得dispatch,state的值
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const { editItems } = useContext(StateContext);
  const { makeup_data } = useContext(StateContext);

  //搜尋框的值、是否選中、圖片、色號
  //color_choose該產品的色號
  //color_code_choose色號對應的色碼
  const [search, setSearch] = useState({
    keyword: "",
    same: false,
    img: "",
    color_choose: [],
    color_code_choose: "",
  });
  //選擇
  const [qty, setQty] = useState("");
  const [tag, setTag] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [code, setCode] = useState(0);
  const testdata = [];
  //載入現有資料庫供使用者搜尋
  makeup_data.map((ma) => testdata.push(ma.title));
  //搜尋框值改變時
  const onChangeHandler = (event) => {
    setSearch({
      ...state,
      same: false,
      keyword: event.target.value,
      img: "",
      color_choose: [],
    });
  };
  //選中li的值，將產品詳細資料代入
  const onSearchClick = (event) => {
    let Chose = makeup_data.filter(
      (item) => item.title === event.target.innerHTML
    );
    setSearch({
      ...state,
      keyword: event.target.innerHTML,
      same: true,
      img: Chose[0].img,
      color_choose: Chose[0].color_choose,
      color_code_choose: Chose[0].color_code_choose,
    });
    setCode(0);
  };
  //從資料庫中比對並顯示建議的關鍵字
  const filterList = () => {
    if (!search.same) {
      let updatedList = testdata.filter((item) => {
        return item.toLowerCase().indexOf(search.keyword.toLowerCase()) !== -1;
      });
      let data = updatedList.map((item, index, array) => {
        //如果沒有吻合的關鍵字推薦就不要顯示關鍵字框框
        if (updatedList.length !== testdata.length) {
          return (
            <li
              className="x-list-group-item"
              data-category={item}
              key={index}
              onClick={onSearchClick}
            >
              {item}
            </li>
          );
        } else {
          return (
            <li
              className="x-list-group-item display-none"
              data-category={item}
              key={index}
              onClick={onSearchClick}
            >
              {item}
            </li>
          );
        }
      });
      return data;
    }
  };
  //按下新增
  const handleAddToList = () => {
    if (
      code === -1 ||
      search.color_code_choose === undefined ||
      search.color_code_choose[code] === undefined ||
      qty === 0
    ) {
      alert("沒選擇色號喔");
    } else if (time === "") {
      alert("輸入保存期限喔");
    } else if (!/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(time)) {
      alert("日期格式不正確");
    } else {
      dispatch({ type: CLOSE_Modal });
      // console.log(code);
      history.push(
        "/Makeup" +
          "?qty=" +
          qty +
          "&title=" +
          search.keyword +
          "&img=" +
          search.img +
          "&time=" +
          time +
          "&tag=" +
          tag +
          "&color_code=" +
          search.color_code_choose[code] +
          "&note=" +
          note +
          "&type=add_makeup"
      );
    }
  };
  //畫面每重新渲染一次關閉彈出視窗
  useEffect(() => {
    dispatch({ type: CLOSE_Modal });
    dispatch({ type: CLOSE_Modal_EDIT });
    const fetchProduct = async () => {
      const { data } = await axios.get(`${SERVER_URL}/api/makeups/makeupsdata`);
      //載入初始資料
      dispatch({ type: MAKEUPS_DATA_INIT, payload: data });
    };
    fetchProduct();
  }, []);
  //表格內值清空
  useEffect(() => {
    setSearch({
      ...state,
      keyword: "",
      same: false,
      img: "",
      color_choose: [],
      color_code_choose: "",
    });
    setQty("");
    setTag("");
    setTime("");
    setNote("");
    setCode(0);
  }, [state.open]);
  //編輯
  useEffect(() => {
    if (editItems.title !== undefined && state.open_edit) {
      let Chose = makeup_data.filter((item) => item.title === editItems.title);
      setSearch({
        ...state,
        keyword: editItems.title,
        same: true,
        img: editItems.img,
        color_choose: Chose[0].color_choose,
        color_code_choose: Chose[0].color_code_choose,
      });
      setQty(editItems.color);
      setTag(editItems.tag_array);
      setTime(editItems.time);
      setNote(editItems.note);
      Chose[0].color_code_choose.map(function (x, index) {
        if (x === editItems.color_code.split("#")[1]) {
          setCode(index);
        }
      });
    } else {
      setSearch({
        ...state,
        keyword: "",
        same: false,
        img: "",
        color_choose: [],
        color_code_choose: "",
      });
      setQty("");
      setTag("");
      setTime("");
      setNote("");
      setCode(0);
    }
  }, [state.open_edit]);
  //按下編輯
  const handleEditToList = () => {
    if (
      code === -1 ||
      search.color_code_choose === undefined ||
      search.color_code_choose[code] === undefined ||
      qty === 0
    ) {
      alert("沒選擇色號喔");
    } else if (time === "") {
      alert("輸入保存期限喔");
    } else if (!/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(time)) {
      alert("日期格式不正確");
    } else {
      search.color_choose.map((ma, index) => {
        if (index === code) {
          dispatch({ type: CLOSE_Modal_EDIT });
          let href = window.location.href;
          href.match("detail") != null
            ? history.push(
                "/Makeup/detail/" +
                  editItems._id +
                  "?qty=" +
                  ma +
                  "&title=" +
                  search.keyword +
                  "&img=" +
                  search.img +
                  "&time=" +
                  time +
                  "&tag=" +
                  tag +
                  "&color_code=" +
                  search.color_code_choose[code] +
                  "&note=" +
                  note +
                  "&edit_ID=" +
                  editItems._id +
                  "&type=edit_makeup"
              )
            : history.push(
                "/Makeup" +
                  "?qty=" +
                  ma +
                  "&title=" +
                  search.keyword +
                  "&img=" +
                  search.img +
                  "&time=" +
                  time +
                  "&tag=" +
                  tag +
                  "&color_code=" +
                  search.color_code_choose[code] +
                  "&note=" +
                  note +
                  "&edit_ID=" +
                  editItems._id +
                  "&type=edit_makeup"
              );
        }
      });
    }
  };

  return (
    <div>
      {/* <!-- 新增彈出視窗 --> */}
      <div className={`${state.open ? "x-madal" : "x-madal display-none"}`}>
        <div className="x-madal-add-makeup-layout">
          <div className="x-madal-add-makeup">
            <i
              className="fa fa-times x-close"
              onClick={() => dispatch({ type: CLOSE_Modal })}
            ></i>
            <div className="x-madal-add-makeup-box">
              <div className="x-madal-add-makeup-box-right">
                <h1>新增美妝</h1>
                <img
                  src={search.img != "" ? "../../" + search.img : img_default}
                  alt=""
                />
                <button className="x-madal-uploadimg"> 自行上傳</button>
              </div>
              <div className="x-madal-add-makeup-box-left">
                <div className="x-madal-add-makeup-input x-madal-add-makeup-input-title">
                  <label className="field a-field a-field_a1 page__field x-input-width ">
                    <input
                      type="text"
                      className="field__input a-field__input x-keyword-show"
                      placeholder="請輸入名稱，系統將自動幫您代入色號及照片"
                      required
                      onChange={onChangeHandler}
                      value={search.keyword}
                    />
                    <span className="a-field__label-wrap">
                      <span className="a-field__label">名稱</span>
                    </span>
                    {/* //相似選擇 */}
                    <ul className="x-list-group">{filterList()}</ul>
                  </label>
                </div>
                <div className="x-madal-add-makeup-input">
                  <label className="field a-field a-field_a1 page__field x-input-width">
                    <input
                      type="text"
                      className="field__input a-field__input"
                      placeholder="請輸入保存期限(YYYY/MM/DD)"
                      required
                      onChange={(e) => {
                        setTime(e.target.value);
                      }}
                      value={time}
                    />
                    <span className="a-field__label-wrap">
                      <span className="a-field__label">保存期限</span>
                    </span>
                  </label>
                </div>
                <div className="x-madal-add-makeup-select">
                  <div className="h-birthday-title">色號</div>
                  <div className="h-birthdayselect-box">
                    <select
                      className="h-select"
                      onChange={(e) => {
                        setQty(e.target.value);
                        setCode(e.target.selectedIndex - 1);
                      }}
                    >
                      <option value="-1">請選擇</option>
                      {search.color_choose.map((ma) => (
                        <option value={ma}>{ma}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="x-madal-add-makeup-input">
                  <label className="field a-field a-field_a1 page__field x-input-width">
                    <input
                      type="text"
                      className="field__input a-field__input"
                      placeholder="請用逗號隔開每個標籤(ex:口紅,唇蜜)"
                      required
                      onChange={(e) => {
                        setTag(e.target.value);
                      }}
                      value={tag}
                    />
                    <span className="a-field__label-wrap">
                      <span className="a-field__label">標籤</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="x-madal-add-makeup-note">
              <label className="field a-field a-field_a1 page__field x-input-width">
                <input
                  type="text"
                  className="field__input a-field__input"
                  placeholder="請輸入備註"
                  required
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                  value={note}
                />
                <span className="a-field__label-wrap">
                  <span className="a-field__label">備註</span>
                </span>
              </label>
              <button
                className="x-madal-add-makeup-btn"
                onClick={handleAddToList}
              >
                新增
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- 編輯彈出視窗 --> */}
      <div
        className={`${state.open_edit ? "x-madal" : "x-madal display-none"}`}
      >
        <div className="x-madal-add-makeup">
          <i
            className="fa fa-times x-close"
            onClick={() => dispatch({ type: CLOSE_Modal_EDIT })}
          ></i>
          <div className="x-madal-add-makeup-box">
            <div className="x-madal-add-makeup-box-right">
              <h1>編輯美妝</h1>
              <img
                src={search.img != "" ? "../../" + search.img : img_default}
                alt=""
              />
              <button className="x-madal-uploadimg"> 自行上傳</button>
            </div>
            <div className="x-madal-add-makeup-box-left">
              <div className="x-madal-add-makeup-input x-madal-add-makeup-input-title">
                <label className="field a-field a-field_a1 page__field x-input-width ">
                  <input
                    type="text"
                    className="field__input a-field__input x-keyword-show"
                    placeholder="請輸入名稱，系統將自動幫您代入色號及照片"
                    required
                    onChange={onChangeHandler}
                    value={search.keyword}
                  />
                  <span className="a-field__label-wrap">
                    <span className="a-field__label">名稱</span>
                  </span>
                  {/* //相似選擇 */}
                  <ul className="x-list-group">{filterList()}</ul>
                </label>
              </div>
              <div className="x-madal-add-makeup-input">
                <label className="field a-field a-field_a1 page__field x-input-width">
                  <input
                    type="text"
                    className="field__input a-field__input"
                    placeholder="請輸入保存期限(YYYY/MM/DD)"
                    required
                    onChange={(e) => {
                      setTime(e.target.value);
                    }}
                    value={time}
                  />
                  <span className="a-field__label-wrap">
                    <span className="a-field__label">保存期限</span>
                  </span>
                </label>
              </div>
              <div className="x-madal-add-makeup-select">
                <div className="h-birthday-title">色號</div>
                <div className="h-birthdayselect-box">
                  <select
                    className="h-select"
                    onChange={(e) => {
                      setQty(e.target.value);
                      setCode(e.target.selectedIndex - 1);
                    }}
                  >
                    <option value="-1">請選擇</option>
                    {search.color_choose.map((ma, index) => {
                      if (index == code) {
                        return (
                          <option value={ma} selected>
                            {ma}
                          </option>
                        );
                      } else {
                        return <option value={ma}>{ma}</option>;
                      }
                    })}
                  </select>
                </div>
              </div>
              <div className="x-madal-add-makeup-input">
                <label className="field a-field a-field_a1 page__field x-input-width">
                  <input
                    type="text"
                    className="field__input a-field__input"
                    placeholder="請用逗號隔開每個標籤(ex:口紅,唇蜜)"
                    required
                    onChange={(e) => {
                      setTag(e.target.value);
                    }}
                    value={tag}
                  />
                  <span className="a-field__label-wrap">
                    <span className="a-field__label">標籤</span>
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="x-madal-add-makeup-note">
            <label className="field a-field a-field_a1 page__field x-input-width">
              <input
                type="text"
                className="field__input a-field__input"
                placeholder="請輸入備註"
                required
                onChange={(e) => {
                  setNote(e.target.value);
                }}
                value={note}
              />
              <span className="a-field__label-wrap">
                <span className="a-field__label">備註</span>
              </span>
            </label>
            <button
              className="x-madal-add-makeup-btn"
              onClick={handleEditToList}
            >
              編輯
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeupModal;
