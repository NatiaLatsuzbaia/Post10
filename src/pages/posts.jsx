import React, { useState } from "react";
import axios from 'axios';
import Navbar from "./navbar";
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import ReactQuill from 'react-quill';
import { Link } from "react-router-dom";

function Posts() {
  const [newPost, setNewPost] = useState({ title: "", description: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "description") {
      // If the input is for description, store the value directly as a string
      setNewPost({ ...newPost, [name]: value });
    } else {
      // For other inputs, keep the default behavior
      setNewPost({ ...newPost, [name]: value });
    }
  };
  

  const handleDescriptionChange = (value) => {
    setNewPost({ ...newPost, description: value });
  };

  const addPost = () => {
    axios.post("https://apitest.reachstar.io/blog/add", newPost)
      .then(function (response) {
        // No need to handle posts here, as it's managed in the Home component
        setNewPost({ title: "", description: "" }); // Clear the input fields
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <Navbar/>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="form-group">
              <input type="text" placeholder="Title" name="title" value={newPost.title} onChange={handleInputChange} className="form-control mb-3" />
              <ReactQuill
                value={newPost.description}
                onChange={handleDescriptionChange}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Description"
                className="form-control mb-3"
              />
              <Link to="/home" className="btn btn-primary" onClick={addPost}>Add</Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Posts;

// Quill editor modules and formats
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
];
