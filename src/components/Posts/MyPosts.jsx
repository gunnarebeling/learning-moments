import { useEffect, useState } from "react"
import { deletePost, getAllPosts } from "../../services/postservices"
import { useNavigate } from "react-router-dom"


export const MyPosts = ({currentUser}) => {
    const [usersPosts, setUsersPosts] = useState([])
    const navigate = useNavigate()
    const getAndSetPosts = () => {
        getAllPosts().then(postObj => {
            const userPostsdata = postObj.filter( post => post.usersId === currentUser.id)
            setUsersPosts(userPostsdata)
        })
    }

    useEffect(() => {
        if (currentUser) {
            getAndSetPosts()
            
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser])
    const handlePostClick = (event) => {
        navigate(`/${event.target.dataset.id}`)
    }
    const handleDeletePost = (event) => {
        deletePost(parseInt(event.target.dataset.id))
        getAndSetPosts()
    }


    return (
        <>

            <div className="container">
                {/* <FilterSection setSelectedTopic={setSelectedTopic} setTextValue={setTextValue} textValue={textValue}/> */}
            </div>
            <div className="all-posts-container container">
                {
                
                usersPosts.map(post => {
                    return (

                        <div className="post card shadow my-4 p-3 border" key={post.id}>
                            <div className="d-flex justify-content-between">
                                    
                                    <div className="post-title display-6" onClick={handlePostClick} data-id={`${post.id}`} >{post.title} </div>
                                    
                                
                                <div>
                                    <button className="btn btn-warning" onClick={handleDeletePost} data-id={`${post.id}`} >Delete</button>
                                </div>
                            </div> 
                        </div>  
                    )
                })
                }
            </div>
        
        </>
    )
}