import React from "react";
import HomePost from "../components/HomePost";
import MyPost from "../components/MyPost";

function Profile() {
  return (
    <div className="container mx-auto px-25 md:px-20">
      <div className=" flex my-4 gap-5">
        {/* left */}
        <div className="w-[70%]">
          <p>My Posts:</p>
          <MyPost />
          <MyPost />
          <MyPost />
          <MyPost />
          <MyPost />
          <MyPost />
        </div>
        {/* right */}
        <div className="w-[30%] ">
          <div className="md:sticky md:top-16">
            <p>Profile</p>
            <form action="" className="flex flex-col ">
              <input
                type="text"
                placeholder="Username"
                className="bg-transparent border-red-500 border-b-2 focus:outline-none rounded-md px-3 mt-5"
              />
              <input
                type="text"
                placeholder="Email"
                className="bg-transparent border-red-500 border-b-2 focus:outline-none rounded-md px-3 mt-5"
              />
              <input
                type="text"
                placeholder="Password"
                className="bg-transparent border-red-500 border-b-2 focus:outline-none rounded-md px-3 mt-5 "
              />
              <button className="bg-red-500 px-4 py-1 w-32 mx-auto mt-2 rounded-lg">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
