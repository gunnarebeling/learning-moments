import { Outlet, Route, Routes } from "react-router-dom"
import { PostList } from "../components/allPosts/PostList"
import { NavBar } from "../components/Nav/NavBar"
import { useEffect, useState } from "react"

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

            </Route>
        </Routes>
    )
}