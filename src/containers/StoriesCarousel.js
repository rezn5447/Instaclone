import React, { Component } from 'react';
import _ from 'lodash';
import { Dimensions, StatusBar, PanResponder } from 'react-native';
import { connect } from 'react-redux';
import { storyFetch } from '../actions/Index';
import StoryItem from '../components/StoryItem';

const { width, height } = Dimensions.get('window');

class Stories extends Component {
  componentWillMount() {
    this.props.storyFetch(this.props.data);
    StatusBar.setHidden(true);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }


  openCarousel = (idx, offset) => {
    this.offset = offset;
    this.setDeckIdx(idx);
    this.horizontalSwipe.setValue(idx * width);

    requestAnimationFrame(() => {
      LayoutAnimation.easeInEaseOut();
      this.carouselOpen = true;
      this.animateIndicator();
    });
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
      <View style={styles.container} {...this.props.panResponder.panHandlers}>


      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    width,
    height,
    flexDirection: 'row',
    overflow: 'hidden',
    position: 'absolute',
  },
  bar: {
    backgroundColor: 'rgba(142,157,160,0.3)',
    width: 300
  },
};

const mapStateToProps = state => {
  const storiesArray = _.map(state.currentStory.stories, (val, uid) => {
   return { ...val, uid };
   });
   return { storiesArray };
};

export default connect(mapStateToProps, { storyFetch })(Stories);
