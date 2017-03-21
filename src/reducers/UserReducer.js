import {
  USERS_FETCH_SUCCESS,
  USER_UPLOAD_IMAGE_SUCCESS,
  USER_UPLOAD_IMAGE_FAIL
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USERS_FETCH_SUCCESS:
      return action.payload;
    case USER_UPLOAD_IMAGE_SUCCESS:
      return { ...state, image: action.payload };
    case USER_UPLOAD_IMAGE_FAIL:
      return { error: 'Image Upload Failed.' };
    default:
      return state;
  }
};
