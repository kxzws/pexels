import './SearchInput.scss';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState } from 'react';

const SearchInput = () => {
  const navigate = useNavigate();
  const { search } = useParams();
  // console.log(search);
  // eslint-disable-next-line
  const [value, setValue] = useState<string>(search ? search : '');

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue((e.target as HTMLInputElement).value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/search/${value}`);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (value) {
      navigate(`/search/${value}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <div className="search-group">
      <input
        type="search"
        value={value}
        className="search-input"
        placeholder="Поиск бесплатных изображений"
        onChange={handleChange}
        onKeyDown={handleEnter}
      />
      <button type="button" className="search-btn" onClick={handleClick}>
        <SearchIcon sx={{ color: '#7f7f7f' }} />
      </button>
    </div>
  );
};

export default SearchInput;
