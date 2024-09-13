import { useEffect } from "react"
import { useState } from "react"
import { getAllPosts } from "../../services/postservices"
import { getLikes } from "../../services/LIkes"
import { Likes } from "./Likes"
import { Posts } from "./Posts"
import { FilterSection } from "./filtersection/FilterSection"

export const PostList = ()=> {
    const [allPosts, setAllPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [likes, setLikes] = useState([])
    const [selectedTopic, setSelectedTopic] = useState()
    const [textValue, setTextValue] = useState("")
    const [filteredTopic, setFilteredTopic] = useState()

    useEffect(() => {
        getAllPosts().then(postsArray => setAllPosts(postsArray))
        getLikes().then(likesArray => setLikes(likesArray))
    }, [])
    useEffect(() => {
        setFilteredPosts(allPosts)


    },[allPosts])
    useEffect(()=> {
        let filterObjects = []
        if (!selectedTopic) {
            filterObjects = allPosts
        }else{

            const selectedObjects = allPosts.filter(post => post.topicsId === parseInt(selectedTopic))
            filterObjects.push(...selectedObjects)
            
        }        
        setFilteredPosts(filterObjects)
        setFilteredTopic(filterObjects)
    }, [selectedTopic, allPosts])

    useEffect(() => {
        let filterText = []
      if (!filteredTopic) {
        filterText.push(...allPosts)
    }else{
        filterText.push(...filteredTopic)
    }
    const filterValue = filterText.filter(post => (post.title.toLowerCase().includes(textValue.toLowerCase())) || (post.description.toLowerCase().includes(textValue.toLowerCase())))
        setFilteredPosts(filterValue)
    },[textValue, allPosts, filteredTopic])

    return (<>
        <div className="container">
            <FilterSection setSelectedTopic={setSelectedTopic} setTextValue={setTextValue} textValue={textValue}/>
        </div>
        <div className="all-posts-container container">
            <Posts filteredPosts={filteredPosts} Likes={Likes} likes={likes}/>  
        </div>
        </>
    )
}
