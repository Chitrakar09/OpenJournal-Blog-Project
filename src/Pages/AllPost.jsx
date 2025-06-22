import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BlogCard, Button, Container, Loader } from "../components";
import databaseService from "../appwrite/databaseConfig";
import { Link } from "react-router";

function AllPost() {
  const [ posts, setPosts ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  const userData = useSelector((state) => state.Auth.userData);

  useEffect(() => {

    // If userData is undefined, we're still loading auth
    if (userData === undefined) {
      setLoading(true);
      return;
    }

    // If userData is empty array or null, user is not authenticated
    if (!userData || (Array.isArray(userData) && userData.length === 0)) {
      setLoading(false);
      setPosts([]);
      return;
    }

    // We have valid userData, fetch posts
    setLoading(true);

    async function fetchPosts() {
      try {
        // Handle both array and object userData structures
        let userId;
        if (Array.isArray(userData)) {
          userId = userData[ 0 ]?.userData?.$id || userData[ 0 ]?.$id;
        } else {
          userId = userData.userData?.$id || userData.$id;
        }

        if (!userId) {
          setPosts([]);
          return;
        }

        const allPosts = await databaseService.getAllPost(userId);
        setPosts(allPosts?.documents || []);
      } catch (error) {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [ userData ]);

  // Show loader while userData is undefined (auth loading)
  if (userData === undefined) {
    return (
      <Container>
        <div className="w-full h-screen flex justify-center items-center">
          <Loader />
        </div>
      </Container>
    );
  }

  // Check if user is authenticated
  const isAuthenticated = userData &&
    ((Array.isArray(userData) && userData.length > 0) ||
      (typeof userData === 'object' && userData !== null && !Array.isArray(userData)));

  return (
    <Container>
      <div className="w-full min-h-screen bg-[#ffffff] py-8 px-4 md:px-8 rounded-2xl flex flex-col">
        <h1 className="text-4xl font-bold text-[#14213d] text-center mb-8 tracking-tight">
          Latest <span className="text-[#fca311]">Posts</span>
        </h1>

        {!isAuthenticated ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <h2 className="text-2xl text-[#14213d] font-semibold">
                Please log in to view posts
              </h2>
            </div>
          </div>
        ) : loading ? (
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
          <div className="flex flex-col justify-center items-center h-64">
            <h2 className="text-2xl text-[#14213d] font-semibold mb-4">
              No posts available.
            </h2>
            <Link to={'/addPost'}>
              <Button
                text="Create a Post"
                type="button"
                use="createPost"
                bgColor="bg-[#14213d]"
                hoverColor="hover:bg-[#fca311]"
                activeColor="active:bg-[#0f1b2e]"
              />
            </Link>
          </div>
        )}
      </div>
    </Container>
  );
}

export default AllPost;