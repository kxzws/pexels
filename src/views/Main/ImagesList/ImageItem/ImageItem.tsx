import './ImageItem.scss';
import { ImageItemProps } from '../../../../types/interfaces';

const ImageItem = (props: ImageItemProps) => {
  const { image } = props;

  return <img src={image.src.original} alt={`${image.alt}`} className="image-item" />;
};

export default ImageItem;
