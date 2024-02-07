import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Posts.css"

function Posts() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: ""
  });
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios.get('http://localhost:8080/posts/AllPosts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      console.error('Title field is required.');
      return;
    }

    const postData = {
      title: formData.title,
      content: formData.content,
      image: formData.image
    };

    axios.post('http://localhost:8080/posts/add', postData)
      .then(response => {
        console.log('Post added successfully:', response.data);
        setFormData({ title: '', content: '', image: null });
        fetchPosts();
        setShowCreateForm(false);
      })
      .catch(error => {
        console.error('Error adding post:', error);
      });
  };

  const handleDelete = (postId) => {
    axios.delete(`http://localhost:8080/posts/delete/${postId}`)
      .then(response => {
        setPosts(posts.filter(post => post.id !== postId));
        console.log('Post deleted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  };

  const handleUpdate = (postId, updatedData) => {
    axios.put(`http://localhost:8080/posts/update/${postId}`, updatedData)
      .then(response => {
        setPosts(posts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              title: updatedData.title,
              content: updatedData.content
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

  return (
    <div className="posts-container">
      {!showCreateForm ? (
        <button onClick={() => setShowCreateForm(true)}>Create</button>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Enter title" />
          <textarea name="content" value={formData.content} onChange={handleInputChange} placeholder="Enter content"></textarea>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button type="submit">Add Post</button>
          <button type="button" onClick={() => setShowCreateForm(false)}>Cancel</button>
        </form>
      )}

      {posts.map((post) => (
        <div key={post.id} className="post">
          <div className="app">
            <header>
              <a href="#">
              </a>
            </header>
            <main>
              <h1>{post.title}</h1>
              <p>{post.content}</p>
              <img src={post.image || 'placeholder-image-url.jpg'} alt="Post Image" />

              <button onClick={() => handleDelete(post.id)}>Delete</button>
              <button onClick={() => handleUpdate(post.id, { title: "Updated Title", content: "Updated Content" })}>Update</button>
            </main>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;
