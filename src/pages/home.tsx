import { GalleryComponent } from '../Components/gallery';
import LoadingVenueCard from '../Components/loading/loadingVenueCard';

export const HomePage = () => {
  const Test = [
    { url: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg', alt: 'dogOne' },
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSER-pd5O-l8AQf4LD2cyqpEPYFVcA4iFehA&s',
      alt: 'dogTwo',
    },
    {
      url: 'https://cdn.royalcanin-weshare-online.io/HiJiPmYBaxEApS7LmAfe/v1/ed7a-how-to-buy-a-puppy-article-dog',
      alt: 'dogThree',
    },
  ];
  return (
    <>
      <h1 className="headlineOne">Home Page</h1>
      <h2 className="headlineTwo">Test commit hook </h2>
      <GalleryComponent media={Test} />
      <h2 className="font-primary">Test terminal log when commit</h2>
      <LoadingVenueCard />
      <p className="text">
        {' '}
        Towering six meters above the Tessungåe river that runs down from the great plateau of
        Norway, Hardangervidda, you will feel truly immersed in nature from your unique vantage
        point. Take in unparalleled views over the rushing river and into the forest beyond through
        full-length windows spanning the entire living area.The cleverly designed space has a
        surprisingly generous capacity, so not only is it ideal for a couple on a romantic getaway,
        it can also accommodate families and large groups. On the lower level, you will find two
        sleeping alcoves, complete with premium double mattresses and leafy views. Upstairs in the
        mezzanine, there is a cosy sleeping loft with queen sized bed, panoramic windows and a huge
        skylight, so you can enjoy a magical moment drifting off to sleep with a view of the
        constellations above. You'll surely sleep soundly here at the treehouse!{' '}
      </p>
      <button className="button transition">Button</button>
    </>
  );
};
