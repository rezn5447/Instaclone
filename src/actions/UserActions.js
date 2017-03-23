import firebase from 'firebase';
import { Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';
import {
  USER_CREATE,
  USERS_FETCH_SUCCESS,
  USER_UPLOAD_IMAGE_SUCCESS,
  USER_UPLOAD_IMAGE_FAIL
} from './types';

export const UserCreate = ({ name, phone, shift }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}`)
    .push({ name, phone, shift })
    .then(() => {
      dispatch({ type: USER_CREATE });
      Actions.employeeList({ type: 'reset' });
    });
  };
};

export const userFetch = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}`)
    .on('value', snapshot => {
      dispatch({ type: USERS_FETCH_SUCCESS, payload: snapshot.val() });
    });
  };
};

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;


export const uploadMedia = (uri, type) => {
  const { currentUser } = firebase.auth();
  const sessionId = new Date().getTime();
  const imageRef = firebase.storage().ref(`/images/${currentUser.uid}/story/${sessionId}`);
  const userRef = firebase.database().ref(`/users/${currentUser.uid}/story`);
  const mime = type === 'picture' ? 'image/jpeg' : 'video/mp4';
  const uploadUri = Platform.OS === 'android' ? uri.path.replace('file://', '') : uri.path;

  return (dispatch) => {
    let uploadBlob = null;

    // const uploadUri = uri.path;
    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then((blob) => {
        uploadBlob = blob;
        return imageRef.put(blob, { contentType: mime });
      })
      .then(() => {
        uploadBlob.close();
        const dlURL = imageRef.getDownloadURL();
        return dlURL;
      })
      .then((url) => {
        userRef.push({ picture: url, type });
        dispatch({ type: USER_UPLOAD_IMAGE_SUCCESS, payload: url });
        Actions.userProfile();
      })
      .catch((error) => {
        dispatch({ type: USER_UPLOAD_IMAGE_FAIL, payload: error });
        Actions.userProfile();
    });
  };
};
