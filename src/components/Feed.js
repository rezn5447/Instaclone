import React, { Component } from 'react';
import _ from 'lodash';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import FeedItem from './FeedItem';

class Feed extends Component {
  componentWillMount() {
  this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ feed }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(feed);
  }
  renderRow(feeditem) {
    return <FeedItem feeditem={feeditem} />;
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  const feed = _.map(state.loggeduser.feed, (val, uid) => {
    return { ...val, uid };
  });
  return { feed };
};

export default connect(mapStateToProps)(Feed);
