import { useCallback } from 'react';
import useAppDispatch from '../../hooks/useAppDispatch';
import useTypedSelector from '../../hooks/useTypedSelector';
import ImagesList from './ImagesList/ImagesList';
import SearchBar from './SearchBar/SearchBar';
import { getCuratedImages } from '../../redux/Images/thunks';
import './Main.scss';

const Main = () => {
  const { images, pageNum, isLoading, hasNextPage } = useTypedSelector((state) => state.images);

  const dispatch = useAppDispatch();

  const loadMore = useCallback(() => {
    dispatch(getCuratedImages(pageNum));
  }, [pageNum]);

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
