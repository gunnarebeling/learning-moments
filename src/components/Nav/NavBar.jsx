import { Link, useNavigate } from "react-router-dom"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="nav bg-dark">
            <li className="nav-item">
                <Link className="nav-link" to='/' >All Posts</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to='/profile' >Profile</Link>
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