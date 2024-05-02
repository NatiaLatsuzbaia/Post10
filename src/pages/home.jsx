import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from "./navbar";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("https://apitest.reachstar.io/blog/list")
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, );

  return (
    <React.Fragment>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            {posts.map(post => (
              <div key={post.id} className="card mb-3">
                <div className="card-header">
                  <h3 className="card-title">{post.title}</h3>
                </div>
                <div className="card-body">
                  <p className="card-text" dangerouslySetInnerHTML={{ __html: post.description }} />
                </div>
                <div className="card-footer">
                  <Link to={`/details/${post.id}`} className="btn btn-primary">Details</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
