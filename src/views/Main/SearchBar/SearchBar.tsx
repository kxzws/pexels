import './SearchBar.scss';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import useTypedSelector from '../../../hooks/useTypedSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import SearchInput from '../../../components/SearchInput/SearchInput';
import trendsData from '../../../utils/trendsData';
import { mainSlice } from '../../../redux/reducers/mainSlice';
import getBgPhotos from '../../../redux/thunks/mainThunks';

const SearchBar = () => {
  const { isLoading, error, photo, trends } = useTypedSelector((state) => state.main);
  const { getTrends } = mainSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(getBgPhotos());
    dispatch(getTrends());
  }, []);

  return (
    <section className="search-bar">
      <img src={photo?.src.landscape} alt={photo?.alt} className="search-bar__bg-img" />
      <div className="center-cont">
        <p className="search-bar__title">
          Лучшие бесплатные стоковые фото, изображения без роялти и видео от талантливых авторов.
        </p>
        <SearchInput />
        <p className="search-bar__list">
          <span className="search-bar__list_text">Тенденции:</span>
          {trends.map((trendInd, ind) => (
            <i key={trendInd}>
              <a href={`/search/${trendsData[trendInd]}`} className="search-bar__item">
                {trendsData[trendInd]}
              </a>
              {ind === trends.length - 1 ? null : `, `}
            </i>
          ))}
        </p>
      </div>
      {isLoading && <CircularProgress color="inherit" />}
      {!isLoading && !error && (
        <a
          href={photo?.photographer_url}
          className="search-bar__author"
          rel="noreferrer"
          target="_blank"
        >
          Автор фото — <span className="search-bar__author-name">{photo?.photographer}</span>
        </a>
      )}
    </section>
  );
};

export default SearchBar;
