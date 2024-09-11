export const getAllPosts = () => {
   return fetch(`http://localhost:8088/posts?_expand=topics`).then(res => res.json())
}


export const submitNewPost = (postObj) => {
   return fetch(`http://localhost:8088/posts`,{
      method: 'POST',
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(postObj)
   })
}

