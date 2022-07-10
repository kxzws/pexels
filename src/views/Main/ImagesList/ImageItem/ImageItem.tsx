import { useEffect, useRef, useState } from 'react';
import Alert from '@mui/material/Alert/Alert';
import AlertTitle from '@mui/material/AlertTitle/AlertTitle';
import Button from '@mui/material/Button/Button';
import DownloadIcon from '@mui/icons-material/Download';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ImageItemProps } from '../../../../types/interfaces';
import './ImageItem.scss';

const ImageItem = (props: ImageItemProps) => {
  const { image, likedIDs, setLikedIDs } = props;

  const [source, setSource] = useState<string>(image.src.small);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [downloadError, setDownloadError] = useState<boolean>(false);

  const imageItem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const imageToLoad = new Image();
    imageToLoad.onload = () => {
      setIsLoading(false);
      setSource(image.src.large);
    };
    imageToLoad.onerror = () => {
      setIsError(true);
    };
    imageToLoad.src = image.src.large;
  }, []);

  const downloadImage = async (url: string) => {
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
      console.log('error');
      setDownloadError(true);
    }
  };

  const toggleLikedID = (id: number) => {
    const copy = { ...likedIDs, [id]: !likedIDs[id] };
    if (!copy[id]) {
      delete copy[id];
    }
    setLikedIDs(copy);
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
      {downloadError && (
        <Alert
          severity="error"
          onClose={() => {
            setDownloadError(false);
          }}
          sx={{
            position: 'absolute',
            zIndex: 3,
            top: 0,
            left: 0,
            right: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          <AlertTitle>Error</AlertTitle>
          Something went wrong, try to download later
        </Alert>
      )}
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
            toggleLikedID(image.id);
          }}
        >
          {likedIDs[image.id] ? (
            <FavoriteIcon fontSize="small" />
          ) : (
            <FavoriteBorderIcon fontSize="small" />
          )}
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
            downloadImage(image.src.original);
          }}
        >
          <DownloadIcon fontSize="small" />
        </Button>
      </div>
    </div>
  ) : null;
};

export default ImageItem;
