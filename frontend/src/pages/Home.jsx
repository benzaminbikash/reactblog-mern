import React, { useEffect, useState } from "react";
import HomePost from "../components/HomePost";
import { useAllPostQuery } from "../redux/Api/PostApi";
import { useNavigate } from "react-router-dom";

function Home() {
  const { refetch, data: blog, isLoading } = useAllPostQuery();
  useEffect(() => {
    refetch();
  }, []);

  const navigate = useNavigate();

  const isToken = window.localStorage.getItem("auth");
  useEffect(() => {
    if (!isToken) {
      navigate("/login");
      console.log("Test");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="container mx-auto  px-10 md:px-20 ">
      <div>
        {blog?.post.map((item) => {
          return <HomePost blogs={item} key={item._id} />;
        })}
      </div>
    </div>
  );
}

export default Home;
