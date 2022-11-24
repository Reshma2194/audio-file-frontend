import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Header from './Header'
import { baseurl } from '../../common';

function File() {
  let {id} = useParams();
  let [file, setFile] = useState({});
  let [loading, setLoading] = useState(false);
  let [rating, setRating] = useState(5);

  useEffect(()=>{
    setLoading(true);
    axios.get(baseurl + "admin/file/" + id).then((response)=>{
      setLoading(false);
      setFile(response.data.data);
      setRating(response.data.data.rating);
    }, (err)=>{      
    });
  }, []);

  function submit(e){
    e.preventDefault();
    axios.post(baseurl + "admin/rating", {data:{ id:id, rating:rating }}).then((response)=>{
      //console.log(response.data);
      alert("Rating updated");
    }, (err)=>{      
    });
  }

  return (
    <div>
    <Header />
    <Container>
      <h3>File</h3>
      { loading &&  <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner> }

      <b>Name</b>: { file.name }<br />
      <b>Link</b>: { baseurl + file.filename } <br />
      <a href={ baseurl + file.filename } target="_BLANK">Download</a>

      <h3>Rating</h3>
      <select value={rating} onChange={(e)=>{setRating(e.target.value)}}>
        <option value="0">No Rating</option>
        <option value="5">5</option>
        <option value="4">4</option>
        <option value="3">3</option>
        <option value="2">2</option>
        <option value="1">1</option>
      </select>
      <br />
      <Button onClick={(e)=>{ submit(e) }}>Submit</Button>
    </Container>
  </div>
  )
}

export default File;
