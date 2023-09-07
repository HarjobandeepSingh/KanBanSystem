import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../App.css';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const url = 'http://localhost:1000/';
  const { isAuthenticated, user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [boardDescription, setBoardDescription] = useState('');
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      axios
        .get(url + 'Boards')
        .then((response) => setData(response.data))
        .catch((error) => console.error(error));
    }
  }, [isAuthenticated, user]);


  if (!isAuthenticated) {
    return <div>You must be logged in to view this page.</div>;
  }

  if (!user) {
    return <div>Could not load user information.</div>;
  }

  const handleSubmit = (event) => {

    axios
      .post(url + 'Boards', {
        description: boardDescription,
        title: boardName,
      })
      .then((response) => {
        console.log(response.data);
        setData([...data, response.data]);
        handleClose(); 
      })
      .catch((error) => console.error(error));
  };
  

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
            <span  onClick={handleLogout} >Log Out</span>
          </div>
        </div>
      </nav>

      <div className="container d-flex flex-row mb-4">
        <Button variant="primary" onClick={handleShow}>
          Create Board
        </Button>
      </div>
      <div className="container d-flex flex-wrap ">
  {data.map((item) => (
    <Link to={`/board/${item._id}`} key={item._id}>
      <li className='box'>
        <div>Title : {item.title}</div>
        <div>Description : {item.description}</div>
      </li>
    </Link>
  ))}
</div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{width:"100%"}} onSubmit={handleSubmit}>
            <Form.Group controlId="formBoardName">
              <Form.Label>Board Name</Form.Label>
              <Form.Control type="text" placeholder="Enter board name" value={boardName} onChange={(event) => setBoardName(event.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBoardDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" value={boardDescription} onChange={(event) => setBoardDescription(event.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}
