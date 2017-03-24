import firebase from 'firebase';
import {
  STORY_FETCH_SUCCESS,
  PAUSE_CHANGED,
  BACKOPACITY_CHANGED,
  IDX_CHANGED,
  CAROUSEL_STATE_CHANGED,
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

export const pauseChanged = (paused) => {
  return {
    type: PAUSE_CHANGED,
    payload: paused
  };
};


export const carouselChanged = (status) => {
  return {
    type: CAROUSEL_STATE_CHANGED,
    payload: status
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
