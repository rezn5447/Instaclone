import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import FriendsList from '../components/FriendsList';
import Feed from '../components/Feed';
import BottomBar from '../components/BottomBar';

import { userFetch } from '../actions/Index';

const { width } = Dimensions.get('window');

class UserProfile extends Component {
  componentWillMount() {
    this.props.userFetch();
    console.log(this.props);
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <FriendsList />
        <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={{ width, margin: 5 }}>
          <Feed />
        </ScrollView>
        <BottomBar />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
  },
  img: {
    height: 150,
    width: 150
  }
};

const mapStateToProps = state => {
  return { user: state.loggeduser };
};

export default connect(mapStateToProps, { userFetch })(UserProfile);
