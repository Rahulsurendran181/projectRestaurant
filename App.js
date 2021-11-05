import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Navigation from './Modules/Navigation/navigation';
export default class App extends React.Component {
  constructor() {
    super();
  }

  async componentDidMount() {
    
  }

  render() {
    return (
      <View style={styles.backgroundContainer}>
        <Navigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
  }
});