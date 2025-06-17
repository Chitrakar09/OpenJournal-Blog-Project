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
      items-center
      justify-evenly
    "
      >
        <div className="mt-6 w-full h-full md:h-64 bg-[#000000] flex items-center justify-center relative">
                            {imgId ? (
                                <img
                                    src={imgId}
                                    alt="Blog Post"
                                    className="w-full h-full object-cover object-center rounded-xl shadow-md transition"
                                />
                            ) : (
                                <div className="flex flex-col items-center px-6 justify-center w-full h-full text-[#e5e5e5]">
                                    <svg
                                        className="w-12 h-12 mb-2 text-[#fca311]"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8 11l4 4 4-4"
                                        />
                                    </svg>
                                    <span className="text-sm">No image attached</span>
                                </div>
                            )}
                        </div>
        <div className="p-4 flex-1 flex items-center">
          <h2 className="text-base md:text-lg font-semibold text-[#fca311] leading-snug line-clamp-2 w-full">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;

