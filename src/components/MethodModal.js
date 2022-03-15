import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { StateContext, DispatchContext } from "../contexts/X-index";
import { CLOSE_Modal, CLOSE_Modal_EDIT } from "../constants/X-constants";
const MethodModal = () => {
  //切換頁面
  const history = useHistory();
  //取得dispatch,state的值
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const { editItems } = useContext(StateContext);
  //各input的值
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [tag, setTag] = useState("");

  //畫面每重新渲染一次關閉彈出視窗
  useEffect(() => {
    dispatch({ type: CLOSE_Modal });
    dispatch({ type: CLOSE_Modal_EDIT });
  }, []);
  //關閉後就清空input值
  useEffect(() => {
    setName("");
    setWebsite("");
    setTag("");
  }, [state.open]);
  //編輯
  useEffect(() => {
    if (editItems.title != undefined && state.open_edit) {
      setName(editItems.title);
      setWebsite(editItems.website);
      setTag(editItems.tag_array);
    } else {
      setName("");
      setWebsite("");
      setTag("");
    }
  }, [state.open_edit]);
  //按下新增
  const handleAddToList = () => {
    if (name == "") {
      alert("沒輸入名稱喔");
    } else if (website == "") {
      alert("沒輸入網址喔");
    } else {
      dispatch({ type: CLOSE_Modal });
      history.push(
        "/Method" +
          "?title=" +
          name +
          "&website=" +
          website +
          "&tag=" +
          tag +
          "&type=add_method"
      );
    }
  };
  //按下編輯
  const handleEditToList = () => {
    if (name == "") {
      alert("沒輸入名稱喔");
    } else if (website == "") {
      alert("沒輸入網址喔");
    } else {
      dispatch({ type: CLOSE_Modal_EDIT });
      history.push(
        "/Method" +
          "?title=" +
          name +
          "&website=" +
          website +
          "&tag=" +
          tag +
          "&edit_ID=" +
          editItems._id +
          "&type=edit_method"
      );
    }
  };
  return (
    <div>
      {/* <!-- 新增彈出視窗 --> */}
      <div className={`${state.open ? "x-madal" : "x-madal display-none"}`}>
        <div className="x-madal-add-method">
          <div className="x-madal-add-method-title">
            <i
              className="fa fa-times x-close"
              onClick={() => dispatch({ type: CLOSE_Modal })}
            ></i>
            <h1>新增方法</h1>
          </div>
          {/* 名稱 */}
          <label className="field a-field a-field_a1 page__field x-input-width">
            <input
              type="text"
              className="field__input a-field__input"
              placeholder="請輸入名稱"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label">名稱</span>
            </span>
          </label>
          {/* 網址 */}
          <label className="field a-field a-field_a1 page__field x-input-width">
            <input
              type="text"
              className="field__input a-field__input"
              placeholder="請輸入網址"
              required
              onChange={(e) => {
                setWebsite(e.target.value);
              }}
              value={website}
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label">網址</span>
            </span>
          </label>
          {/* 標籤 */}
          <label className="field a-field a-field_a1 page__field x-input-width">
            <input
              type="text"
              className="field__input a-field__input"
              placeholder="請輸入標籤"
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
          <button className="x-madal-add-method-btn" onClick={handleAddToList}>
            新增
          </button>
        </div>
      </div>
      {/* <!-- 編輯彈出視窗 --> */}
      <div
        className={`${state.open_edit ? "x-madal" : "x-madal display-none"}`}
      >
        <div className="x-madal-add-method-layout">
          <div className="x-madal-add-method">
            <div className="x-madal-add-method-title">
              <i
                className="fa fa-times x-close"
                onClick={() => dispatch({ type: CLOSE_Modal_EDIT })}
              ></i>
              <h1>編輯方法</h1>
            </div>
            {/* 名稱 */}
            <label className="field a-field a-field_a1 page__field x-input-width">
              <input
                type="text"
                className="field__input a-field__input"
                placeholder="請輸入名稱"
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              />
              <span className="a-field__label-wrap">
                <span className="a-field__label">名稱</span>
              </span>
            </label>
            {/* 網址 */}
            <label className="field a-field a-field_a1 page__field x-input-width">
              <input
                type="text"
                className="field__input a-field__input"
                placeholder="請輸入網址"
                required
                onChange={(e) => {
                  setWebsite(e.target.value);
                }}
                value={website}
              />
              <span className="a-field__label-wrap">
                <span className="a-field__label">網址</span>
              </span>
            </label>
            {/* 標籤 */}
            <label className="field a-field a-field_a1 page__field x-input-width">
              <input
                type="text"
                className="field__input a-field__input"
                placeholder="請輸入標籤"
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
            <button
              className="x-madal-add-method-btn"
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
export default MethodModal;
