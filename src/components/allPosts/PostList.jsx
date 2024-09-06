import { useEffect } from "react"
import { useState } from "react"
import { getAllPosts } from "../../services/getposts"
import { getLikes } from "../../services/getLIkes"
import { Likes } from "./Likes"
import { Posts } from "./Posts"
import { FilterSection } from "./filtersection/FilterSection"

export const PostList = ()=> {
    const [allPosts, setAllPosts] = useState([])
    const [likes, setLikes] = useState([])

    useEffect(() => {
        getAllPosts().then(postsArray => setAllPosts(postsArray))
        getLikes().then(likesArray => setLikes(likesArray))
    }, [])

    return (<>
        <FilterSection/>
        <div className="all-posts-container container">
            <Posts allPosts={allPosts} Likes={Likes} likes={likes}/>  
        </div>
        </>
    )
}
