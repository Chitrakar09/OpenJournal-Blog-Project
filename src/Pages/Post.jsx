import { useState, useEffect } from "react"
import databaseService from "../appwrite/databaseConfig"
import { Link, useNavigate, useParams } from "react-router"
import { Button, Container } from "../components"
import { useSelector } from "react-redux"
import parse from "html-react-parser"

function Post() {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.Auth.userData);
    const postId = useParams();
    const [ Post, setPost ] = useState(null);

    // to check if its author or not
    const isAuthor = Post && userData ? Post.userId === userData.$id : false;

    //obtain post
    useEffect(() => {
        if (postId) {
            databaseService.getPost(postId).then((post) => {
                if (post) setPost(post);
                else navigate("/allPost");
            })
        }
        else navigate("/allPost");

    }, [ postId, navigate ])

    //delete post
    const deletePost = () => {
        databaseService.deletePost(postId).then((isDeleted) => {
            if (isDeleted) {
                databaseService.deleteFile(Post.imageId);
                navigate("/allPost");
            }
        })
    }
    return Post ? (
        <div className="min-h-screen bg-gradient-to-b from-[#14213d] to-black text-white px-4 py-10">
            <div className="max-w-full mx-auto bg-[#14213d] p-8 rounded-2xl shadow-lg">

                {/* Post Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#fca311]">{Post.title}</h1>
                        <p className="text-lightGray mt-2 text-sm">{`By ${Post.userId}`}</p>
                    </div>
                    {/* Buttons */}
                    {isAuthor && (
                        <div className="flex gap-2">
                            <Link to={"/editPost"}>
                                <Button type="button" text="Edit" use="edit" bgColor="bg-[#fca311]" hoverColor="hover:bg-orange-400" className="text-black" />
                            </Link>
                            <button onClick={() => deletePost()} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition">Delete</button>
                        </div>
                    )}
                </div>

                {/* Post Image */}
                {Post.imageId ? (
                    <div className="mt-8">
                        <img
                            src={databaseService.getFilePreview(Post.imageId)}
                            alt="Blog Post"
                            className="w-full h-64 object-cover object-center rounded-xl shadow-md"
                        />
                    </div>) : null
                }

                {/* Post Content */}
                <div className="mt-8 space-y-4 text-lightGray leading-relaxed">
                    {parse(Post.content)}
                </div>

            </div></div>
    ) : (
        <Container>
            <p className="text-white text-5xl">Post not found</p>
        </Container>
    )
}

export default Post