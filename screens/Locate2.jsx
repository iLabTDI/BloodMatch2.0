import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const Location = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: `https://www.openstreetmap.org?mlat=20.6596988&mlon=-103.3496092#map=15/20.6597/-103.3496`,
        }}
        style={styles.map}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Location;
