const { CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_SUCCESS, CATEGORY_CREATE_FAIL,CATEGORY_GET_SUCCESS,CATEGORY_GET_REQUEST,CATEGORY_GET_FAIL, DELETE_CATEGORY_REQUEST, CATEGORY_UPDATE_REQUEST, CATEGORY_UPDATE_SUCCESS, DELETE_CATEGORY_FAIL, CATEGORY_UPDATE_FAIL, DELETE_CATEGORY_RESET, DELETE_CATEGORY_SUCCESS, CATEGORY_UPDATE_RESET, CATEGORY_DETAIL_REQUEST, CATEGORY_DETAIL_SUCCESS, CATEGORY_DETAIL_FAIL } = require("../constants/categoryConstant")
const { CLEAR_ERRORS } = require("../constants/categoryConstant")


export const categoryReducer = (state = { category: {} }, action) => {
    switch (action.type) {
        case CATEGORY_CREATE_REQUEST:
            case CATEGORY_GET_REQUEST : 
            return {
                loading: true,
            }
        case CATEGORY_CREATE_SUCCESS:
            case CATEGORY_GET_SUCCESS: 
            return {
                loading: false,
                success: action.payload.success,
                categoryData: action.payload.category
            }
        case CATEGORY_CREATE_FAIL:
            case CATEGORY_GET_FAIL :
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
       default:
            return state;
    
    }
}

export const categoryOpertionReducers = (state = { category: [] }, action) => {
    switch (action.type) {
      case DELETE_CATEGORY_REQUEST:
      case CATEGORY_UPDATE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_CATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case CATEGORY_UPDATE_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case DELETE_CATEGORY_FAIL:
      case CATEGORY_UPDATE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_CATEGORY_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case CATEGORY_UPDATE_RESET:
        return {
          ...state,
          isUpdated: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };

  export const categoryDetailsReducer = (state = { category: {} }, action) => {
    switch (action.type) {
      case CATEGORY_DETAIL_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case CATEGORY_DETAIL_SUCCESS:
        return {
          loading: false,
          category: action.payload,
          
        };
      case CATEGORY_DETAIL_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
