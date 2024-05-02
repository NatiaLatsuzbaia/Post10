import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="classic-navbar ">
      <div className="container-fluid ">
        <a className="navbar-brand" href="/">Natia I believe in you</a>
        <div className="navbar-links">
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/posts">Add Post</Link>
            </li>
            <li>
              <Link to="/details">Details</Link>
            </li>
            <li>
              <Link to="/">Log out</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
