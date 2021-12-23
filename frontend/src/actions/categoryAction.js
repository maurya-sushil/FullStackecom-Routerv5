import axios from "axios";
import { CLEAR_ERRORS } from "../constants/userConstant";

const { CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_SUCCESS, CATEGORY_CREATE_FAIL,CATEGORY_GET_SUCCESS,CATEGORY_GET_REQUEST,CATEGORY_GET_FAIL } = require("../constants/categoryConstant")

export const createCategory = (categoryData)=> async (dispatch) =>{
    try {
        dispatch({ type: CATEGORY_CREATE_REQUEST });
    
        const config = {
          headers: { "Content-Type": "application/json" },
        };
        console.log(categoryData)
    
        const { data } = await axios.post(
          `/api/v1/category/create`,
          categoryData,
          config
        );
        console.log(data)
      
        dispatch({
          type: CATEGORY_CREATE_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: CATEGORY_CREATE_FAIL,
          payload: error.response.data.error,
        });
      }
}

export const getCategory =()=> async(dispatch) => {

  try {
    dispatch({ type: CATEGORY_GET_REQUEST });

    const { data } = await axios.get(
      `/api/v1/categories`,
    );
  
    dispatch({
      type: CATEGORY_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_GET_FAIL,
      payload: error.response.data.error,
    });
  }
}

export const clearErrors = async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
  }