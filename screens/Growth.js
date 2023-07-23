import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { Modal, Portal } from "react-native-paper";
import { Button, View, Text } from "react-native";
import { VictoryChart, VictoryLine } from "victory-native";

export default class GrowthScreen extends React.Component {
  state = {
    totalDuration: 0,
    showModal: false,
    emotions: [],
  };

  emotionValues = {
    "very sad": -4,
    sad: -3,
    hurt: -2,
    afraid: -1,
    neutral: 0,
    curious: 1,
    confused: 2,
    happy: 3,
    "very happy": 4,
    reflective: 2,
  };

  async componentDidMount() {
    this.retrieveData();
    this.scheduleNotification();
  }

  // ...rest of the code

  handleEmotionPress = (emotion) => {
    this.setState((prevState) => ({
      emotions: [
        ...prevState.emotions,
        { emotion, value: this.emotionValues[emotion] },
      ],
      showModal: false,
    }));
  };

  render() {
    const { totalDuration, showModal, emotions } = this.state;
    return (
      <View>
        <Text>Total duration: {totalDuration}</Text>
        <Button
          title="Open Emotion Check-In"
          onPress={() => this.setState({ showModal: true })}
        />
        <Portal>
          <Modal
            visible={showModal}
            onDismiss={() => this.setState({ showModal: false })}
          >
            <Text>How are you feeling today?</Text>
            {Object.keys(this.emotionValues).map((emotion) => (
              <Button
                title={emotion}
                key={emotion}
                onPress={() => this.handleEmotionPress(emotion)}
              />
            ))}
          </Modal>
        </Portal>
        {/* <VictoryChart>
          <VictoryLine
            data={emotions.map((emotion, index) => ({ x: index, y: emotion.value }))}
          />
        </VictoryChart> */}
      </View>
    );
  }
}
