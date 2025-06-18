import React from "react";
import databaseService from "../../appwrite/databaseConfig";
import parse from'html-react-parser'
import { Link } from "react-router";
const BlogCard = ({ post }) => {
  const imageUrl = post.imageId ? databaseService.getFilePreview(post.imageId) : 'placeholder.png';
  return (
    <div className="flex flex-col w-full h-full">
      <img
        src={imageUrl}
        alt={post.title}
        className="w-full h-48 object-cover object-center rounded-t-xl"
      />
      <div className="w-full flex-1 p-4 flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold text-[#14213d] mb-2">{post.title}</h2>
        <div className="text-[#000000] flex-1 mb-4 line-clamp-3">{parse(post.content)}</div>
        <Link to={`/post/${post.$id}`} className="mt-auto inline-block bg-[#fca311] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#14213d] hover:text-[#fca311] transition-colors duration-200">Read More</Link>
      </div>
    </div>
  );
};

export default BlogCard;

