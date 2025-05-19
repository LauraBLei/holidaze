import { useState } from 'react';
import { Media } from '../Types/common';
import { BiX } from 'react-icons/bi';

interface GalleryType {
  media: Media[];
  isEditable?: boolean;
  onRemoveImage?: (url: string) => void;
}

/**
 * GalleryComponent displays a gallery of images with the ability to select an active image.
 * If the `isEditable` prop is passed as true, images can be removed from the gallery.
 *
 * @param {Object} props - The component's props.
 * @param {Media[]} props.media - An array of media objects, where each object contains `url` and `alt` properties.
 * @param {boolean} [props.isEditable=false] - A flag indicating if the gallery is editable. When true, images can be removed.
 * @param {function} [props.onRemoveImage] - A callback function to be called when an image is removed. Receives the URL of the removed image.
 *
 * @returns {JSX.Element} The rendered gallery component.
 */

export const GalleryComponent: React.FC<GalleryType> = ({ media, isEditable, onRemoveImage }) => {
  const [activeImage, setActiveImage] = useState<Media>(media[0]);

  const handleRemoveImage = (url: string) => {
    const updatedMedia = media.filter((image) => image.url !== url);
    if (updatedMedia.length > 0) {
      setActiveImage(updatedMedia[0]);
    }
    onRemoveImage?.(url);
  };

  return (
    <div className="w-full h-auto">
      {media.length > 0 && (
        <div
          id="activeImageContainer"
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-[10px] overflow-hidden mb-3 md:mb-6 relative"
        >
          <img className="object-cover w-full h-full" src={activeImage.url} alt={activeImage.alt} />

          {isEditable && (
            <button
              type="button"
              onClick={() => handleRemoveImage(activeImage.url)}
              className="absolute cursor-pointer hover:animate-pulse top-1 right-1 h-8 w-8 flex justify-center items-center text-black bg-error-red rounded-bl-xl"
              style={{ transform: 'translate(20%, -20%)' }}
            >
              <BiX size={24} />
            </button>
          )}
        </div>
      )}

      <div id="extraImageContainer" className="flex w-full gap-5 md:gap-x-12 gap-y-3 flex-wrap">
        {media.map((image) => {
          const isActive = image.url === activeImage.url;
          return (
            <div
              key={`${image.url}/${Math.random()}`}
              className={`w-[95px] h-[84px] rounded-[10px] overflow-hidden hover:scale-100 transition ${isActive ? 'scale-100 shadow-md' : 'scale-95'}`}
              onClick={() => setActiveImage(image)}
            >
              <img
                className="object-cover w-full h-full cursor-pointer"
                src={image.url}
                alt={image.url}
              />

              {isEditable && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage(image.url);
                  }}
                  className="absolute cursor-pointer hover:animate-pulse top-1 right-1 h-8 w-8 flex justify-center items-center text-black bg-error-red rounded-bl-xl"
                  style={{ transform: 'translate(20%, -20%)' }}
                >
                  <BiX size={24} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
