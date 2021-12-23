import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import Metadata from "../layout/Metadata";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstant";
import { getCategory } from "../../actions/categoryAction";

const CategoryList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, categoryData } = useSelector((state) => state.category);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

 /*  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  }; */

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

/*     if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    } */

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
      renderCell: (params) => <img src={params.value} style={{height:"100%"}} />,
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
           {/*  <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link> */}

            <Button
             /*  onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              } */
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
      <Metadata title={`ALL Categories - Admin`} />

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


