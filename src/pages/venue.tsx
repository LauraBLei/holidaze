import LoadingVenuePage from '../Components/loading/loadingVenuePage';

import { useParams } from 'react-router-dom';

export const VenuePage = () => {
  const { id } = useParams();
  console.log('id', id);

  return (
    <div>
      <LoadingVenuePage />
    </div>
  );
};
