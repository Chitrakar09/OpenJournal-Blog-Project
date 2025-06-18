import { useState, useEffect } from 'react'
import databaseService from '../appwrite/databaseConfig'
import { useParams, useNavigate } from 'react-router'
import { Container, PostEditForm, Loader } from '../components';

function EditPost() {
    const [ posts, setPosts ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const { postId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getPostInfo = async () => {
            if (postId) {
                try {
                    await databaseService.getPost(postId).then((post) => {
                        if (post) {
                            setPosts(post)
                        }
                    })
                } catch (error) {
                    console.error("Error fetching post:", error);
                    setError(error);
                } finally { setLoading(false) }
            } else {
                navigate("/allPost");
            }
        }
        getPostInfo();

    }, [ postId, navigate ])


    return loading ? (
        <Container className='justify-center'><Loader /></Container>
    ) : (
        error ? (
            <Container>
                <p className="w-full text-center text-sm p-5 text-red-600 font-medium mb-4 bg-red-100 border border-red-300 rounded px-3 py-2">{error}</p>
            </Container>) :
            (posts ? (
                <Container>
                    <PostEditForm post={posts} />
                </Container>) :
                (
                    <Container className='justify-center'>
                        <p className='text-5xl text-center text-white'>Post not found</p>
                    </Container>)
            )
    )
}

export default EditPost