import React from 'react';
import {Button, View, Text, FlatList, TouchableOpacity} from 'react-native';
import { Audio } from 'expo-av';
import { ProgressBar } from 'react-native-paper';
import { meditations } from '../mocks';

// class MeditationsScreen extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       meditations: [
//         { id: '1', title: 'Meditation 1', audio: require('./assets/audio1.mp3') },
//         { id: '2', title: 'Meditation 2', audio: require('./assets/audio2.mp3') },
//         // Replace with actual audio file paths
//       ],
//     };
//   }

//   renderItem = ({ item }) => {
//     return (
//       <TouchableOpacity onPress={() => this.props.navigation.navigate('MeditationDetail', { meditation: item })}>
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//           <Text>{item.title}</Text>
//           <AudioPlayer source={item.audio} />
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   render() {
//     return (
//       <FlatList
//         data={this.state.meditations}
//         renderItem={this.renderItem}
//         keyExtractor={item => item.id}
//         ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#ccc' }} />}
//       />
//     );
//   }
// }

// class MeditationDetailScreen extends React.Component {
//   render() {
//     const { meditation } = this.props.route.params;
//     return (
//       <View>
//         <Text>{meditation.title}</Text>
//         <AudioPlayer source={meditation.audio} />
//       </View>
//     );
//   }
// }

// class AudioPlayer extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       durationMillis: 0,
//       positionMillis: 0,
//     };
//   }

//   async componentDidMount() {
//     const { sound } = await Audio.Sound.createAsync(this.props.source);
//     this.sound = sound;

//     this.sound.setOnPlaybackStatusUpdate(this.updateState);
//     const status = await this.sound.getStatusAsync();
//     this.updateState(status);
//   }

//   componentWillUnmount() {
//     this.sound.unloadAsync();
//   }

//   updateState = status => {
//     if (status.isLoaded) {
//       this.setState({
//         durationMillis: status.durationMillis,
//         positionMillis: status.positionMillis,
//       });
//     }
//   };

//   render() {
//     const { durationMillis, positionMillis } = this.state;

//     return (
//       <View>
//         <Text>Duration: {Math.floor(durationMillis / 1000)} s</Text>
//         <Text>Current Position: {Math.floor(positionMillis / 1000)} s</Text>
//       </View>
//     );
//   }
// }

// export { MeditationsScreen, MeditationDetailScreen };

export class MeditationsScreen extends React.Component {
  state = {
    expandedId: null,
  };

  handlePress = (item) => {
    this.props.navigation.navigate('MeditationDetail', { title: item.title, uri: item.uri });
  };

  render() {
    const { expandedId } = this.state;

    return (
      <FlatList
        data={meditations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => this.handlePress(item)}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
            {expandedId === item.id && (
              <View>
                <Text>Expanded Content Here...</Text>
                <Button title="Play" onPress={() => console.log("Play " + item.title)} />
              </View>
            )}
          </View>
        )}
      />
    );
  }
}

export class MeditationDetailScreen extends React.Component {
  sound = null;
  state = {
    positionMillis: 0,
    durationMillis: 1,
  };

  async componentDidMount() {
    const { route } = this.props;
    const { uri } = route.params;

    const { sound } = await Audio.Sound.createAsync({ uri });

    sound.setOnPlaybackStatusUpdate(this.handlePlaybackStatusUpdate);
    await sound.playAsync();

    this.sound = sound;
  }

  componentWillUnmount() {
    if (this.sound) {
      this.sound.unloadAsync();
    }
  }

  handlePlaybackStatusUpdate = status => {
    if (status.isLoaded) {
      this.setState({
        positionMillis: status.positionMillis,
        durationMillis: status.durationMillis,
      });
    }
  };

  render() {
    const { route } = this.props;
    const { title } = route.params;
    const { positionMillis, durationMillis } = this.state;

    return (
      <View>
        <Text>{title}</Text>
        <ProgressBar progress={positionMillis / durationMillis} color={'#1a73e8'} />
        <Button title="Pause" onPress={this.handlePausePress} />
        <Button title="Play" onPress={this.handlePlayPress} />
      </View>
    );
  }

  handlePausePress = () => {
    if (this.sound) {
      this.sound.pauseAsync();
    }
  };

  handlePlayPress = () => {
    if (this.sound) {
      this.sound.playAsync();
    }
  };
}
