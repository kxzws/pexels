import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-masonry-css';
import useLocalStorage from 'use-local-storage';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import useAppDispatch from '../../hooks/useAppDispatch';
import { ImagesListProps, LikedIDs } from '../../types/interfaces';
import ImageItem from './ImageItem/ImageItem';
import { imagesSlice } from '../../redux/Images/slices';
import './ImagesList.scss';

const breakpointColumnsObj = {
  default: 3,
  2200: 4,
  1600: 3,
  1000: 2,
  460: 1,
};

const ImagesList = (props: ImagesListProps) => {
  const { items, loadMore, isLoading, hasNextPage } = props;

  const { nextPage, cleanFilters, cleanImages } = imagesSlice.actions;
  const dispatch = useAppDispatch();

  const [likedIDs, setLikedIDs] = useLocalStorage<Partial<LikedIDs>>('kxzws-likes', {});

  useEffect(() => {
    dispatch(cleanFilters());
    dispatch(cleanImages());
  }, []);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  return isLoading && items.length < 1 ? (
    <section className="images-list">
      <CircularProgress color="inherit" sx={{ mx: '50%', mt: 15 }} />
    </section>
  ) : (
    <section className="images-list">
      {items.length > 0 ? (
        <InfiniteScroll
          dataLength={items.length}
          hasMore={hasNextPage}
          loader={<CircularProgress color="inherit" sx={{ mx: '50%' }} />}
          next={() => {
            if (!isLoading) {
              dispatch(nextPage());
            }
          }}
          refreshFunction={() => {}}
        >
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="images-list__masonry"
            columnClassName="images-list__masonry-column"
          >
            {items.map((item) => (
              <ImageItem key={item.id} image={item} likedIDs={likedIDs} setLikedIDs={setLikedIDs} />
            ))}
          </Masonry>
        </InfiniteScroll>
      ) : (
        <h3 className="images-list__title">Нет результатов по запросу.</h3>
      )}
    </section>
  );
};

export default ImagesList;
