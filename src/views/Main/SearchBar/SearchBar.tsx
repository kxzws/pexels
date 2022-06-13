import './SearchBar.scss';
import SearchInput from '../../../components/SearchInput/SearchInput';
import getRandomArray from '../../../utils/getRandomsArray';
import trends from '../../../utils/trends';

const SearchBar = () => {
  const randomArray = getRandomArray();

  return (
    <section className="search-bar">
      <div className="center-cont">
        <p className="search-bar__title">
          Лучшие бесплатные стоковые фото, изображения без роялти и видео от талантливых авторов.
        </p>
        <SearchInput />
        <p className="search-bar__list">
          <span className="search-bar__list_text">Тенденции:</span>
          {randomArray.map((trendInd, ind) => (
            <a key={trendInd} href={`/search/${trends[trendInd]}`} className="search-bar__item">
              {trends[trendInd]}
              {ind === randomArray.length - 1 ? null : `, `}
            </a>
          ))}
        </p>
      </div>
    </section>
  );
};

export default SearchBar;
