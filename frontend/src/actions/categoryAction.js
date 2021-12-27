import axios from "axios";
import { CLEAR_ERRORS } from "../constants/userConstants";

const { CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_SUCCESS, CATEGORY_CREATE_FAIL,CATEGORY_GET_SUCCESS,CATEGORY_GET_REQUEST,CATEGORY_GET_FAIL, DELETE_CATEGORY_REQUEST, CATEGORY_UPDATE_REQUEST, CATEGORY_UPDATE_SUCCESS, DELETE_CATEGORY_FAIL, CATEGORY_UPDATE_FAIL, DELETE_CATEGORY_SUCCESS, CATEGORY_DETAIL_REQUEST, CATEGORY_DETAIL_SUCCESS, CATEGORY_DETAIL_FAIL } = require("../constants/categoryConstant")

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

// Update CATEGORY
export const updateCategoryop = (id, categoryData) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_UPDATE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/category/${id}`,
      categoryData,
      config
    );

    dispatch({
      type: CATEGORY_UPDATE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_UPDATE_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Delete Product
export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/category/${id}`);

    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const getCategoryDetails = (id) => async (dispatch) => {
  try {

    dispatch({
      type: CATEGORY_DETAIL_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/admin/category/${id}`)
    console.log("Category Action Details : ", data)
    dispatch({
      type: CATEGORY_DETAIL_SUCCESS,
      payload: data.category,
    })

  } catch (error) {
    dispatch({
      type: CATEGORY_DETAIL_FAIL,
      payload: error.response.data.error,
    })
  }
};



export const clearErrors = async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
  }