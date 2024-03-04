import axios from 'axios';
import { API_ROOT_PHOTO } from '@/utils/constants';

export const fetchBackdropPhotos = async () => {
  const response = await axios.get(
    `${API_ROOT_PHOTO}/proxy/unsplash/collections/317099/photos`,
    {
      params: {
        per_page: 30,
        order_by: 'latest',
        page: 1,
      },
    }
  );

  return response.data;
};
