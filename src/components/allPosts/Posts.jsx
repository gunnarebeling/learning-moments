export const Posts = ({allPosts, Likes, likes}) => {
    return (
        <div>
            {allPosts.map(post => {
                return (
                    <div className="post card shadow my-4 p-3 border" key={post.id}>
                        <div className="d-flex justify-content-between">
                            <div className="post-title display-6">{post.title}</div>
                            <Likes likes={likes} post={post}/>
                        </div>
                        <div className="border rounded mt-3 p-2">{post.description}</div>
    
                    </div>
                )
            })}
        </div>
    )
}