
import { Link } from "react-router-dom"
import { Likes } from "./Likes"

export const Posts = ({filteredPosts, likes}) => {
    
    return (
        <div>
            {filteredPosts.map(post => {
                return (
                    <div className="post card shadow my-4 p-3 border" key={post.id}>
                        <div className="d-flex justify-content-between">
                            <Link to={`/${post.id}`}>
                                <div className="post-title display-6">{post.title}</div>
                            </Link>
                            <Likes likes={likes} post={post}/>
                        </div>
                        <div className="border rounded mt-3 p-2">{post.description}</div>
    
                    </div>
                )
            })}
        </div>
    )
}