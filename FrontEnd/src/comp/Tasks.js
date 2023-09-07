import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

import '../App.css';
import { AuthContext } from './AuthContext';

export default function Home() {
  const url = 'http://localhost:1000/';
  const { isAuthenticated, user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [boardDescription, setBoardDescription] = useState('');
  const [boardMembers, setBoardMembers] = useState('');
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const { boardId } = useParams(); // Get board ID from the URL

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      // Fetch tasks for the specific board based on boardId
      axios
        .get(`${url}tasks?boardId=${boardId}`)
        .then((response) => setData(response.data))
        .catch((error) => console.error(error));
    }
  }, [isAuthenticated, user, boardId]);

  if (!isAuthenticated) {
    return <div>You must be logged in to view this page.</div>;
  }

  if (!user) {
    return <div>Could not load user information.</div>;
  }

  return (
    <>
      <nav>
        <div className="container">
          <p className="logo">TaskVortex</p>
          <ol>
            <li className="profile" style={{ color: 'white' }}></li>
            <li className="prname">{user.uname}</li>
          </ol>
          <div className="dropd">
            <span>Profile</span>
            <span onClick={handleLogout}>Log Out</span>
          </div>
        </div>
      </nav>

      <div className="container d-flex flex-row mb-4">
        <div className="gg">
          <h2>To Do</h2>
          <Button variant="primary">Add Card</Button>
          {/* Display tasks with status "To Do" */}
          {data
            .filter((task) => task.status === 'To Do')
            .map((item) => (
              <Link to={`/board/${item._id}`} key={item._id}>
                <li className="box">
                  <div>Title: {item.title}</div>
                  <div>Description: {item.description}</div>
                </li>
              </Link>
            ))}
        </div>
        <div className="gg">
          <h2>Doing</h2>
          <Button variant="primary">Add Card</Button>
          {/* Display tasks with status "Doing" */}
          {data
            .filter((task) => task.status === 'Doing')
            .map((item) => (
              <Link to={`/board/${item._id}`} key={item._id}>
                <li className="box">
                  <div>Title: {item.title}</div>
                  <div>Description: {item.description}</div>
                </li>
              </Link>
            ))}
        </div>
        <div className="gg">
          <h2>Done</h2>
          <Button variant="primary">Add Card</Button>
          {/* Display tasks with status "Done" */}
          {data
            .filter((task) => task.status === 'Done')
            .map((item) => (
              <Link to={`/board/${item._id}`} key={item._id}>
                <li className="box">
                  <div>Title: {item.title}</div>
                  <div>Description: {item.description}</div>
                </li>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
