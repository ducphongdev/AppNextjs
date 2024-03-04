// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { API_ROOT_PHOTO } from '@/utils/constants';
// import axios from 'axios';

// export const fetchBackdropPhotos = createAsyncThunk(
//   'backdrop/fetchBackdropPhotos',
//   async (_, thunkApi) => {
//     const response = await axios.get(
//       `${API_ROOT_PHOTO}/proxy/unsplash/collections/317099/photos`,
//       {
//         params: {
//           per_page: 30,
//           order_by: 'latest',
//           page: 1,
//         },
//       }
//     );
//     return response;
//   }
// );
