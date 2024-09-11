export const Likes = ({likes, post}) => {
    const foundLike = likes.filter(like => (like.postsId === post.id) && like.liked )
    const foundLikeCount = foundLike?.length
    return (
        <div className="like-count d-flex align-items-center">Likes: {foundLikeCount? foundLikeCount : 0}</div>
    )
}