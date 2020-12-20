import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AppHeader from '../components/AppHeader';
import { SearchBar, Icon } from 'react-native-elements';
import db from '../Config';
import { ScrollView } from 'react-native-gesture-handler';

export default class ReadingScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      allStories: [],
      dataSource: [],
    };
  }

  capitalizeWords(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  searchStoriesByTitle = async () => {
    this.setState({ dataSource: [] });
    const enteredText = this.capitalizeWords(this.state.search);

    const query = await db
      .collection('Stories')
      .where('Title', '==', enteredText)
      .get();
    query.docs.map((doc) => {
      var story = Object.values(doc.data());
      this.setState({
        dataSource: [...this.state.dataSource, story],
      });
    });
  };

  searchStoriesByAuthor = async () => {
    this.setState({ dataSource: [] });
    const enteredText = this.capitalizeWords(this.state.search);

    const query = await db
      .collection('Stories')
      .where('Author', '==', enteredText)
      .get();
    query.docs.map((doc) => {
      var story = Object.values(doc.data());
      this.setState({
        dataSource: [...this.state.dataSource, story],
      });
    });
  };

  componentDidMount = async () => {
    const query = await db.collection('Stories').get();
    query.docs.map((doc) => {
      var story = Object.values(doc.data());
      this.setState({ allStories: [...this.state.allStories, story] });
    });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'pink' }}>
        <AppHeader />
        <SearchBar
          placeholder="Please enter the full name of book or author"
          onChangeText={(val) => {
            this.setState({ search: val });
          }}
          value={this.state.search}
          style={styles.searchBar}
          lightTheme={true}
        />

        <View style={styles.view2}>
          <TouchableOpacity
            onPress={this.searchStoriesByTitle}
            style={styles.search}>
            Search By Title
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.searchStoriesByAuthor}
            style={styles.search}>
            Search By Author
          </TouchableOpacity>
        </View>

        <ScrollView>
          <Text>
            {this.state.search === ''
              ? this.state.allStories.map((doc, index) => {
                return (
                  <View style={styles.view}>
                    <p key={index}>
                      Title: {doc[2]}
                      <br />
                        Author: {doc[0]}
                      <br />
                        Story: {doc[1]}
                    </p>
                  </View>
                )
              })
              : this.state.dataSource.map((doc, index) => {
                return (
                  <View style={styles.view}>
                    <p key={index}>
                      Title: {doc[2]}
                      <br />
                        Author: {doc[0]}
                      <br />
                        Story: {doc[1]}
                    </p>
                  </View>
                );
              })}
          </Text>
        </ScrollView>

        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            this.props.navigation.navigate('Write a Story');
          }}>
          Write a Story
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    marginTop: 10,
    borderWidth: 2,
    padding: 2,
    fontSize: 20,
    fontStyle: 'italic',
    alignSelf: 'center',
  },

  searchBar: {
    textAlign: 'center',
    color: 'red',
    textTransform: 'capitalize',
    fontSize: 12.5,
  },

  view: {
    marginTop: 10,
    backgroundColor: 'black',
    color: 'white',
    padding: 5,
    borderRadius: 10,
  },
  search: {
    backgroundColor: 'yellow',
    color: 'red',
    padding: 2,
    borderRadius: 3,
    borderWidth: 2,
    fontSize: 18,
    marginRight: 10,
    marginLeft: 10,
  },
  view2: {
    marginTop: 10,
    alignItems: 'center',
    color: 'white',
    padding: 5,
    borderRadius: 10,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
