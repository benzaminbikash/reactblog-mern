import React, { useEffect, useState } from "react";
import HomePost from "../components/HomePost";
import { useAllPostQuery } from "../redux/Api/PostApi";

function Home() {
  const { data: blog } = useAllPostQuery();
  return (
    <div className="container mx-auto  px-25  md:px-20 ">
      <div>
        {blog?.post.map((item) => {
          return <HomePost blogs={item} key={item._id} />;
        })}
      </div>
    </div>
  );
}

export default Home;
