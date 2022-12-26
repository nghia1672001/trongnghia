import React, {  useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './SearchBar.css'

import axios from 'axios';

function SearchBar({searchResult, setSearchResult, setBooks}) {
    useEffect(() => {
        if (searchResult !== '') {
            const searchingjson = {
                searchResult: searchResult
            };

            console.log(searchingjson)

            axios
                .post(`http://localhost:4000/books/search`, searchingjson)
                .then(res => {
                    if (res.data.length !== 0) {
                        setBooks(res.data);
                    }
                    else{
                        setBooks("");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else{
            setSearchResult("");
        }
    }, [searchResult, setBooks, setSearchResult]);
    return (
        <form className="m-auto search-form">
            <input 
                onChange={(e)=>setSearchResult(e.target.value)}
                type="text"
                placeholder="Tìm sách"
            />
            <div className='search-icon-container'>
                <SearchIcon className="search-icon" />
            </div>
        </form>
    )
}

export default SearchBar