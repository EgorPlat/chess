import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { mainApi } from './api';
import mainSlice from './slices/mainSlice'

export const rootReducer = combineReducers({
  main: mainSlice
});

export const store = configureStore({
  reducer: {
    rootReducer: rootReducer,
    mainApi: mainApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mainApi.middleware)
});
