import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import Header from './Header'
import { baseurl } from '../../common';
import axios from 'axios';

function Home() {

  let [name, setName] = useState(localStorage.getItem("name"));
  let [audio, setAudio] = useState("");

  function audioChanged(e){
    e.preventDefault();    
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>{
      if(reader.result != null){
        console.log(reader.result.toString());
        setAudio(reader.result.toString());
      }
    }
  }

  function submit(e){
    e.preventDefault();
    if(name === ""){
      alert("Enter name");
      return;
    }
    if(audio === ""){
      alert("Select audio file");
      return;
    }
    axios.post(baseurl + "user/upload", {data:{name:name, audio:audio}}).then((response)=>{
      setAudio("");
      alert("File uploaded");
    }, (err)=>{
        alert("Something went wrong");
    });
  }

  return (
    <div>
      <Header />
      <Container>
        <h3>Audio File Upload</h3>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" value={ name } onChange={(e)=>{ setName(e.target.value) }} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>File</Form.Label>
        <Form.Control type="file" onChange={(e)=>{ audioChanged(e) }} />
      </Form.Group>
      <Button variant="primary" onClick={(e)=>{ submit(e); }}>
        Submit
      </Button>
      </Container>
    </div>
  )
}

export default Home
