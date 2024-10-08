export const getLikes = () => {
    return fetch(`http://localhost:8088/likes?_expand=posts`).then(res => res.json())
}
export const postLike = (LikeData) => {
    return fetch(`http://localhost:8088/likes`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(LikeData)
    })

}
export const updateLike = (likeData) => {
    return fetch(`http://localhost:8088/likes/${likeData.id}`,{
        method: 'PUT',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(likeData)
    }
        
    )
}

export const deleteLike = (likeData) => {
    return fetch(`http://localhost:8088/likes/${likeData.id}`, {
        method: 'DELETE'
    })
}