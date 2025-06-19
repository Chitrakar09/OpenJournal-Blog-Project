import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BlogCard, Container, Loader } from "../components";
import databaseService from "../appwrite/databaseConfig";

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const userData = useSelector((state) => state.Auth.userData);
  const userId = userData?.userData?.$id;

  useEffect(() => {
    if (!userId) {
      return;
    }

    setLoading(true);
    async function fetchPosts() {
      try {
        const allPosts = await databaseService.getAllPost(userId);
        setPosts(allPosts?.documents || []);
      } catch (error) {
        setPosts([]);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [userId]);

    if (!userData) {
    return (
      <Container>
        <div className="w-full h-screen flex justify-center items-center">
          <Loader />
        </div>
      </Container>
    );
  }


  return (
    <Container>
      <div className="w-full min-h-screen bg-[#ffffff] py-8 px-4 md:px-8 rounded-2xl flex flex-col">
        <h1 className="text-4xl font-bold text-[#14213d] text-center mb-8 tracking-tight">
          Latest <span className="text-[#fca311]">Posts</span>
        </h1>
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loader />
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="bg-[#e5e5e5] rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <h2 className="text-2xl text-[#14213d] font-semibold">
              No posts available.
            </h2>
          </div>
        )}
      </div>
    </Container>
  );
}

export default AllPost;