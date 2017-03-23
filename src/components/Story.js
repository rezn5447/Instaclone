import React, { Component } from 'react';
import _ from 'lodash';
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Indicator from './indicator';
import Image from 'react-native-image-progress';
import CircleSnail from 'react-native-progress/CircleSnail';
const { width, height } = Dimensions.get('window');

class Story extends Component {
  componentWillMount() {
    this.props.storyFetch(this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }
  onNextItem() {

  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.props.onNextItem.bind(this)}
        delayPressIn={200}
        onPressIn={this.props.pause}
      >
      <View style={{flex: 1}}>
        <Image
          source={{ uri: storiesArray[storiesArray.idx].picture}}
          style={styles.deck}
          indicator={CircleSnail}
          indicatorProps={circleSnailProps}
        />
      </View>
    </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
	deck: {
		width,
    height,
		backgroundColor: 'white',
	},

	progressIndicator: {
		position: 'absolute',
		top: 0,
    left: 0,
    right: 0,
    bottom: 0,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
	},

	indicatorWrap: {
		position: 'absolute',
		top: 0,
    left: 0,
    right: 0,
	},
	indicators: {
		height: 30,
		alignItems: 'center',
		paddingHorizontal: 8,
		flexDirection: 'row',
	},
	indicatorBg: {
		position: 'absolute',
		top: 0,
    left: 0,
    right: 0,
		height: 50,
	},

	back: {
		backgroundColor: 'transparent',
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		width: 90,
	},

	closeButton: {
		position: 'absolute',
		top: 0,
		right: 0,
		width: 70,
		height: 70,
		zIndex: 1,
	},
	closeCross: {
		position: 'absolute',
		top: 32,
    right: 8,
		width: 20,
		height: 1,
		backgroundColor: '#fff'
	}
});

const mapStateToProps = state => {
  const storiesArray = _.map(state.currentStory.stories, (val, uid) => {
   return { ...val, uid };
   });
   return { storiesArray };
};

export default connect(mapStateToProps, { storyFetch })(Story);
