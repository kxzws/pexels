import React, { useCallback, useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button/Button';
import DownloadIcon from '@mui/icons-material/Download';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { ImageItemProps } from '../../../../types/interfaces';
import './ImageItem.scss';

const ImageItem = (props: ImageItemProps) => {
  const { image, liked, toggleLike, lazy } = props;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const divEl = useRef<HTMLDivElement>(null);
  const imgEl = useRef<HTMLImageElement>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const setPreloader = useCallback(() => {
    const imageToLoad = new Image();
    imageToLoad.onload = () => {
      setIsLoading(false);
    };
    imageToLoad.onerror = () => {
      setIsError(true);
    };

    imageToLoad.src = image.src.large;
  }, [setIsLoading, setIsError]);

  const setObserver = useCallback(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setPreloader();
          observerRef.current?.disconnect();
        }
      });
    });

    observerRef.current.observe(imgEl.current as Element);
  }, [setPreloader]);

  useEffect(() => {
    // setPreloader();
    // if (lazy && 'IntersectionObserver' in window) {
    setObserver();
    // } else {
    //   setPreloader();
    // }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [lazy, setObserver, setPreloader]);

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
      ref={divEl}
      className="image-item"
      style={{
        height: divEl.current ? (divEl.current.offsetWidth * image.height) / image.width : 'auto',
      }}
    >
      <img
        ref={imgEl}
        loading="lazy"
        src={image.src.large}
        alt={`${image.alt}`}
        className="image-item__img"
        onError={(e: React.BaseSyntheticEvent) => {
          e.target.src = null;
        }}
        style={{
          opacity: isLoading ? 0.5 : 1,
          transition: 'opacity 300ms cubic- bezier(0.215, 0.61, 0.355, 1)',
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
            fetchImage(image.src.small);
          }}
        >
          <DownloadIcon fontSize="small" />
        </Button>
      </div>
    </div>
  ) : null;
};

export default ImageItem;
