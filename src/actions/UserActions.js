import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  USER_CREATE,
  USERS_FETCH_SUCCESS
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
