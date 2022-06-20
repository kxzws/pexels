import './Main.scss';
import useAppDispatch from '../../hooks/useAppDispatch';
import useTypedSelector from '../../hooks/useTypedSelector';
import ImagesList from './ImagesList/ImagesList';
import SearchBar from './SearchBar/SearchBar';
import { getCuratedImages } from '../../redux/thunks/imagesThunks';
import { imagesSlice } from '../../redux/reducers/imagesSlice';

const Main = () => {
  const { images, pageNum, isLoading, hasNextPage } = useTypedSelector((state) => state.images);
  const { nextPage } = imagesSlice.actions;
  const dispatch = useAppDispatch();

  const loadMore = () => {
    if (!isLoading) {
      dispatch(getCuratedImages(pageNum)).then(() => dispatch(nextPage()));
    }
  };

  return (
    <main className="main">
      <SearchBar />
      <ImagesList
        items={images}
        loadMore={loadMore}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
      />
    </main>
  );
};

export default Main;
