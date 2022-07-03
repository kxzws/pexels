import './ImagesList.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect } from 'react';
import Masonry from 'react-masonry-css';
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
      <InfiniteScroll
        loader={<CircularProgress />}
        dataLength={items.length} // This is important field to render the next data
        next={() => {
          if (!isLoading) {
            dispatch(nextPage());
          }
        }}
        hasMore={hasNextPage}
        // below props only if you need pull down functionality
        refreshFunction={() => {}}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        }
      >
        <Masonry
          className="photo-list"
          columnClassName="photo-list__column"
          breakpointCols={{ default: 3 }}
        >
          {Boolean(items.length) &&
            items.map((item) => (
              <ImageItem
                key={item.id}
                image={item}
                liked={!(likedIDs.indexOf(item.id) < 0)}
                toggleLike={toggleLikedID}
                lazy
              />
            ))}
        </Masonry>
      </InfiniteScroll>
    </section>
  );
};

export default ImagesList;
