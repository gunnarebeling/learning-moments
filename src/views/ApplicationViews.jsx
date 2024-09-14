import { Outlet, Route, Routes } from "react-router-dom"
import { PostList } from "../components/Posts/PostList"
import { NavBar } from "../components/Nav/NavBar"
import { useEffect, useState } from "react"
import { PostDetails } from "../components/Posts/PostDetails"
import { PostForm } from "../components/forms/PostForm"
import { MyPosts } from "../components/Posts/MyPosts"
import { getLikes } from "../services/LIkes"
import { EditPost } from "../components/forms/EditPost"
import { Favorites } from "../components/Posts/Favorites"

export  const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState()
    const [likes, setLikes] = useState([])
    const getAndSetLikes = () => {
        getLikes().then(likesObj => {
            setLikes(likesObj)
        })
    }
    
    
    useEffect(()=> {
        const currentUserObj = localStorage.getItem('learning_user')
        const parsedCurrentUser = JSON.parse(currentUserObj)
        setCurrentUser(parsedCurrentUser)
        getAndSetLikes()
        
        }, [])
    
    return (
        <Routes>
            <Route 
            path="/"
            element={
                <>
                    <NavBar />
                    <Outlet />
                </>
            }>
                <Route index element={<PostList/>} />
                <Route path="/profile" element={<>profile</>}/>
                <Route path=":postId">
                   <Route index element={<PostDetails currentUser={currentUser}/>}/>
                   <Route path="edit" element={<EditPost/>}/> 
                </Route> 
                <Route path="/newpost" element={<PostForm currentUser={currentUser}/>}/>
                <Route path="/myposts" element={<MyPosts currentUser={currentUser} likes={likes}/>}/>
                <Route path="/favorites" element={<Favorites currentUser={currentUser} likes={likes}/>}/>
                
            </Route>
        </Routes>
    )
}