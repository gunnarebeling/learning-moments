import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllPosts, updatePost } from "../../services/postservices"
import { getTopics } from "../../services/getTopics"

export const EditPost = () => {
    const [currentPost, setCurrentPost] = useState({})
    const [editedPost, setEditedPost] = useState({title: currentPost.title,})
    const [allTopics, setAllTopics] = useState([])
    const {postId} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        getAllPosts().then(postsObj => {
            const foundPost = postsObj.find(post => post.id === parseInt(postId) )
            setCurrentPost(foundPost)})
            

    }, [postId])

    useEffect(() => {
        getTopics().then(topicObj => {
            setAllTopics(topicObj)
        })
    }, [])
    useEffect(() =>{
        const postCopy = {
            id: currentPost.id,
            description: currentPost.description,
            topicsId: currentPost.topicsId,
            usersId: currentPost.usersId,
            date: currentPost.date,
            title: currentPost.title,
            body: currentPost.body
        }
        setEditedPost(postCopy)

    }, [currentPost])
    const handleTopicChange = (event) => {
        const postCopy = {...editedPost}
        postCopy.topicsId = parseInt(event.target.value)
        setEditedPost(postCopy)
        
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        updatePost(editedPost)
        navigate('/myposts')
    }

    return (
        <div className="Postedit-container text-center">
            <div className="title-container text-center mt-4">
                <header className="header-container display-4">Edit Post</header>
            </div>
            <form >
                <fieldset>
                    <div className="form-group text-center my-4">

                        <div className="m-2 h3"> change Title </div>
                        <input 
                            type="text"
                            value ={`${editedPost.title}`}
                            onChange={(event) =>{
                                const postCopy = {...editedPost}
                                postCopy.title = event.target.value
                                setEditedPost(postCopy)
                                }
                            }
                        />
                    </div>
                </fieldset>
                <fieldset>
                        <div className="form-group text-center my-4">
    
                            <div className="m-2 h3">Topic </div>
                            <select name="topics" value={editedPost.topicsId} onChange={handleTopicChange} id="topics">
                                {allTopics.map(topic =>{
                                    return (
                                        <option value={topic.id} key={topic.id}>{topic.topic}</option> 
                                    )
                                })}
                            </select>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group text-center my-4">
                            <div className="m-2 h3" >Body</div>
                            <div className="mx-5">
                            <textarea 
                            className="form-control" 
                            rows="5" 
                            type="text" 
                            value={editedPost.body} 
                            onChange={(event) =>{
                                const postCopy = {...editedPost}
                                postCopy.body = event.target.value
                                setEditedPost(postCopy)
                            }} />

                            </div>
                        </div>

                    </fieldset>
                    <fieldset>
                        <div className="submit-btn-container text-center">
                            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                        </div>
                    </fieldset>

            </form>

        </div>
    )
}