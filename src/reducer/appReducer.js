import { OPEN_Modal, CLOSE_Modal,OPEN_Modal_EDIT,CLOSE_Modal_EDIT, actionType, MAKEUPS_INIT_ITEMS, MAKEUPS_REMOVE_ITEM, MAKEUPS_ADD_ITEM,MAKEUPS_EDIT_ITEM,METHODS_INIT_ITEMS,METHODS_ADD_ITEM, METHODS_REMOVE_ITEM,METHODS_EDIT_ITEM,MAKEUPS_DATA_INIT,MAKEUPS_DETAIL,TAG_INIT} from "../constants/X-constants"

const initialAppState = {
  open: false,
  open_edit: false,
  makeupsItems: [],
  makeup_detail:[],
  makeup_data:[],
  methodsItems: [],
  editItems:[],
  tags_all:[],
  userSignin: {
    loading: false,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    error: "",
  },
  userRegister: {
    loading: false,
    userInfo: null,
    error: "",
  },
};
let makeupsItems = {};
let editItems = {};
let methodsItems = {};

const appReducer = (state, action) => {
  switch (action.type) {
    case OPEN_Modal:
      // console.log(action.type);
      return { ...state, open: true };
    case OPEN_Modal_EDIT: 
      editItems = action.payload;
    return { ...state, open_edit: true,editItems };
    case CLOSE_Modal:
      // console.log(action.type);
      return { ...state, open: false };
    case CLOSE_Modal_EDIT:
    return { ...state, open_edit: false };
    //美妝
    case MAKEUPS_INIT_ITEMS:
      makeupsItems = action.payload;
      return { ...state, makeupsItems }
    case MAKEUPS_ADD_ITEM:
      const item = action.payload;
      makeupsItems = [...state.makeupsItems, item];
      return { ...state, makeupsItems };
    case MAKEUPS_REMOVE_ITEM:
      makeupsItems = state.makeupsItems.filter((x) => x._id !== action.payload);
      return { ...state, makeupsItems };
    case MAKEUPS_EDIT_ITEM:
      makeupsItems = state.makeupsItems.map((x)=> {
        if(x._id==action.payload._id){
          return x=action.payload;
        }
        else{
          return x;
        }
      });
      return { ...state, makeupsItems };
    case MAKEUPS_DATA_INIT:
      return { ...state, makeup_data: action.payload };
    case MAKEUPS_DETAIL:
      return { ...state, makeup_detail: action.payload };
    //方法
    case METHODS_INIT_ITEMS:
      methodsItems = action.payload;
      console.log("init"+methodsItems);
      return { ...state, methodsItems }
    case METHODS_ADD_ITEM:
      const methods_item = action.payload;
      methodsItems = [...state.methodsItems, methods_item];
      return { ...state, methodsItems };
    case METHODS_REMOVE_ITEM:
      methodsItems = state.methodsItems.filter((x) => x._id !== action.payload);
      return { ...state, methodsItems };
    case METHODS_EDIT_ITEM:
      methodsItems = state.methodsItems.map((x)=> {
        if(x._id==action.payload._id){
          return x=action.payload;
        }
        else{
          return x;
        }
      });
      return { ...state, methodsItems };
    //Tag載入
    case TAG_INIT:
      return { ...state, tags_all: action.payload };  
    //登入註冊
    case actionType.USER_INIT_INFO:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          userInfo: action.payload,
        },
      };
    case actionType.USER_SIGNIN_REQUEST:
      return { ...state, userSignin: { ...state.userSignin, loading: true } };
    case actionType.USER_SIGNIN_SUCCESS:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          loading: false,
          userInfo: action.payload,
        },
      };
    case actionType.USER_SIGNIN_FAIL:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          loading: false,
          error: action.payload,
        },
      };

    case actionType.USER_UPDATE_PROFILE_REQUEST:
      return { ...state, userSignin: { ...state.userSignin, loading: true } };
    case actionType.USER_UPDATE_PROFILE_SUCCESS:
      return { ...state, userSignin: { ...state.userSignin, loading: false } };
    case actionType.USER_UPDATE_PROFILE_FAIL:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          loading: false,
          error: action.payload,
        },
      };
    case actionType.USER_LOGOUT:
      // cartItems = [];
      return {
        ...state,
        // cartItems,
        userSignin: {
          ...state.userSignin,
          userInfo: null,
        },
      };

    case actionType.USER_REGISTER_REQUEST:
      return {
        ...state,
        userRegister: { ...state.userRegister, loading: true },
      };

    case actionType.USER_REGISTER_SUCCESS:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          userInfo: action.payload,
        },
        userRegister: {
          ...state.userRegister,
          loading: false,
          userInfo: action.payload,
        },
      };
    case actionType.USER_REGISTER_FAIL:
      return {
        ...state,
        userRegister: {
          ...state.userRegister,
          loading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};

export { initialAppState, appReducer };