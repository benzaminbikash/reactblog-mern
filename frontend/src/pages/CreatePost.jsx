import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useAllPostQuery, useCreatePostMutation } from "../redux/Api/PostApi";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
function CreatePost() {
  const navigate = useNavigate();
  const [postCreateApi] = useCreatePostMutation();
  const [category, setCategory] = useState([]);
  const [cat, setCat] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const { refetch: refetchAllPost } = useAllPostQuery();
  const handleCategory = (e) => {
    e.preventDefault();
    if (!cat) {
      toast("Category is empty.");
    } else {
      setCategory([...category, cat]);
      setCat("");
    }
  };
  const deleteCategoryItem = (d) => {
    let index = category.findIndex((item) => item === d);
    const newarray = [...category];
    newarray.splice(index, 1);
    setCategory(newarray);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !title || !description || !file) {
      toast("All fields are required.");
    } else {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      category.forEach((cat, index) => {
        formData.append(`categories[${index}]`, cat);
      });
      formData.append("image", file);
      const response = await postCreateApi(formData);
      if (
        response.error &&
        response.error.data &&
        response.error.data.status === false
      ) {
        toast(response.error.data.message);
      } else {
        navigate("/");
        toast(response.data.message);
        await refetchAllPost();
      }
    }
  };

  return (
    <div className="container mx-auto px-20 py-2">
      <div>
        <p className="text-2xl font-bold py-5 ">Create a blog</p>
        {/* form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            className="bg-transparent border-red-500 border-b-2 focus:outline-none rounded-md px-3 "
          />

          <div>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              className="bg-transparent border-red-500 border-b-2 focus:outline-none  rounded-md px-3 "
            />
          </div>
          {/* category input */}
          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="text"
              placeholder="categories"
              className="bg-transparent border-red-500 border-b-2 focus:outline-none  rounded-md px-3 "
              value={cat}
              onChange={(e) => setCat(e.target.value)}
            />
            <button
              className="bg-white text-black px-4 py-1 rounded-md"
              onClick={handleCategory}
            >
              Add
            </button>
          </div>
          {/* category list */}
          <div className="flex flex-wrap gap-3">
            {category.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-white text-black px-2  rounded-2xl flex gap-4 justify-center items-center "
                >
                  <h1>{item}</h1>
                  <RxCross2 onClick={() => deleteCategoryItem(item)} />
                </div>
              );
            })}
          </div>
          <textarea
            rows="4"
            cols="50"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Description"
            className="bg-transparent border-red-500 border-b-2 focus:outline-none  rounded-md px-3 "
          />
          <button className="bg-red-500 p-2 w-36 rounded-full">Save</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
