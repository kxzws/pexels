import './SearchInput.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate, useMatch } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import useAppDispatch from '../../hooks/useAppDispatch';
import { imagesSlice } from '../../redux/reducers/imagesSlice';

const SearchInput = () => {
  const navigate = useNavigate();
  const url = useMatch('/search/:search')?.params;
  const [value, setValue] = useState<string>('');
  const { nextPage, cleanImages } = imagesSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (url?.search) {
      setValue(url?.search);
    } else {
      setValue('');
    }
  }, [url?.search]);

  const handleNavigation = () => {
    dispatch(cleanImages());
    dispatch(nextPage());
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
