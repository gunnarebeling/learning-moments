import { Outlet, Route, Routes } from "react-router-dom"
import { PostList } from "../components/Posts/PostList"
import { NavBar } from "../components/Nav/NavBar"
import { useEffect, useState } from "react"
import { PostDetails } from "../components/Posts/PostDetails"

export  const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState()
    useEffect(()=> {
        const currentUserObj = localStorage.getItem('learning_user')
        const parsedCurrentUser = JSON.parse(currentUserObj)
        setCurrentUser(parsedCurrentUser)
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
                   <Route path="edit" element={<>edit profile</>}/> 
                </Route> 
                
            </Route>
        </Routes>
    )
}