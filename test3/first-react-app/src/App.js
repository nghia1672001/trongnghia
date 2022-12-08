import './App.css';
import MyNavBar from './components/MyNavBar/MyNavBar';
import MyRoutes from './MyRoutes';

import { useEffect, useState } from 'react';

import axios from 'axios';
function App() {
  const [books, setBooks] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:4000/books/alls`)
            .then(res => {
                setBooks(res.data);
            })
            .catch(err => {
                console.log(err);
            });
  }, [])
  return (
    <div className="App">
      <MyNavBar />
      <MyRoutes toRoute={books} />
    </div>
  );
}

export default App;
