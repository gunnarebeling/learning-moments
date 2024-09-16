import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getUserById } from "../../services/Users"
import { getAllPosts } from "../../services/postservices"

export const Profile = ({currentUser}) => {
    const [user , setUser] = useState({})
    const [userPostCount, setUserPostCount] = useState(0)
    const {userId} = useParams()
    const navigate = useNavigate()
    const getAndSetPostCount = () => {
        getAllPosts().then((posts) => {
            const postFilter = posts.filter(post => post.usersId === parseInt(userId))
            const count = postFilter.length
            setUserPostCount(count)
        })
    }
    useEffect(() => {
        getUserById(userId).then((userObj) => {
            setUser(userObj)

            })   
        
    }, [userId])
    useEffect(() => {
        getAndSetPostCount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const handleEdit = (event) => {
        event.preventDefault()
        navigate(`/profile/${userId}/edit`)


    }

    return (
        <div >
            <div className="header display-6 text-center">
                <header>Profile</header>
            </div>
            <div className="card border m-3 main-container">
                <div className="profile-name text-center m-3">
                    <section className="h2">{user.fullName}</section>
                </div>
                <div className="cohort text-center m-3">
                    <section className="h2">cohort #{user.cohort}</section>
                </div>
                <div className="user-post text-center m-3">
                    <section className="h2">{userPostCount} post</section>
                </div>
                {(parseInt(userId) === currentUser?.id) &&
                <div className="text-center">
                    <button className="btn btn-primary" onClick={handleEdit}>edit</button>

                </div>}

            </div>
        </div>
    )
}