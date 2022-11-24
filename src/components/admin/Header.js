import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';

function Header() {

  let navigate = useNavigate();
  let name = localStorage.getItem("name");
  if(localStorage.getItem("usertype") !== "admin"){
    navigate("/");
  }

  function logout(e){
    localStorage.clear();
    navigate("/");
  }


  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand>Audio File Upload - { name }</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link to="/admin">Home</Link>&nbsp;
          <Link onClick={(e)=>{logout(e)}}>Logout</Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header;
