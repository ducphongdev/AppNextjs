// import { createSlice } from '@reduxjs/toolkit';
// import { fetchBackdropPhotos } from './backdropThunk';

// const initialState = {
//   isLoading: false,
//   isError: false,
//   backdrop: [],
// };

// export const backdrop = createSlice({
//   name: 'backdrop',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchBackdropPhotos.pending, (state) => {
//       state.isLoading = true;
//     });
//     builder.addCase(fetchBackdropPhotos.fulfilled, (state, { payload }) => {
//       state.isLoading = false;
//       state.isError = false;
//       state.backdrop = payload?.data as any;
//     });
//     builder.addCase(fetchBackdropPhotos.rejected, (state, action) => {
//       state.isError = true;
//     });
//   },
// });

// export const {} = backdrop.actions;

// export default backdrop.reducer;
