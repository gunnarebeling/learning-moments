import { useEffect, useState } from "react"
import { Link,  useNavigate,  useParams } from "react-router-dom"
import { getAllPosts } from "../../services/postservices"
import { getLikes, postLike, updateLike } from "../../services/LIkes"
import { Likes } from "./Likes"
import { getUserById } from "../../services/Users"

export const PostDetails = ({currentUser}) => {
    const [currentPost, setCurrentPost] = useState({})
    const [likes, setLikes] = useState([])
    const [postAuthor, setPostAuthor] = useState({})
    const {postId} = useParams()
    const navigate = useNavigate()
    
    const getAndSetLikes = () => {
        getLikes().then(likesObj => {
            setLikes(likesObj)
        })
    }
    useEffect(() => {
       getAllPosts().then(postsObj => {
        const foundPost = postsObj.find(post => post.id === parseInt(postId) )
        setCurrentPost(foundPost)
    }).then(()=>{
    })
    getAndSetLikes()
} , [postId])
useEffect(() => {
    if (!(Object.keys(currentPost).length === 0)) {
        getUserById(currentPost?.usersId).then(res => {
            const userObj = res
            setPostAuthor(userObj)
        })
        
    }
    }, [currentPost])

    const handleLikeClick = () =>{
        
        const matchedLike = likes.find(like => (like.usersId === currentUser.id) && (currentPost.id === like.postsId))
        if (matchedLike) {
            let copy = {
                id: matchedLike.id,
                usersId: matchedLike.usersId,
                postsId: matchedLike.postsId,
                liked: !matchedLike.liked,
            }
            
            updateLike(copy).then(() => {
                getAndSetLikes()
            })


            
        }else{

            const likeData = 
            {
                usersId: currentUser.id,
                postsId: currentPost.id,
                liked: true
            }
            postLike(likeData).then(() =>{
                getAndSetLikes()
            })
        }
        navigate('/favorites')
        
    }
    
    return (
        <div className="post-container">
            <div className="post card mx-3 shadow my-4 p-3 border" >
                <div className="d-flex justify-content-between">
                    
                    <div className="post-title display-6">{currentPost.title}</div>
                   <span>
                    <Likes likes={likes} post={currentPost}/>
                    {((currentPost.usersId === currentUser?.id)? 
                        <Link to={`edit`}>
                            <button >Edit</button>
                        </Link>: 
                        <button onClick={handleLikeClick}>Like</button>) }
                    

                   </span>
                </div>
                <div className="post-info">
                    <div className="author">
                        <div><span onClick={() => navigate(`/profile/${postAuthor.id}`)}>author: {postAuthor.fullName}</span></div>
                    </div>
                    <div className="topic">
                        <div><span>Topic: {currentPost.topics?.topic}</span></div>                        
                    </div>
                </div>
                <div className="body-container border rounded border-2 mt-2 p-2">
                    <p>{currentPost.body}</p>
                </div>

            </div>
        </div>
    )
}