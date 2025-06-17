import { useState, useEffect } from 'react'
import { BlogCard, Container, Loader } from '../components'
import databaseService from '../appwrite/databaseConfig'


function AllPost() {
    const [ Posts, setPosts ] = useState(null);
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {

        async function fetchPosts() {
            setLoading(true)
            try {
                const allPosts = await databaseService.getAllPost()
                setPosts(allPosts)
            } catch (error) {
                setPosts([])
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchPosts()

    }, [])




    return (
        <Container>
            {loading ? (<><Loader /></>) : Posts.documents.length !== 0 ? (
                <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 lg:px-16 py-6 place-items-center">
                    {Posts.documents.map((Post) => (
                        <div key={Post.id} className='w-full h-full'>
                            <BlogCard {...Post} />
                        </div>
                    ))}
                </div>) : (<h2 className='text-3xl text-white text-center w-full font-bold'>No posts available.</h2>
            )
            }


        </Container>
    )
}

export default AllPost