import './ImageItem.scss';
import { useEffect, useState } from 'react';
import { ImageItemProps } from '../../../../types/interfaces';

const ImageItem = (props: ImageItemProps) => {
  const { image } = props;
  const [source, setSource] = useState<string>(image.src.small);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const imageToLoad = new Image();
    imageToLoad.src = image.src.original;
    imageToLoad.onload = () => {
      setIsLoading(false);
      setSource(image.src.original);
    };
  }, []);

  return (
    <div className="image-item">
      <img
        src={source}
        alt={`${image.alt}`}
        className="image-item__img"
        style={{
          opacity: isLoading ? 0.5 : 1,
          transition: 'opacity .15s linear',
        }}
      />
      {/* <div className="btn-group btn-group_author">author</div>
      <div className="btn-group btn-group_panel">btns</div> */}
    </div>
  );
};

export default ImageItem;
