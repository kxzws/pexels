import './ImagesList.scss';
import { useEffect } from 'react';
import Masonry from 'typescript-react-infinite-masonry';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import useLocalStorage from 'use-local-storage';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { ImagesListProps } from '../../../types/interfaces';
import ImageItem from './ImageItem/ImageItem';
import { imagesSlice } from '../../../redux/reducers/imagesSlice';

const ImagesList = (props: ImagesListProps) => {
  const { items, loadMore, isLoading, hasNextPage } = props;
  const { nextPage, cleanImages } = imagesSlice.actions;
  const dispatch = useAppDispatch();
  const [likedIDs, setLikedIDs] = useLocalStorage<number[]>('kxzws-likes', []);

  useEffect(() => {
    dispatch(cleanImages());
  }, []);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  const toggleLikedID = (id: number) => {
    if (likedIDs.indexOf(id) < 0) {
      const copy = likedIDs.slice();
      copy.push(id);
      setLikedIDs(copy);
    } else {
      let copy = likedIDs.slice();
      copy = copy.filter((num) => num !== id);
      setLikedIDs(copy);
    }
  };

  return (
    <section className="images-list">
      {items.length > 0 ? (
        <Masonry
          className="images-list__masonry"
          dataLength={items.length}
          hasMore={hasNextPage}
          loader={<CircularProgress color="inherit" sx={{ mx: '50%' }} />}
          next={() => {
            if (!isLoading) {
              dispatch(nextPage());
            }
          }}
          sizes={[
            { mq: '460px', columns: 1, gutter: 24 },
            { mq: '768px', columns: 2, gutter: 20 },
            { mq: '1440px', columns: 3, gutter: 30 },
            { mq: '2200px', columns: 4, gutter: 30 },
          ]}
          pack
        >
          {items.map((item) => (
            <ImageItem
              key={item.id}
              image={item}
              liked={!(likedIDs.indexOf(item.id) < 0)}
              toggleLike={toggleLikedID}
            />
          ))}
        </Masonry>
      ) : (
        <h3 className="images-list__title">Нет результатов по запросу.</h3>
      )}
    </section>
  );
};

export default ImagesList;
