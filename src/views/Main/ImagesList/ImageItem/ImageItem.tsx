import './ImageItem.scss';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import { ImageItemProps } from '../../../../types/interfaces';

const ImageItem = (props: ImageItemProps) => {
  const { image, num, loading } = props;

  return loading ? (
    <LinearProgress color="inherit" />
  ) : (
    <img src={image} alt={`${num}`} className="image-item" />
  );
};

export default ImageItem;
