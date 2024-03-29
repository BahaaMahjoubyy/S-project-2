
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Posts.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';


function Posts() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: ''
  });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) { 
      console.error('Title field is required.');
      return;
    }

    try {
      let imageUrl = formData.image;
      if (formData.image instanceof File) {
        const formDataCloudinary = new FormData();
        formDataCloudinary.append('file', formData.image);
        formDataCloudinary.append('upload_preset', 'lzoc60oh');

        const responseCloudinary = await axios.post(
          'https://api.cloudinary.com/v1_1/db2yjlbsw/image/upload',
          formDataCloudinary,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        imageUrl = responseCloudinary.data.secure_url;
        console.log(responseCloudinary.data.secure_url);
      }

      const postData = {
        title: formData.title,
        content: formData.content,
        image: imageUrl
      };
       console.log(imageUrl);
      if (isEditing && editingPost) {
        await axios.put(`http://localhost:8080/posts/update/${editingPost.id}`, postData);
        setIsEditing(false);
        setEditingPost(null);
      } else {
        await axios.post('http://localhost:8080/posts/add', postData);
      }

      console.log('Post saved successfully.');
      setFormData({ title: '', content: '', image: '' });
      fetchPosts();
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleEdit = (post) => {
    setIsEditing(true);
    setEditingPost(post);
    setFormData({ title: post.title, content: post.content, image: post.image });
    // setShowCreateForm(true);
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:8080/posts/delete/${postId}`);
      setPosts(posts.filter(post => post.id !== postId));
      console.log('Post deleted successfully.');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  console.log('hi')
  return (
    
    <div className="posts-container">
      {!showCreateForm ? (
    
    <div className="write-button">
    <button onClick={() => setShowCreateForm(true)}>
    <FontAwesomeIcon icon={faPenToSquare} /> Write
    </button>
  </div>
  
    
     
      ) : (
        <div className="modal">
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Enter title" />
      <textarea name="content" value={formData.content} onChange={handleInputChange} placeholder="Enter content"></textarea>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button type="submit">{isEditing ? 'Update' : 'Add'} Post</button>
      <button type="button" className="cancel" onClick={() => setShowCreateForm(false)}>Cancel</button>
    </form>
  </div>
      )}

{posts.map((post) => (
  <div key={post.id} className="post">
    <header>
      <a href="#">
      </a>
    </header>
    <main>
            {isEditing && editingPost && editingPost.id === post.id ? (
              <form onSubmit={handleSubmit}>
                <div className='title'>
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Enter title" />
                </div>
                <textarea name="content" value={formData.content} onChange={handleInputChange} placeholder="Enter content"></textarea>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <button type="submit">Update</button>
                <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
              </form>
            ) : (
              <>
              <div className="post">
                <h1>{post.title}</h1>
                <div className="content-wrapper">
                  <p>{post.content}</p>
                  <img src={post.image || 'placeholder-image-url.jpg'} alt="Post Image" />
                </div>
                <div className="actions">
                  <button onClick={() => handleDelete(post.id)}>Delete</button>
                  <button onClick={() => handleEdit(post)}>Edit</button>
                </div>
              </div>
              <hr style={{ width: '80%', marginLeft: '0' }} /> {/* Add a horizontal line after each post item */}
            </>
            
            )}
          </main>
  </div>
))}

    </div>
  );

}

export default Posts;