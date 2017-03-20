import React, { Component } from 'react';
import _ from 'lodash';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import FriendsListItem from './FriendsListItem';

class FriendsList extends Component {
  componentWillMount() {
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ friends }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(friends);
  }
  renderRow(friend) {
    return <FriendsListItem friend={friend} />;
  }

  render() {
    return (
      <ListView
        horizontal
        enableEmptySections
        showsHorizonalScrollindicator={false}
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  const friends = _.map(state.loggeduser.friends, (val, uid) => {
    return { ...val, uid };
  });
    return { friends };
};

export default connect(mapStateToProps)(FriendsList);
