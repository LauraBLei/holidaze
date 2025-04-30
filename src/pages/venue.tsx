import LoadingVenuePage from '../Components/loading/loadingVenuePage';

import { useSearchParams } from 'react-router-dom';

export const VenuePage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  console.log('id', id);

  return <LoadingVenuePage />;
};
