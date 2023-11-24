import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
function CreatePost() {
  const [category, setCategory] = useState([]);
  const [cat, setCat] = useState("");
  const handleCategory = (e) => {
    e.preventDefault();
    if (!cat) {
      console.log("gey");
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
  return (
    <div className="container mx-auto px-20 py-2">
      <div>
        <p className="text-2xl font-bold py-5 ">Create a blog</p>
        {/* form */}
        <form action="" className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            className="bg-transparent border-red-500 border-b-2 focus:outline-none rounded-md px-3 "
          />

          <input
            type="file"
            className="bg-transparent border-red-500 border-b-2 focus:outline-none  rounded-md px-3 "
          />
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
            {category.map((item) => {
              return (
                <div className="bg-white text-black px-2 py-1 rounded-2xl flex gap-4 justify-center items-center ">
                  <h1>{item}</h1>
                  <RxCross2 onClick={() => deleteCategoryItem(item)} />
                </div>
              );
            })}
          </div>
          <input
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
