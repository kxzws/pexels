import './ImagesList.scss';
import { useEffect } from 'react';
import Masonry from '@mui/lab/Masonry';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { ImagesListProps } from '../../../types/interfaces';
import ImageItem from './ImageItem/ImageItem';
import CONSTANTS from '../../../utils/constants';
import { imagesSlice } from '../../../redux/reducers/imagesSlice';

const ImagesList = (props: ImagesListProps) => {
  const { items, loadMore, isLoading, hasNextPage } = props;
  const { nextPage, cleanImages } = imagesSlice.actions;
  const dispatch = useAppDispatch();

  const handleScroll = () => {
    const { scrollHeight } = document.documentElement;
    const { scrollY, innerHeight } = window;
    const { SHORT_DISTANCE_VALUE } = CONSTANTS;

    const isNearTheBottom = scrollHeight - (scrollY + innerHeight) < SHORT_DISTANCE_VALUE;
    if (!isLoading && hasNextPage && isNearTheBottom) {
      // TODO:
      // - когда пустой массив (название запроса?)
      // dispatch(nextPage());
    }
  };

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  useEffect(() => {
    dispatch(cleanImages());
    dispatch(nextPage());
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <section className="images-list">
        <Masonry
          columns={{ xs: 2, sm: 3 }}
          spacing={4}
          sx={{
            my: 0,
            mx: 'auto',
          }}
        >
          {items.length > 0 ? (
            items.map((item) => <ImageItem key={item.id} image={item} />)
          ) : (
            <h3 className="images-list__title">Нет результатов по запросу.</h3>
          )}
        </Masonry>
      </section>
      {hasNextPage && items.length > 0 && <LinearProgress sx={{ height: 8 }} color="inherit" />}
    </>
  );
};

export default ImagesList;
