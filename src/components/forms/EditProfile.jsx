import { useEffect, useState } from "react"
import { getUserById, updateUser } from "../../services/Users"
import { useNavigate, useParams } from "react-router-dom"

export const EditProfile = () => {
    const [updatedProfile, setUpdatedProfile] = useState({})
    const {userId} = useParams()
    const navigate = useNavigate()
    const getAndSetProfile = () => {
        getUserById(parseInt(userId)).then((userObj) => {
            setUpdatedProfile(userObj)
        })
    }
    useEffect(() => {
        
        getAndSetProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId])
    const handleSubmit = (event) => {
        event.preventDefault()
        updateUser(updatedProfile).then(
            getAndSetProfile()
            
        )
        navigate(`/profile/${userId}`)
    }
    return (
        <div className="formcontainer">
            <div className="header text-center m-4">
                <header>Edit Profile</header>
            </div>
            <div className="form-container">
                <form className="edit-profile">
                <fieldset>
                    <div className="form-group text-center my-4">

                        <div className="m-2 h3"> change name </div>
                        <input 
                            type="text"
                            value ={`${updatedProfile.fullName}`}
                            onChange={(event) =>{
                                const profileCopy = {...updatedProfile}
                                profileCopy.fullName = event.target.value
                                setUpdatedProfile(profileCopy)
                                }
                            }
                        />
                    </div>
                </fieldset> 
                <fieldset>
                    <div className="form-group text-center my-4">

                        <div className="m-2 h3"> change cohort </div>
                        <input 
                            type="number"
                            value ={`${updatedProfile.cohort}`}
                            onChange={(event) =>{
                                const profileCopy = {...updatedProfile}
                                profileCopy.cohort = parseInt(event.target.value)
                                setUpdatedProfile(profileCopy)
                                }
                            }
                        />
                    </div>
                </fieldset> 
                <fieldset>
                    <div className="submit-btn-container text-center">
                        <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    </div>
                </fieldset> 
                </form>
            </div>
        </div>
    )
    
}