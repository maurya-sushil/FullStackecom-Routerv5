import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { CATEGORY_UPDATE_RESET } from "../../constants/categoryConstant";
import {
  getCategoryDetails,
  updateCategoryop,
  clearErrors,
} from "../../actions/categoryAction";
import Loader from "../layout/Loader/Loader";

const UpdateCategory = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, category, error } = useSelector(
    (state) => state.categoryDetails
  );
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.categoryOpt
  );
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryImage, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("");
  const categoryID = match.params.id;

  useEffect(() => {
    if (category && category._id !== categoryID) {
      dispatch(getCategoryDetails(categoryID));
    } else {
      setName(category.name);
      setSlug(category.slug);
      setAvatarPreview(category.categoryImage.url);
      
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Category Updated Successfully");
      history.push("/admin/category");
      dispatch({ type: CATEGORY_UPDATE_RESET });
    }
  }, [dispatch, alert, error, history, categoryID, isUpdated, category, updateError, ]);
 

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const updateCategorySubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("slug", slug);
    myForm.set("categoryImage", categoryImage);
    dispatch(updateCategoryop(categoryID, myForm));
  };

  return (
    <Fragment>
      <MetaData title="Create Category" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="categoryBox">
            <div className="categoryContainer">
              <h1 className="createCategoryHeading">Create Category</h1>
              <form
                className="categoryForm"
                encType="multipart/form-data"
                onSubmit={updateCategorySubmitHandler}
              >
                <div className="categoryName">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="categorySlug">
                  <input
                    type="text"
                    placeholder="Slug in small letters only"
                    required
                    name="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </div>

                <div id="categoryImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="categoryImage"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Create Category"
                  className="categorySubmit"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateCategory;
