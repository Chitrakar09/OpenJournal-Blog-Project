import { useState } from 'react'
import { BlogCard, Container } from '../components'
import databaseService from '../appwrite/databaseConfig'


function AllPost() {
    const [ posts, setPosts ] = useState(null);
    databaseService.getAllPost([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents);
        }
    })

    return (
        <Container>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 lg:px-16 py-6 place-items-center">
                {posts.map((post) => (
                    <div key={post.id}>
                        <BlogCard {...post} />
                    </div>
                ))}
            </div>

        </Container>
    )
}

export default AllPost