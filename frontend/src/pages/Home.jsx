import React, { useEffect, useState } from "react";
import HomePost from "../components/HomePost";
import { useAllPostQuery } from "../redux/Api/PostApi";

function Home() {
  const { refetch, data: blog } = useAllPostQuery();
  useEffect(() => {
    refetch();
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
