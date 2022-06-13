import ImagesList from './ImagesList/ImagesList';
import './Main.scss';
import SearchBar from './SearchBar/SearchBar';

const Main = () => {
  return (
    <main className="main">
      <SearchBar />
      <ImagesList />
    </main>
  );
};

export default Main;
