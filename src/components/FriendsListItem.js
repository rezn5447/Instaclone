import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';


const FriendsListItem = (props) => {
  const { name, profilePic, uid } = props.friend;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => Actions.story(uid: uid)}>
          <Image source={{ uri: profilePic }} style={styles.imageStyle} />
          <Text>{name}</Text>
        </TouchableOpacity>
      </View>
    );
};


const styles = {
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  nameStyle: {
    fontSize: 14
  },
  imageStyle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    margin: 10
  }
};

export default FriendsListItem;
