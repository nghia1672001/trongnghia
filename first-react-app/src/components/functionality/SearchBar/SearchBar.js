import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './SearchBar.css'

function SearchBar() {
    return (
        <form className="m-auto search-form">
            <input
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