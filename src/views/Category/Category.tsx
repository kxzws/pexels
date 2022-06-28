import './Category.scss';
import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useTypedSelector from '../../hooks/useTypedSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import ImagesList from '../Main/ImagesList/ImagesList';
import { getSearchingImages } from '../../redux/thunks/imagesThunks';
import visualizeBigDigit from '../../utils/visualizeBigDigit';
import FiltersPanel from './FiltersPanel/FiltersPanel';

const Category = () => {
  const { search } = useParams();
  const { totalCount, images, pageNum, orientation, size, isLoading, hasNextPage } =
    useTypedSelector((state) => state.images);
  const dispatch = useAppDispatch();

  const queryData = useMemo(() => {
    if (search) {
      return { input: search, currentPage: pageNum, orientation, size };
    }
    return { input: '', currentPage: pageNum, orientation, size };
  }, [search, pageNum, orientation, size]);

  const loadMore = useCallback(() => {
    dispatch(getSearchingImages(queryData));
  }, [queryData]);

  return (
    <section className="category">
      <h1 className="category__title">
        фото {`${queryData.input[0].toUpperCase()}${queryData.input.slice(1)}`}
      </h1>
      <div className="category__flex-cont">
        <h4 className="category__subtitle">
          Фото <span className="category__num">{visualizeBigDigit(totalCount)}</span>
        </h4>
        <FiltersPanel />
      </div>
      <ImagesList
        items={images}
        loadMore={loadMore}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
      />
    </section>
  );
};

export default Category;
