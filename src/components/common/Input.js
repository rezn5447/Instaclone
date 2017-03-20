import React from 'react';
import { TextInput, View } from 'react-native';

const Input = ({ placeHolder, value, onChangeText, secureTextEntry }) => {
  const { inputStyle, containerStyle } = styles;
  return (
  <View style={containerStyle}>
    <TextInput
      secureTextEntry={secureTextEntry}
      placeHolder={placeHolder}
      autoCorrect={false}
      style={inputStyle}
      value={value}
      onChangeText={onChangeText}
    />
  </View>
  );
};

const styles = {
  inputStyle: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    color: '#FFF',
    paddingHorizontal: 10
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { Input };
