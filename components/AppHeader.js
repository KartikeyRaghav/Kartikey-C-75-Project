import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class AppHeader extends React.Component {
  render() {
    return (
      <View style={{ backgroundColor: '#00ffff' }}>
        <Text style={styles.text}>Story Hub</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#663300',
  },
});
