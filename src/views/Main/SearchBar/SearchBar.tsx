import './SearchBar.scss';

const SearchBar = () => {
  return (
    <section className="search-bar">
      <div className="center-cont">
        <p className="search-bar__title">
          Лучшие бесплатные стоковые фото, изображения без роялти и видео от талантливых авторов.
        </p>
        <p className="search-bar__list">
          <span className="search-bar__list_text">Тенденции:</span>
        </p>
      </div>
    </section>
  );
};

export default SearchBar;
