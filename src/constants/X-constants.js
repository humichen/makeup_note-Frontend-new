export const OPEN_Modal = "OPEN_Modal"
export const CLOSE_Modal = "CLOSE_Modal"
export const OPEN_Modal_EDIT = "OPEN_Modal_EDIT"
export const CLOSE_Modal_EDIT = "CLOSE_Modal_EDIT"
//美妝品
export const MAKEUPS_ADD_ITEM = "MAKEUPS_ADD_ITEM"
export const MAKEUPS_REMOVE_ITEM = "MAKEUPS_REMOVE_ITEM"
export const MAKEUPS_EDIT_ITEM = "MAKEUPS_EDIT_ITEM"
export const MAKEUPS_INIT_ITEMS = "MAKEUPS_INIT_ITEMS"
export const MAKEUPS_DATA_INIT = "MAKEUPS_DATA_INIT"
//詳細
export const MAKEUPS_DETAIL = "MAKEUPS_DETAIL"
//方法
export const METHODS_INIT_ITEMS = "METHODS_INIT_ITEMS"
export const METHODS_ADD_ITEM = "METHODS_ADD_ITEM"
export const METHODS_REMOVE_ITEM = "METHODS_REMOVE_ITEM"
export const METHODS_EDIT_ITEM = "METHODS_EDIT_ITEM"
//Tag載入
export const TAG_INIT = "TAG_INIT"
//SERVER
// export const SERVER_URL = "http://localhost:5000";
//HRROKU_SERVER
export const SERVER_URL = "https://makeupnote.herokuapp.com";


export const actionType = {
  //SignIn Actions
  USER_INIT_INFO: "USER_INIT_INFO",
  USER_SIGNIN_REQUEST: "USER_SIGNIN_REQUEST",
  USER_SIGNIN_SUCCESS: "USER_SIGNIN_SUCCESS",
  USER_SIGNIN_FAIL: "USER_SIGNIN_FAIL",
  USER_LOGOUT: "USER_LOGOUT",

  //SignUp Actions
  USER_REGISTER_REQUEST: "USER_REGISTER_REQUEST",
  USER_REGISTER_SUCCESS: "USER_REGISTER_SUCCESS",
  USER_REGISTER_FAIL: "USER_REGISTER_FAIL",

  //Update Profile Actions
  USER_UPDATE_PROFILE_REQUEST: "USER_UPDATE_PROFILE_REQUEST",
  USER_UPDATE_PROFILE_SUCCESS: "USER_UPDATE_PROFILE_SUCCESS",
  USER_UPDATE_PROFILE_FAIL: "USER_UPDATE_PROFILE_FAIL",
};