import './SearchInput.scss';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useMatch } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const SearchInput = () => {
  const navigate = useNavigate();
  const url = useMatch('/search/:search')?.params;
  // eslint-disable-next-line
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (url?.search) {
      setValue(url?.search);
    } else {
      setValue('');
    }
  }, [url?.search]);

  const handleNavigation = () => {
    if (value) {
      navigate(`/search/${value}`);
    } else {
      navigate(`/`);
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue((e.target as HTMLInputElement).value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNavigation();
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleNavigation();
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
