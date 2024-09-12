import { useEffect, useState } from "react"
import { getTopics } from "../../services/getTopics"
import { submitNewPost } from "../../services/postservices"
import {  useNavigate } from "react-router-dom"

export const PostForm = ({currentUser}) => {
    const [allTopics, setAllTopics] = useState([])
    const [selectedTopic, setSelectedTopic] = useState(1)
    const [title, setTitle] = useState("")
    const [ body, setBody] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        getTopics().then(topicObj => {
            setAllTopics(topicObj)
        })
    }, [])
    const handleTopicChange = (event) => {
        const selectedValue = parseInt(event.target.value)
        setSelectedTopic(selectedValue)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const newPostData ={
            usersId: currentUser.id,
            title: title,
            description: body.split(" ").slice(0, 5).join(" "),
            date: new Date(),
            topicsId: selectedTopic,
            body: body

        }
        submitNewPost(newPostData)
        navigate(`/myposts`)

    }
    return (
        <>
        <div className="title-container text-center mt-4">
            <header className="header-container display-4">Create New Post</header>
        </div>
        <div className="form-container card p-2 m-2 shadow">
            <form className="post-form ">
                <div className="fieldcontent">
                    <fieldset>
                        <div className="form-group text-center my-4">
    
                            <div className="m-2 h3">Topic </div>
                            <select name="topics" onChange={handleTopicChange} id="topics">
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
                            <div className="m-2 h3" >Title</div>
                            <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
                        </div>
                    </fieldset>
                        <fieldset>
                            <div className="form-group text-center my-4">
                                <div className="m-2 h3" >Body</div>
                                <div className="mx-5">
                                <textarea className="form-control" rows="5" type="text" value={body} onChange={(event) => setBody(event.target.value)}/>

                                </div>
                            </div>

                        </fieldset>
                        <fieldset>
                            <div className="submit-btn-container text-center">
                                <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                            </div>
                        </fieldset>
                </div>
            </form>
        </div>
        </>
    )
}