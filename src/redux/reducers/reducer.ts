import { combineReducers } from 'redux';
import mainReducer from './mainSlice';
import imagesReducer from './imagesSlice';

const rootReducer = combineReducers({
  main: mainReducer,
  images: imagesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
