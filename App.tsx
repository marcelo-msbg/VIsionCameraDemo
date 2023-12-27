import 'react-native-reanimated';
import 'react-native-worklets-core';

import React from 'react';

import { NativeBaseProvider, VStack } from 'native-base';
import CameraTest from './src/CameraTest';

function App(): JSX.Element {

  return (
    <NativeBaseProvider>
      <CameraTest />
    </NativeBaseProvider>
  );
}

export default App;
