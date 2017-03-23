import {
  STORY_FETCH_SUCCESS,
  PAUSE_CHANGED,
  IDX_CHANGED,
  BACKOPACITY_CHANGED,
  CAROUSEL_STATE_CHANGED,
  CAROUSEL_STATE_OFF,
} from '../actions/types';


const INITIAL_STATE = {
  stories: {},
  carouselOpen: false,
  paused: false,
  storyidx: 0,
  backOpacity: 0,
  indicatorAnim: 0,
  horizontalSwipe: 0,
  verticalSwipe: 0,
  swipedHorizontally: true,
  panResponder: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORY_FETCH_SUCCESS:
      return { ...state, stories: action.payload };
    case PAUSE_CHANGED:
      return { ...state, paused: action.payload };
    case IDX_CHANGED:
      return { ...state, storyidx: action.payload };
    case BACKOPACITY_CHANGED:
      return { ...state, backOpacity: action.payload };
    case CAROUSEL_STATE_CHANGED:
      return { ...state, carouselOpen: action.payload };
    case CAROUSEL_STATE_OFF:
      return { ...state, ...INITIAL_STATE, carouselOpen: false };
    default:
      return state;
  }
};
