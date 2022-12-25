import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Container } from 'react-bootstrap'
import BookData from './BookData';

function TrangLichSu() {
  const [lichsudata, setStoryData] = useState('');

  const checkIfLoggedUser = localStorage.getItem('user');
  useEffect(() => {
    if (checkIfLoggedUser) {
      axios.get(`http://localhost:4000/borrow/getxuliuser/${checkIfLoggedUser}`)
        .then((res) => {
          console.log(res.data);
          setStoryData(res.data);
        })
        .catch(err => {
          alert(err);
        });
    }
    else {
      setStoryData('');
    }
  }, [checkIfLoggedUser]);
  return (
    <Container>
      <h3> Lich su muon sach </h3>
      {
        lichsudata ?
          lichsudata.map((a, key) => {
            return <div key={key} style={{ margin: "10px", border: "1px solid black" }}>
              <p>{a.NgayMuon.split('T')[0]}</p>
              <p>{a.NgayTra.split('T')[0]}</p>
              <BookData bookid={a.Sach} />
              {
                a.TinhTrang ?
                  a.TinhTrang === 1 ? "Da tra" :
                    a.TinhTrang === 2 ? "Chua tra" :
                      "Dang xu li" :
                  "Error"
              }
            </div>
          })
          : <div> Error</div>
      }
    </Container>
  )
}

export default TrangLichSu