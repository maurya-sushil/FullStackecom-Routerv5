import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import SideBar from "./Sidebar";

import { deleteCategory, getCategory, clearErrors } from "../../actions/categoryAction";
import { DELETE_CATEGORY_RESET } from "../../constants/categoryConstant";

const CategoryList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, categoryData } = useSelector((state) => state.category);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.categoryOpt
  );

   const deleteCategoryHandler = (id) => {
    dispatch(deleteCategory(id));
  }; 

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

     if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Category Deleted Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: DELETE_CATEGORY_RESET });
    }

    dispatch(getCategory());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Category ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Category name",
      minWidth: 350,
      flex: 1,
     
    },
    {
      field: "slug",
      headerName: "slug",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "image",
      headerName: "Image",
      minWidth: 270,
      flex: 0.5,
      renderCell: (params) => <img src={params.value} alt='' style={{height:"100%"}} />,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/category/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
               onClick={() =>
                deleteCategoryHandler(params.getValue(params.id, "id"))
              } 
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  categoryData &&
    categoryData.forEach((item) => {
      console.log(item.categoryImage.url)
      rows.push({
        id: item._id,
        slug: item.slug,
        image: item.categoryImage.url,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL Categories - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL Categories</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowHeight={150}
            disableSelectionOnClick
            className="productListTable"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default CategoryList;


