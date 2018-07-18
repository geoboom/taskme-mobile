import React from 'react';
import { View, Text } from 'react-native';

const CustomHeader = ({ heading, title, fallback = '' }) => (
  <View>
    {
      heading && title
        ?
          <Text
            style={{
              color: 'white',
              fontSize: 18,
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
              }}
            >
              {heading}:
            </Text> <Text>{title}</Text>
          </Text>
        :
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            {fallback}
          </Text>
    }
  </View>
);

export default CustomHeader;
