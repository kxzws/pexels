import { combineReducers } from 'redux';
import mainReducer from './Main/slices';
import imagesReducer from './Images/slices';

const rootReducer = combineReducers({
  main: mainReducer,
  images: imagesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
