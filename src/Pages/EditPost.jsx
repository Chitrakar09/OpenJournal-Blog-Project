import { useState, useEffect } from 'react'
import databaseService from '../appwrite/databaseConfig'
import { useParams, useNavigate } from 'react-router'
import { Container, PostEditForm } from '../components';

function EditPost() {
    const [ posts, setPosts ] = useState(null);
    const postId = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (postId) {
            databaseService.getPost(postId).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate("/allPost");
        }

    }, [ postId, navigate ])

    return posts ? (
    <Container>
        <PostEditForm post={posts}/>
    </Container>):(
        <Container>
            <p className='text-white text-5xl'>Post not found</p>
        </Container>
    )
}

export default EditPost