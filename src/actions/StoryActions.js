import firebase from 'firebase';
import {
  STORY_FETCH_SUCCESS,
  PAUSE_OFF,
  PAUSE_ON,
  BACKOPACITY_CHANGED,
  IDX_CHANGED,
  CAROUSEL_STATE_ON,
  CAROUSEL_STATE_OFF
} from './types';

export const storyFetch = (uid) => {
  return (dispatch) => {
    firebase.database().ref(`/users/${uid}/story`)
    .on('value', snapshot => {
      dispatch({ type: STORY_FETCH_SUCCESS, payload: snapshot.val() });
    });
  };
};

export const pauseOff = () => {
  return {
    type: PAUSE_OFF,
  };
};

export const pauseOn = () => {
  return {
    type: PAUSE_ON,
  };
};

export const carouselStateOff = () => {
  return {
    type: CAROUSEL_STATE_OFF,
  };
};

export const carouselStateOn = () => {
  return {
    type: CAROUSEL_STATE_ON,
  };
};

export const idxChanged = (val) => {
  return {
    type: IDX_CHANGED,
    payload: val
  };
};

export const backOpacityChanged = (val) => {
  return {
    type: BACKOPACITY_CHANGED,
    payload: val
  };
};
