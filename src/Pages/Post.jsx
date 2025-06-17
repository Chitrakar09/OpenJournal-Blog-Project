import { useState, useEffect } from "react"
import databaseService from "../appwrite/databaseConfig"
import { Link, useNavigate, useParams } from "react-router"
import { Button, Container, Loader } from "../components"
import { useSelector } from "react-redux"
import parse from "html-react-parser"

function Post() {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.Auth.userData);
    const { postId } = useParams();
    const [ Post, setPost ] = useState(null);
    const [ loading, setLoading ] = useState(null);
    const [ url, setUrl ] = useState(null);

    // to check if its author or not
    const isAuthor = Post && userData ? Post.userId === userData.$id : false;



    //obtain post
    useEffect(() => {
        setLoading(true);
        if (postId) {
            databaseService.getPost(postId).then((post) => {
                if (post) {
                    setPost(post);
                    setLoading(false);
                }
                else navigate("/allPost");
            })
        }
        else navigate("/allPost");
        
    }, [ postId, navigate ])

    useEffect(() => {
        const getImageUrl = async () => {
            if (Post && Post.imageId) {
                const imagesId = databaseService.getFilePreview(Post.imageId);
                setUrl(imagesId);
            }
        }
        getImageUrl()
    }, [ Post ])

    //delete post
    const deletePost = () => {
        databaseService.deletePost(postId).then((isDeleted) => {
            if (isDeleted) {
                databaseService.deleteFile(Post.imageId);
                navigate("/allPost");
            }
        })
    }


    return (
        loading ? (<Container className="justify-center"><Loader /></Container>) : (
            Post ? (
                <div className="min-h-screen bg-gradient-to-b from-[#14213d] to-black text-white px-2 py-6 md:px-6 md:py-10 flex items-start justify-center w-full">
                    <div className="w-full bg-[#14213d] rounded-3xl shadow-2xl overflow-hidden border border-[#e5e5e5]/10">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-6 pt-6">
                            {/* title */}
                            <div>
                                <h1 className="text-2xl md:text-4xl font-extrabold text-[#fca311] break-words">
                                    {Post.title || "Untitled"}
                                </h1>
                                <p className="text-[#e5e5e5] mt-1 text-xs md:text-sm">
                                    By {Post.userId || "Unknown"} • Unknown Date
                                </p>
                            </div>
                            {/* Buttons */}
                            {isAuthor && (
                                <div className="flex gap-2">
                                    <Link to={`/editPost/${Post.$id}`}>
                                        <Button type="button" text="Edit" use="edit" bgColor="bg-[#fca311]" hoverColor="hover:bg-orange-400" className="text-black" />
                                    </Link>
                                    <button onClick={() => deletePost()} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition">Delete</button>
                                </div>
                            )}
                        </div>

                        {/* Image or Placeholder */}
                        <div className="mt-6 w-full h-48 md:h-64 bg-[#000000] flex items-center justify-center relative">
                            {url ? (
                                <img
                                    src={url}
                                    alt="Blog Post"
                                    className="w-full h-full object-contain object-center rounded-xl shadow-md transition"
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

                        {/* Content */}
                        <div className="px-6 py-8 space-y-4 text-[#e5e5e5] leading-relaxed">

                            <div
                                className="text-base md:text-lg break-words"
                                style={{
                                    color: "#e5e5e5",
                                    background: Post.content.length < 20 ? "#00000022" : "transparent",
                                    borderRadius: Post.content.length < 20 ? "0.5rem" : "0",
                                    padding: Post.content.length < 20 ? "0.5rem 1rem" : "0",
                                    display: Post.content.trim() ? "block" : "none",
                                }}
                            >
                                {parse(Post.content) || ""}
                            </div>

                        </div>
                    </div>
                </div>

            ) : (<Container>
                <h3 className="text-center text-5xl text-amber-100">Post not found</h3>
            </Container>)
        )
    )
}

export default Post