import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
      <Text style={styles.textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  
};


export { Button };
