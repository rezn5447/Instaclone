import React, { Component } from 'react';

import { View, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('window');

class BottomBar extends Component {
  render() {
    return (
      <View style={styles.bottomNav}>
        <Icon style={styles.navIcon} size={24} name="md-home" />
        <Icon style={styles.navIcon} size={24} name="md-search" />
        <TouchableOpacity onPress={() => Actions.gramcreate()}>
          <Icon style={styles.navIcon} size={24} name="ios-aperture-outline" />
        </TouchableOpacity>
        <Icon style={styles.navIcon} size={24} name="md-heart" />
        <Icon style={styles.navIcon} size={24} name="md-man" />
      </View>
    );
  }
}

const styles = {
  bottomNav: {
    backgroundColor: '#CCC',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width,
    height: 50,
  },
  navIcon: {
    color: '#FFF',
  }
};

export default BottomBar;
