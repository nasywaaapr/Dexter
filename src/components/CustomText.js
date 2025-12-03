import React from 'react';
import { Text as RNText } from 'react-native';

export default function Text({ style, ...props }) {
  return (
    <RNText 
      style={[{ fontFamily: 'Poppins_400Regular' }, style]} 
      {...props} 
    />
  );
}