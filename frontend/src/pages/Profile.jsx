import React from "react";
import MyPost from "../components/MyPost";
import { useSelector } from "react-redux";
import { useMyPostQuery } from "../redux/Api/PostApi";
import { useMyDataQuery } from "../redux/Api/UserApi";

function Profile() {
  const state = useSelector((state) => state.token);
  const { data: mypostData } = useMyPostQuery();
  const { data: MyInfo } = useMyDataQuery(state?.token);
  return (
    <div className="container mx-auto px-10 md:px-20">
      <div className=" flex flex-col md:flex-row my-4 gap-5">
        {/* left */}
        <div className="md:w-[70%]">
          <p>My Posts:</p>
          {mypostData?.post.map((item, index) => {
            return <MyPost key={index} blog={item} />;
          })}
        </div>
        {/* right */}
        <div className="md:w-[30%] ">
          <div className="md:sticky md:top-16">
            <p>Profile:</p>
            <div className="flex flex-col ">
              <div className="flex flex-col mt-5 text-gray-300">
                Username:
                <input
                  disabled
                  defaultValue={MyInfo?.user.username}
                  type="text"
                  placeholder="Username"
                  className="bg-transparent border-red-500 border-b-2 focus:outline-none  "
                />
              </div>
              <div className="flex flex-col mt-5 text-gray-300">
                Email:
                <input
                  disabled
                  defaultValue={MyInfo?.user.email}
                  type="text"
                  placeholder="Email"
                  className="bg-transparent border-red-500 border-b-2 focus:outline-none  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
