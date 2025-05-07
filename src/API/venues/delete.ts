import { API } from '../endpoints';
import { headers } from '../headers';

export const deleteVenue = async (id: string) => {
  try {
    const response = await fetch(API.VENUES + '/' + id, {
      method: 'DELETE',
      headers: headers(),
    });
    if (response.ok) {
      console.log('deleted post');
    }
  } catch (error) {
    console.log(error);
  }
};
