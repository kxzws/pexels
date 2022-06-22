import './ImagesList.scss';
import { useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { ImagesListProps } from '../../../types/interfaces';
import ImageItem from './ImageItem/ImageItem';
import CONSTANTS from '../../../utils/constants';
import { imagesSlice } from '../../../redux/reducers/imagesSlice';

const ImagesList = (props: ImagesListProps) => {
  const { items, loadMore, isLoading, hasNextPage } = props;
  const { nextPage } = imagesSlice.actions;
  const dispatch = useAppDispatch();

  const handleScroll = () => {
    const { scrollHeight } = document.documentElement;
    const { scrollY, innerHeight } = window;
    const { SHORT_DISTANCE_VALUE } = CONSTANTS;

    const isNearTheBottom = scrollHeight - (scrollY + innerHeight) < SHORT_DISTANCE_VALUE;
    if (!isLoading && hasNextPage && isNearTheBottom) {
      // TODO:
      // - подсчет hasNextPage
      // - при нескольких скроллах к боттом не было одинаковых запросов
      // - начальный набор имг
      // - когда пустой массив
      // - хранить в редакс total count
      dispatch(nextPage());
    }
  };

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  useEffect(() => {
    dispatch(nextPage());
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <section className="images-list">
        {items.map((item) => (
          <ImageItem key={item.id} image={item} />
        ))}
      </section>
      {isLoading && <LinearProgress style={{ height: 8 }} color="inherit" />}
    </>
  );
};

export default ImagesList;
