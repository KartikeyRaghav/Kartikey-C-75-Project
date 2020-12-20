import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import Header from 'react-native-elements';
import AppHeader from '../components/AppHeader';
import db from '../Config';
import firebase from 'firebase';

export default class WritingScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      author: '',
      story: '',
    };
  }

  capitalizeWords(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  submitStory = () => {
    var author = this.capitalizeWords(this.state.author);
    var title = this.capitalizeWords(this.state.name);

    if (
      this.state.name != '' &&
      this.state.author != '' &&
      this.state.story != ''
    ) {
      db.collection('Number of stories')
        .doc('Number')
        .update({
          Number: firebase.firestore.FieldValue.increment(1),
        });

      db.collection('Stories').doc(title).set({
        Title: title,
        Author: author,
        Story: this.state.story,
      });

      ToastAndroid.show(
        'Your Story has been submitted',
        ToastAndroid.LONG,
        ToastAndroid.TOP
      );
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'pink',
        }}>
        <AppHeader />

        <TextInput
          placeholder="Story Title"
          style={styles.input1}
          value={this.state.name}
          onChangeText={(val) => {
            this.setState({ name: val });
          }}
          autoCapitalize="word"
        />

        <TextInput
          placeholder="Author"
          style={styles.input1}
          value={this.state.author}
          onChangeText={(val) => {
            this.setState({ author: val });
          }}
          autoCapitalize="word"
        />

        <TextInput
          placeholder="Write your story"
          style={styles.input2}
          multiline={true}
          value={this.state.story}
          onChangeText={(val) => {
            this.setState({ story: val });
          }}
        />

        <TouchableOpacity style={styles.container2} onPress={this.submitStory}>
          Submit Story
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            this.props.navigation.navigate('Read Story');
          }}>
          Read Story
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input1: {
    fontSize: 20,
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 3,
    borderWidth: 2,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 20,
    width: 322,
    textTransform: 'capitalize',
  },

  input2: {
    fontSize: 20,
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 3,
    borderWidth: 2,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 20,
    width: 322,
    height: 240,
  },

  container: {
    backgroundColor: 'blue',
    marginTop: 10,
    borderWidth: 2,
    padding: 2,
    fontSize: 20,
    fontStyle: 'italic',
    color: 'white',
    alignSelf: 'center',
  },

  container2: {
    backgroundColor: 'yellow',
    marginTop: 5,
    borderWidth: 2,
    padding: 2,
    borderRadius: 3,
    fontSize: 20,
    color: 'red',
    alignSelf: 'center',
  },
});
