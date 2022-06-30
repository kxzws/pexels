import './ImageItem.scss';
import { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button/Button';
import DownloadIcon from '@mui/icons-material/Download';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ImageItemProps } from '../../../../types/interfaces';

const ImageItem = (props: ImageItemProps) => {
  const { image, liked, toggleLike } = props;
  const [source, setSource] = useState<string>(image.src.small);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const imageItem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const imageToLoad = new Image();
    imageToLoad.src = image.src.original;
    imageToLoad.onload = () => {
      setIsLoading(false);
      setSource(image.src.original);
    };
    imageToLoad.onerror = () => {
      setIsError(true);
    };
  }, []);

  const fetchImage = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const tempURL = URL.createObjectURL(blob);

      const anchor = document.createElement('a');
      anchor.href = tempURL;
      anchor.download = url.replace(/^.*[\\]/, '');
      document.body.append(anchor);
      anchor.click();
      URL.revokeObjectURL(tempURL);
      anchor.remove();
    } catch (error) {
      alert('Failed to download file!');
    }
  };

  return !isError ? (
    <div
      ref={imageItem}
      className="image-item"
      style={{
        height: imageItem.current
          ? (imageItem.current.offsetWidth * image.height) / image.width
          : 'auto',
      }}
    >
      <img
        src={source}
        alt={`${image.alt}`}
        className="image-item__img"
        style={{
          opacity: isLoading ? 0.5 : 1,
          transition: 'opacity .15s linear',
        }}
      />
      <div className="btn-group">
        <a
          href={image.photographer_url}
          className="btn-group__link"
          title={image.photographer}
          rel="noreferrer"
          target="_blank"
        >
          {image.photographer}
        </a>
        <Button
          variant="contained"
          size="small"
          disableElevation
          title="Нравится"
          color="inherit"
          sx={{
            mr: 1,
            minWidth: 40,
            height: 40,
            borderRadius: 2.5,
          }}
          onClick={(e) => {
            e.preventDefault();
            toggleLike(image.id);
          }}
        >
          {liked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
        </Button>
        <Button
          variant="contained"
          size="small"
          disableElevation
          title="Скачать"
          color="inherit"
          sx={{
            minWidth: 40,
            height: 40,
            borderRadius: 2.5,
          }}
          onClick={(e) => {
            e.preventDefault();
            fetchImage(image.src.original);
          }}
        >
          <DownloadIcon fontSize="small" />
        </Button>
      </div>
    </div>
  ) : null;
};

export default ImageItem;
