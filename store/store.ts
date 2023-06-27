import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import protocolsSlices from '../slices/protocolsSlices';

const store = configureStore({
  reducer: {
    protocols: protocolsSlices,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export {store};
