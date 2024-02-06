import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Posts.css"

function Posts() {
  const [posts, setPosts] = useState([]);
  const [updateData, setUpdateData] = useState({
    id: '',
    title: '',
    content: ''
  });

  useEffect(() => {
    // Fetch posts from the server when the component mounts
    axios.get('http://localhost:8080/posts/AllPosts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const handleDelete = (postId) => {
    axios.delete(`http://localhost:8080/posts/delete/${postId}`)
      .then(response => {
        // Remove the deleted post from the state
        setPosts(posts.filter(post => post.id !== postId));
        console.log('Post deleted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:8080/posts/update/${updateData.id}`, updateData)
      .then(response => {
        // Update the post in the state with the new data
        setPosts(posts.map(post => {
          if (post.id === updateData.id) {
            return {
              ...post,
              title: updateData.title,
              content: updateData.content
            };
          }
          return post;
        }));
        console.log('Post updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating post:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const openUpdateModal = (post) => {
    setUpdateData({
      id: post.id,
      title: post.title,
      content: post.content
    });
    // Logic to open update modal or form
  };

  return (
    <div className="posts-container">
        {posts.map((post)=>(
<div className="app">
  <header>
    <a href="">
      <img src={post.image} alt="Earth News" />
    </a>
  </header>

  <main>
    <h1><br/>{post.title}</h1>
    <p>{post.content}</p>
    <a href="">Read full article</a>
  </main>
</div>
   ))}
    </div>
  );
}

export default Posts;
