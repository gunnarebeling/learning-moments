import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteLike, getLikes } from "../../services/LIkes"

export const Favorites = ({ currentUser}) => {
    const [likedPosts, setLikedPosts] = useState([])
    const [likes, setLikes] = useState([])
    const navigate = useNavigate()
    const getAndSetLikes = () => {
        getLikes().then((likesArray) => {
            setLikes(likesArray)
        })
    }
    const getAndSetLikedPosts = () => {
    
            const filteredLIkes = likes.filter(post => post.usersId === currentUser.id && post.liked)
            const favoritePosts = filteredLIkes.map(like =>{
             const justPost = like?.posts
             return justPost
            }) 
            setLikedPosts(favoritePosts)
    }
    useEffect(() => {
        getAndSetLikes()
        
    }, [])
    useEffect(() => {
        getAndSetLikedPosts()

    }, [likes, currentUser ])
    const handlePostClick = (event) => {
        navigate(`/${event.target.dataset.id}`)
    }
    const handleDeleteLike = (event) => {
        const likeObj = likes.find(like => like.usersId === currentUser.id && like.postsId === parseInt(event.target.dataset.id))
        deleteLike(likeObj).then(()=>{
            getAndSetLikes()

        })
    }

    return (
        <div>
            <div className="text-center p-3">
                <header className="display-6">Favorites</header>
            </div>
        {likedPosts?.map(post => {
            return (
                <div className="post card shadow my-4 p-3 border" key={post.id}>
                    <div className="d-flex justify-content-between">
                            
                            <div className="post-title display-6" onClick={handlePostClick} data-id={`${post.id}`} >{post.title} </div>
                            
                        
                        <div>
                            <button className="btn btn-warning" onClick={handleDeleteLike} data-id={`${post.id}`} >Delete</button>
                        </div>
                    </div> 
                </div>
            )
        })}
        </div>  
    )
}