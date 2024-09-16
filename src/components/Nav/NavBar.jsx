import { Link, useNavigate } from "react-router-dom"

export const NavBar = ({currentUser}) => {
    const navigate = useNavigate()
    return (
        <ul className="nav bg-dark">
            <li className="nav-item">
                <Link className="nav-link" to='/' >All Posts</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to='/myposts' >My Posts</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to='/newpost' >New Posts</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to='/favorites' >Favorites</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={`profile/${currentUser?.id}`} >Profile</Link>
            </li>
            {localStorage.getItem("learning_user") ? (
                <li className="nav-item ms-auto">
                    <Link
                    className="nav-link"
                    to=""
                    onClick={() => {
                        localStorage.removeItem("learning_user")
                        navigate("/login", { replace: true })
                    }}
                    >
                    Logout
                    </Link>
                </li>
                ) : (
                ""
                )}
        </ul>

    )
}