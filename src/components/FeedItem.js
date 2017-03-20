import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const FeedItem = (props) => {
    const { name, picture } = props.feeditem;
    return (
      <View style={styles.containerStyle} >
        <Image style={styles.imageStyle} source={{ uri: picture }} />
        <Text style={styles.titleStyle} >{name}</Text>
        <View style={styles.feedBarStyle}>
          <Icon style={styles.navIconStyle} size={14} name="md-heart" />
          <Text style={styles.titleStyle} >10 likes</Text>
        </View>
      </View>
    );
};

const styles = {
containerStyle: {
  borderBottomWidth: 2,
  backgroundColor: '#FFF',
  justifyContent: 'center',
  flexDirection: 'column',
  borderColor: '#DDD',
},
imageStyle: {
  height: 300,
  width: width - 50,
  margin: 10,
},
titleStyle: {},
feedBarStyle: {
  flexDirection: 'row',
  alignItems: 'center',
},
navIconStyle: {
  marginLeft: 5,
  marginRight: 5
},

};

export default FeedItem;
