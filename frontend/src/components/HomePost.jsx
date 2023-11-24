import React from "react";
import { Link } from "react-router-dom";

function HomePost() {
  return (
    <div className="mt-10 flex flex-col md:flex-row  md:gap-7  px-20 md:px-0">
      {/* left */}
      <div className="md:w-1/3 md:h-[200px] ">
        <Link to="/post/1">
          <img
            className="w-full h-full object-fill mx-auto hover:scale-105 duration-700 transition-all "
            src="https://chatai.com/wp-content/uploads/2023/11/tr71123-ai-art.jpeg"
            alt="/"
          />
        </Link>
      </div>
      {/* right */}
      <div className="md:w-2/3">
        <h1 className="text-2xl font-bold mt-5 md:mt-0">
          Artifical Inteligence
        </h1>
        <div className="flex justify-between py-1">
          <p className="text-gray-500">Reshma Ghimire</p>
          <p className="text-gray-500">2021-21-11</p>
        </div>
        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia,
          quam in ut quis, voluptates sequi maiores accusantium id nesciunt
          consectetur amet fuga, omnis quasi. Ipsam deleniti asperiores
          architecto minima voluptatum? Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Mollitia, quam in ut quis, voluptates sequi maiores
          accusantium id nesciunt consectetur amet fuga, omnis quasi. Ipsam
          deleniti asperiores architecto minima voluptatum? Lorem ipsum dolor
          sit amet, consectetur adipisicing elit. Mollitia, quam in ut quis,
          voluptates sequi maiores accusantium id nesciunt consectetur amet
        </p>
      </div>
    </div>
  );
}

export default HomePost;
