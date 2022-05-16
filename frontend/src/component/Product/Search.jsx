import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';

const Search = () => {
    const [keyword, setKeyword] = useState('');
    let navigate = useNavigate();
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`, { replace: true });
        } else {
            navigate(`/products`, { replace: true });
        }
    }
    return <Fragment>
        <form className='searchBox' onSubmit={searchSubmitHandler}>
            <input type="text" name="Search a Productt ..." onChange={(e) => setKeyword(e.target.value)} />
            <input type="submit" value="Search" />
        </form>
    </Fragment>

}

export default Search;