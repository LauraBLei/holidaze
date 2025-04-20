import { useState } from 'react';
import { Media } from '../Types/common';

interface GalleryType {
  media: Media[];
}

export const GalleryComponent: React.FC<GalleryType> = ({ media }) => {
  const [activeImage, setActiveImage] = useState<Media>(media[0]);

  return (
    <div className="max-w-[530px]  w-full h-full">
      <div
        id="activeImageContainer"
        className="w-full h-full aspect-[530/440]  rounded-[10px] overflow-hidden mb-3 md:mb-6"
      >
        <img className="object-cover w-full h-full " src={activeImage.url} alt={activeImage.alt} />
      </div>
      <div id="extraImageContainer" className="flex w-full  gap-5 md:gap-x-12 gap-y-3  flex-wrap">
        {media.map((image) => {
          const isActive = image.url === activeImage.url;
          return (
            <div
              key={image.url}
              className={`w-[95px] h-[84px] rounded-[10px] overflow-hidden hover:scale-100 transition ${isActive ? `scale-100 shadow-md` : `scale-95`}`}
              onClick={() => setActiveImage(image)}
            >
              <img
                className="object-cover w-full h-full cursor-pointer"
                src={image.url}
                alt={image.url}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
