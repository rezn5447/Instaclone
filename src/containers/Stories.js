import React, { Component } from 'react';
import _ from 'lodash';
import { ListView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { storyFetch } from '../actions/Index';
import StoryItem from '../components/StoryItem';

const { width, height } = Dimensions.get('window');

class Stories extends Component {
  componentWillMount() {
    this.props.storyFetch(this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ storiesArray }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(storiesArray);
  }
  renderRow(storyItem) {
    return <StoryItem story={storyItem} />;
  }

  render() {
    return (
      <ListView
        horizontal
        enableEmptySections
        showsHorizonalScrollindicator={false}
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        style={styles.containerStyle}
      />
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
