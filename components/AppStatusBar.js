import React from 'react';
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo';

type Props = {
  backgroundColor: string,
};

const AppStatusBar = (props: Props) => {
  const { backgroundColor, ...rest } = props;
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle="light-content"
        {...rest}
      />
    </View>
  );
};

export default AppStatusBar;
