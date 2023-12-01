import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import {
  useAllPostQuery,
  useMyPostQuery,
  useUpdatePostMutation,
} from "../redux/Api/PostApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function CustomModal({ close, blogitem }) {
  const navigate = useNavigate();
  const state = useSelector((state) => state.token);
  const [category, setCategory] = useState([]);
  const [cat, setCat] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  // // api
  const { refetch: fetchAPi, error, data } = useMyPostQuery();

  const handleCategory = (e) => {
    e.preventDefault();
    if (!cat) {
      console.log("hey");
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
  useEffect(() => {
    if (blogitem) {
      setTitle(blogitem.title);
      setDescription(blogitem.description);
      setFile(blogitem.image);
      setCategory(blogitem.categories);
    }
  }, [blogitem]);

  const hanldeUpdate = async (e) => {
    e.preventDefault();
    const dataform = new FormData();
    dataform.append("title", title);
    dataform.append("description", description);
    category.forEach((cat, index) => {
      dataform.append(`categories[${index}]`, cat);
    });
    dataform.append("image", file);
    try {
      const response = await fetch(
        `http://localhost:8000/api/post/update/${blogitem._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + state?.token,
          },
          body: dataform,
        }
      );
      const result = await response.json();
      console.log(result);
      blogitem = result.data;
      if (result.status == true) {
        toast(result.message);
        await fetchAPi();
        close();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center  bg-black/40 fixed inset-0">
      <div className="bg-white w-1/3 p-10 rounded-lg flex flex-col items-center ">
        <p className="text-2xl text-black font-bold">Update Blog</p>
        <form className="flex flex-col gap-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            className="text-black bg-transparent border-red-500 border-b-2 focus:outline-none rounded-md px-3 "
          />

          <div>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              className="text-black bg-transparent border-red-500 border-b-2 focus:outline-none  rounded-md px-3 "
            />
          </div>
          {/* category input */}
          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="text"
              placeholder="categories"
              className="text-black bg-transparent border-red-500 border-b-2 focus:outline-none  rounded-md px-3 "
              value={cat}
              onChange={(e) => setCat(e.target.value)}
            />
            <button
              className=" bg-red-500 text-white px-4 py-1 rounded-md"
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
                  className="bg-black text-white px-2  rounded-2xl flex gap-4 justify-center items-center "
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
            className="text-black bg-transparent border-red-500 border-b-2 focus:outline-none  rounded-md px-3 "
          />
          <div className="mx-auto space-x-5">
            <button
              type="button"
              onClick={hanldeUpdate}
              className="bg-red-500 px-2 py-1 w-36 rounded-full"
            >
              Update
            </button>
            <button
              type="button"
              onClick={close}
              className="bg-red-500 px-2 py-1 w-36 rounded-full "
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomModal;
