import React from 'react';
import { View, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const StoryItem = (props) => {
  const { picture } = props.story;
    return (
      <View style={styles.container}>
        <Image source={{ uri: picture }} style={styles.imageStyle} />
      </View>
    );
  };

const styles = {
  containerStyle: {
    flex: 1,
    width,
    height,
    top: 0,
    left: 0,
    flexDirection: 'row'
  },
  imageStyle: {},
  bar: {
    backgroundColor: 'rgba(142,157,160,0.3)',
    width: 300
  },
};

export default StoryItem;
