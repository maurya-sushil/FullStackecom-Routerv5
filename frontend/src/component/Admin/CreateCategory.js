import React, { Fragment, useEffect, useState } from "react";
import "./category.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { clearErrors, createCategory } from "../../actions/categoryAction"
import profileImage from "../../images/Profile.png"


const CreateCategory = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, success } = useSelector((state) => state.category);

    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [categoryImage, setAvatar] = useState(profileImage);
    const [avatarPreview, setAvatarPreview] = useState(profileImage);


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Category Created Successfully");
            history.push("/admin/dashboard");
            /*  dispatch({ type: CATEGORY_RESET }); */
        }
    }, [dispatch, alert, error, history, success]);


    const registerDataChange = (e) => {
        if (e.target.name === "categoryImage") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    // 0 is for Initialization , 1 is for Ready state, 2 is Processed State
                    setAvatarPreview(reader.result);
                    console.log("Reder Result : ", reader.result)
                    setAvatar(reader.result);
                }
            };
            if (e.target.files[0]) { reader.readAsDataURL(e.target.files[0]); }

        }
    };
    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("slug", slug)
        myForm.set("categoryImage", categoryImage);
        dispatch(createCategory(myForm));
    };

    return (
        <Fragment>
            <MetaData title="Create Category" />
            <div className="categoryBoxx">
                <div className="categoryContainer">
                    <h1 className="createCategoryHeading">Create Category</h1>
                    <form className="categoryForm"
                        encType="multipart/form-data"
                        onSubmit={registerSubmit}
                    >
                        <div className="categoryName">
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                name="name"
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
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
                                onChange={registerDataChange}
                            />
                        </div>
                        <input type="submit" value="Create Category" className={loading ? "" : "categorySubmit"} />
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default CreateCategory;
