const { CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_SUCCESS, CATEGORY_CREATE_FAIL,CATEGORY_GET_SUCCESS,CATEGORY_GET_REQUEST,CATEGORY_GET_FAIL } = require("../constants/categoryConstant")
const { CLEAR_ERRORS } = require("../constants/productConstant")


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
