export const getAllPosts = () => {
   return fetch(`http://localhost:8088/posts?_expand=topics`).then(res => res.json())
}

