export const Likes = ({likes, post}) => {
    const foundLike = likes.find(like => like.postsId === post.id )
    const foundLikeCount = foundLike?.count 
    return (
        <div className="like-count d-flex align-items-center">Likes: {foundLikeCount? foundLikeCount : 0}</div>
    )
}