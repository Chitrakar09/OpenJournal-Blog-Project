import React from "react";
import databaseService from "../../appwrite/databaseConfig";
import { Link } from "react-router";
const BlogCard = ({ $id, imgId, title }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div
        className="
      bg-[#14213d]
      text-white 
      rounded-xl 
      overflow-hidden 
      shadow-[0_4px_8px_rgba(252,163,17,0.15)]
      hover:shadow-[0_8px_16px_rgba(252,163,17,0.2)]
      transition-transform 
      hover:scale-105 
      w-full
      h-full
      flex flex-col
    "
      >
        <img
          src={databaseService.getFilePreview(imgId)}
          alt={title}
          className="w-full h-44 object-cover"
        />
        <div className="p-4 flex-1 flex items-center">
          <h2 className="text-base md:text-lg font-semibold text-[#fca311] leading-snug line-clamp-2">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;

/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 lg:px-16 py-6 place-items-center">
          {sampleBlogs.map((blog, index) => (
            <BlogCard key={index} title={blog.title} imageUrl={blog.imageUrl} />
          ))}
        </div> */
