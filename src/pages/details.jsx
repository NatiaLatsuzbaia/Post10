import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import Comments from './comment';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    axios.get(`https://apitest.reachstar.io/blog/get/${id}`)
      .then(response => {
        setPost(response.data);
        setEditedTitle(response.data.title);
        setEditedDescription(response.data.description);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });


  }, [id]);

  const handleTitleChange = event => {
    setEditedTitle(event.target.value);
  };

  const handleDescriptionChange = value => {
    setEditedDescription(value);
  };

  const handleEditPost = async () => {
    try {
      const response = await axios.put(`https://apitest.reachstar.io/blog/edit/${id}`, {
        title: editedTitle,
        description: editedDescription,
      });
      console.log('Post updated successfully:', response.data);
      setPost({ ...post, description: editedDescription });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`https://apitest.reachstar.io/blog/delete/${id}`);
      console.log('Post deleted successfully');
      navigate('/home');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };


  return (
    <React.Fragment>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                {isEditing ? (
                  <input type="text" value={editedTitle} onChange={handleTitleChange} />
                ) : (
                  <h3>{post.title}</h3>
                )}
              </div>
              <div className="card-body">
                {isEditing ? (
                  <ReactQuill
                    value={editedDescription}
                    onChange={handleDescriptionChange}
                    modules={quillModules}
                    formats={quillFormats}
                  />
                ) : (
                  <p>{post.description}</p>
                )}
              </div>
              <div className="card-footer">
                {isEditing ? (
                  <button onClick={handleEditPost} className="btn btn-primary">Save Changes</button>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="btn btn-primary">Edit</button>
                )}
                <button onClick={handleDeletePost} className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Comments/>
    </React.Fragment>
  );
};

export default Details;

const quillModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['link', 'image'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['clean'],
  ],
};

const quillFormats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'link', 'image',
  'list', 'bullet',
  'align',
  'clean',
];
