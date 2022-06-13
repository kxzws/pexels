import './SearchInput.scss';
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = () => {
  return (
    <div className="search-group">
      <input type="search" className="search-input" placeholder="Поиск бесплатных изображений" />
      <button type="button" className="search-btn">
        <SearchIcon sx={{ color: '#7f7f7f' }} />
      </button>
    </div>
  );
};

export default SearchInput;
