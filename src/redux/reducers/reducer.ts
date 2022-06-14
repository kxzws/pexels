import { combineReducers } from 'redux';
import bgImgReducer from './bgImgSlice';

const rootReducer = combineReducers({
  bgImg: bgImgReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
