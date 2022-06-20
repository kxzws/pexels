import './ImagesList.scss';
import { ImagesListProps } from '../../../types/interfaces';
import ImageItem from './ImageItem/ImageItem';

const ImagesList = (props: ImagesListProps) => {
  const { items, loadMore, hasNextPage } = props;

  return <section className="images-list">images-list</section>;
};

export default ImagesList;
