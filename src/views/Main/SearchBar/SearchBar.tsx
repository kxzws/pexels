import './SearchBar.scss';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import useTypedSelector from '../../../hooks/useTypedSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import SearchInput from '../../../components/SearchInput/SearchInput';
import getRandomArray from '../../../utils/getRandomsArray';
import trends from '../../../utils/trends';
import getBgPhotos from '../../../redux/thunks/bgImgThunks';

const SearchBar = () => {
  const randomArray = getRandomArray();
  const { isLoading, error, photo } = useTypedSelector((state) => state.bgImg);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(getBgPhotos());
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
          {randomArray.map((trendInd, ind) => (
            <i key={trendInd}>
              <a href={`/search/${trends[trendInd]}`} className="search-bar__item">
                {trends[trendInd]}
              </a>
              {ind === randomArray.length - 1 ? null : `, `}
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
