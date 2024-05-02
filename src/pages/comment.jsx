import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const Comments = () => {
  const { id } = useParams();
  const [newComment, setNewComment] = useState({ description: '' });
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://apitest.reachstar.io/comment/list/${id}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
  
    fetchComments(); // Call the function to fetch comments when the component mounts
  
    // Optional cleanup function or effect dependencies
    return () => {
      // Cleanup logic if needed
    };
  }, [id]); // Dependency array to re-run the effect when 'id' changes
  

  const handleAddComment = async () => {
    try {
      const response = await axios.post(`https://apitest.reachstar.io/comment/add/${id}`, {
        comment: newComment.description,
      });
      console.log('Comment added successfully:', response.data);
      setComments([...comments, response.data]);
      setNewComment({ description: '' });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      if (!commentId) {
        console.error('Comment ID is undefined');
        return;
      }

      await axios.delete(`https://apitest.reachstar.io/comment/delete/${commentId}`);
      console.log('Comment deleted successfully');
      const updatedComments = comments.filter(comment => comment.id !== commentId);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <React.Fragment>
      <div className="row justify-content-center mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <ReactQuill
                value={newComment.description}
                onChange={value => setNewComment({ description: value })}
                modules={quillModules}
                formats={quillFormats}
              />
            </div>
            <div className="card-footer">
              <button onClick={handleAddComment} className="btn btn-primary">Add Comment</button>
            </div>
          </div>
        </div>
      </div>

      {/* Display comments below the Add Comment section */}
      <div className="row justify-content-center mt-4">
        <div className="col-12">
          <div className="card">
            <ul>
              {comments.map(comment => (
                <li key={comment.id}>
                  <span className="text">{comment.description}</span>
                  <button onClick={() => handleDeleteComment(comment.id)} className="btn btn-danger">Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Comments;

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
