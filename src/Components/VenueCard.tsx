import { BiStar } from 'react-icons/bi';

interface VenueCardProps {
  image: string;
  imageAlt: string;
  title: string;
  rating: number;
  description: string;
  price: number;
}

export const VenueCard: React.FC<VenueCardProps> = ({
  image,
  imageAlt,
  title,
  rating,
  description,
  price,
}) => {
  return (
    <article className="flex flex-col  md:max-w-[280px] w-full gap-[20px] animate-pulse">
      <img className="cardImage h-[200px] bg-[#C4C4C4] rounded-xl" src={image} alt={imageAlt} />
      <div className="title-rating-container flex justify-between">
        <h3 className="bg-[#C4C4C4] h-[27px] w-[60%] rounded text-base font-bold"> {title} </h3>
        <div className="flex ratingWrapper">
          <BiStar />
          <p className="text-xs">{rating}</p>
        </div>
      </div>
      <p className="bg-[#C4C4C4] w-full h-[50px] rounded text-sm">{description}</p>
      <div className="bg-[#C4C4C4] w-[35%] h-[27px] rounded text-sm font-bold">
        {price}$ / night
      </div>
    </article>
  );
};
