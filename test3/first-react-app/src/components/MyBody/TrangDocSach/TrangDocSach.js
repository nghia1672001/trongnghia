import React from 'react'
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'

function TrangDocSach() {
  const location = useLocation();
  console.log(location);
  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>{location.state.ChapterTitle}</h1>
      <p style={{whiteSpace: "pre-line"}}>{location.state.ChapterContent}</p>
    </Container>
  )
}

export default TrangDocSach