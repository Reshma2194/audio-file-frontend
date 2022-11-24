import React, { useEffect, useState } from 'react';
import { Container, Spinner, Table } from 'react-bootstrap';
import Header from './Header'
import { baseurl } from '../../common';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Files() {
  let [files, setFiles] = useState([]);
  let [loading, setLoading] = useState(false);
  useEffect(()=>{
    setLoading(true);
    axios.get(baseurl + "admin/files").then((response)=>{
      setLoading(false);
      setFiles(response.data.data);
    }, (err)=>{      
    });
  }, []);

  return (
    <div>
    <Header />
    <Container>
      <h3>Uploaded Files</h3>
      <hr />

      { loading &&  <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner> }

      <Table striped bordered hover>
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Audio File</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {
          files.map((file, i)=>{
            return(
              <tr key={ file._id }>
                <td>{ i + 1 }</td>
                <td>{ file.name }</td>
                <td><Link to={"/admin/file/" + file._id }>{ file.filename }</Link></td>
                <td>{ file.rating }</td>
              </tr>
                )
            }            
          )
        }
      </tbody>
    </Table>
    </Container>
  </div>
  )
}

export default Files;
