import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import StoryReducer from './StoryReducer';

export default combineReducers({
  auth: AuthReducer,
  loggeduser: UserReducer,
  currentStory: StoryReducer
});
