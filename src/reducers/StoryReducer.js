import {
  STORY_FETCH_SUCCESS,
  PAUSE_ON,
  PAUSE_OFF,
  IDX_CHANGED,
  BACKOPACITY_CHANGED,
  CAROUSEL_STATE_ON,
  CAROUSEL_STATE_OFF,
} from '../actions/types';

const INITIAL_STATE = {
  stories: {},
  carouselOpen: false,
  paused: false,
  storyidx: 0,
  backOpacity: 0,
  
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORY_FETCH_SUCCESS:
      return { ...state, stories: action.payload };
    case PAUSE_ON:
      return { ...state, paused: true };
    case PAUSE_OFF:
      return { ...state, paused: false };
    case IDX_CHANGED:
      return { ...state, storyidx: action.payload };
    case BACKOPACITY_CHANGED:
      return { ...state, backOpacity: action.payload };
    case CAROUSEL_STATE_ON:
      return { ...state, carouselOpen: true };
    case CAROUSEL_STATE_OFF:
      return { ...state, ...INITIAL_STATE, carouselOpen: false };
    default:
      return state;
  }
};
