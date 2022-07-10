import { useEffect } from 'react';
import Masonry from 'typescript-react-infinite-masonry';
import useLocalStorage from 'use-local-storage';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import useAppDispatch from '../../hooks/useAppDispatch';
import { ImagesListProps, LikedIDs } from '../../types/interfaces';
import ImageItem from './ImageItem/ImageItem';
import { imagesSlice } from '../../redux/Images/slices';
import './ImagesList.scss';

const ImagesList = (props: ImagesListProps) => {
  const { items, loadMore, isLoading, hasNextPage } = props;

  const { nextPage, cleanImages } = imagesSlice.actions;
  const dispatch = useAppDispatch();

  const [likedIDs, setLikedIDs] = useLocalStorage<Partial<LikedIDs>>('kxzws-likes', {});

  useEffect(() => {
    dispatch(cleanImages());
  }, []);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  return isLoading ? (
    <section className="images-list">
      <CircularProgress color="inherit" sx={{ mx: '50%' }} />
    </section>
  ) : (
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
            <ImageItem key={item.id} image={item} likedIDs={likedIDs} setLikedIDs={setLikedIDs} />
          ))}
        </Masonry>
      ) : (
        <h3 className="images-list__title">Нет результатов по запросу.</h3>
      )}
    </section>
  );
};

export default ImagesList;
