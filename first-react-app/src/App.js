import './App.css';
import MyNavBar from './components/MyNavBar/MyNavBar';
import MyRoutes from './MyRoutes';

import { useEffect, useState } from 'react';



import axios from 'axios';
import useLocalStorage from 'use-local-storage';
function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark':'light');
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
    <div data-theme={theme} style={{ backgroundColor: "var(--body-background-color)", color:"var(--body-text-color)"}} className="App">
      <MyNavBar setBooks={setBooks} theme={theme} onTogglePress={setTheme} />
      <MyRoutes toRoute={books} />
    </div>
  );
}

export default App;
