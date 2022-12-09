import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'

import axios from 'axios';

function TrangDocSach() {
  const [loadingState, setLoadingState] = useState("On Loading");
  const location = useLocation();
  useEffect(() => {
    var temp = location.pathname;
    temp = temp.split("/");
    console.log(temp);

    axios
      .put(`http://localhost:4000/add/singlechapter/${temp[2]}/${temp[3]}`)
      .then(res => {
        location.state = res.data;
        setLoadingState("OK!");
      })
      .catch(err => console.log(err));

  }, [location]);
  return (
    <Container>
      {
        location.state ?
          <div>
            <h1 style={{ textAlign: "center" }}>{location.state.ChapterTitle}</h1>
            <p style={{ whiteSpace: "pre-line" }}>{location.state.ChapterContent}</p>
          </div> :
          <p>{loadingState}</p>
      }
    </Container>
  )
}

export default TrangDocSach