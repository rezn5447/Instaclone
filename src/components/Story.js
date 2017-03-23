import React, { Component } from 'react';
import _ from 'lodash';
import { StyleSheet, View, Dimensions, PanResponder, TouchableWithoutFeedback } from 'react-native';
import Indicator from './indicator';
import Image from 'react-native-image-progress';
import CircleSnail from 'react-native-progress/CircleSnail';
const { width, height } = Dimensions.get('window');

class Story extends Component {
  componentWillMount() {
    this.props.storyFetch(this.props.data);
    const indicatorAnim = new Animated.Value(0);
    const horizontalSwipe = new Animated.Value(0);
    const indicatorAnim = new Animated.Value(0);

  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }
  onNextItem() {

  }

  initPanResponder() {
		this.panResponder = PanResponder.create({
			onMoveShouldSetResponderCapture: () => true,
			onMoveShouldSetPanResponderCapture: (evt, { dx, dy }) => {
				if (Math.abs(dx) > 5) {
					this.swipedHorizontally = true;
					return true;
				}

				if (dy > 5) {
					this.swipedHorizontally = false;
					return true;
				}

				return false;
			},

			onPanResponderGrant: () => {
				if (this.swipedHorizontally) {
					this.horizontalSwipe.setOffset(this.props.horizontalSwipe.value);
					this.horizontalSwipe.setValue(0);
				}

				this.pause();
				this.setBackOpacity(0);
			},

			onPanResponderMove: (e, { dx, dy }) => {
				if (this.swipedHorizontally) {
					this.horizontalSwipe.setValue(-dx);
				} else {
					this.verticalSwipe.setValue(dy);
				}
			},

			onPanResponderRelease: (e, { dx, dy }) => {
				if (!this.swipedHorizontally) {
					if (dy > VERTICAL_THRESHOLD) return this.leaveStories();
					this.play();
					return this.resetVerticalSwipe();
				}

				this.horizontalSwipe.flattenOffset();
				const deckIdx = this.deckIdx;

				if (dx > HORIZONTAL_THRESHOLD) { // previous deck
					if (deckIdx == 0)
						return this.leaveStories();

					return this.animateDeck(width * (deckIdx - 1), true);
				}

				if (dx < -HORIZONTAL_THRESHOLD) { // -> next deck
					if (deckIdx == this.stories.length - 1)
						return this.leaveStories();

					return this.animateDeck(width * (deckIdx + 1), true);
				}

				this.play();
				return this.animateDeck(width * deckIdx);
			}
		});
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
          source={{ uri: this.props.storiesArray[storiesArray.idx].picture}}
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
