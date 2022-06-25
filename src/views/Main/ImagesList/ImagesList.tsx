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
  const { nextPage } = imagesSlice.actions;
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
          {/* <ImageItem
            key={200}
            image={{
              id: 2014422,
              width: 3024,
              height: 3024,
              url: 'https://www.pexels.com/photo/brown-rocks-during-golden-hour-2014422/',
              photographer: 'Joey Farina',
              photographer_url: 'https://www.pexels.com/@joey',
              photographer_id: 680589,
              avg_color: '#978E82',
              src: {
                original: 'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg',
                large2x:
                  'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                large:
                  'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
                medium:
                  'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=350',
                small:
                  'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=130',
                portrait:
                  'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
                landscape:
                  'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
                tiny: 'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
              },
              liked: false,
              alt: 'Brown Rocks During Golden Hour',
            }}
          /> */}
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
