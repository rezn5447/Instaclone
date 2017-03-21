import firebase from 'firebase';
import { Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';
import {
  USER_CREATE,
  USERS_FETCH_SUCCESS,
  USER_UPLOAD_IMAGE,
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

export const uploadImage = ({ uri, mime = 'application/octet-stream' }) => {
  return (dispatch) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    // const sessionId = new Date().getTime();
    let uploadBlob = null;
    const currentUser = firebase.auth();
    const storage = firebase.storage();
    const imageRef = storage.ref('images').child(`${currentUser.uid}`);

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
        console.log(dlURL);
        return dlURL;
      })
      .then((url) => {
        dispatch({ type: USER_UPLOAD_IMAGE_SUCCESS, payload: url });
      })
      .catch((error) => {
        dispatch({ type: USER_UPLOAD_IMAGE_FAIL, payload: error });
    });
  };
};
