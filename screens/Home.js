import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Icon,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-elements";
import { useQuery, gql } from "@apollo/client";

const styles = StyleSheet.create({
  container: {},
  mainContainer: {
    display: "flex",
    flex: 1,
    backgroundColor: "#d4ddb2",
    paddding: "16px",
    overflow: "scroll",
    paddingBottom: 60,
  },
  headerContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  tempText: {
    fontSize: 48,
    color: "#fff",
  },
  bodyContainer: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingLeft: 25,
    marginBottom: 40,
  },
  title: {
    marginTop: 30,
    marginLeft: 30,
    fontSize: 48,
    color: "#2a8dbd",
  },
  subtitle: {
    fontSize: 24,
    color: "#fff",
  },
  gridContainer: {
    width: "50%",
    flex: 0.5,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  container: {
    width: "30",
    height: "30",
  },
  textTitle: {
    fontSize: 32,
  },
  headerIconContainer: {
    marginLeft: 30,
    flex: 0.5,
  },
});

const practiceCardStyles = StyleSheet.create({
  card: {
    position: "relative",
    backgroundColor: "#fdedbf",
    border: "1px solid #fdedbf",
    borderRadius: "8px",
    color: "white",
    maxWidth: "250px",
    padding: "16px",
  },
  title: {
    color: "#2a8dbd",
    fontSize: "14px",
  },
  author: {
    marginTop: "12px",
    fontSize: "12px",
    color: "#a1a5a9",
  },
  arrowRight: {
    position: "absolute",
    right: "8px",
    top: "33%",
  },
});

const PracticeContainer = () => {
  return (
    <View style={practiceCardStyles.card}>
      <Text style={practiceCardStyles.title}>Daily Affirmation</Text>
      <Text style={practiceCardStyles.author}>Stan Getz</Text>
      <MaterialCommunityIcons
        style={practiceCardStyles.arrowRight}
        size={30}
        name="arrow-right"
        color={"#B4A8E0"}
      />
    </View>
  );
};
const data = [
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "something one",
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "something six",
  },
];

const dailyPracticeStyles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    width: "90%",
    backgroundColor: "#fdedbf",
    border: "1px solid #fdedbf",
    borderRadius: 8,
    padding: 16,
    marginTop: 70,
    marginLeft: 12,
    marginRight: 12,
    minHeight: 300,
  },
  title: {
    fontSize: 30,
    color: "#2a8dbd",
    marginBottom: 18,
  },
  button: {
    backgroundColor: "#FFD8E3",
    borderRadius: 0,
    marginTop: 10,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    height: 70,
    width: 150,
    marginLeft: "auto",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  description: {
    marginTop: 10,
    color: "white",
  },
});
const DailyPracticeContainer = () => {
  const { data, loading } = useQuery(QUERY_MANTRAS);
  console.log(data);
  const items = data?.dailyMantrasCollection?.items?.map((mantra) => ({
    title: mantra?.sutraNumber,
    subtitle: mantra?.sutraSanskrit,
    description: mantra?.sutraTranslation,
  }));
  return (
    <View style={dailyPracticeStyles.container}>
      <Text style={dailyPracticeStyles.title}>Daily Practice</Text>
      <FlatList
        horizontal
        data={items}
        renderItem={({ item: rowData }) => {
          return (
            <Card
              title={null}
              image={{ uri: rowData?.imageUrl }}
              wrapperStyle={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                justifyContent: "space-between",
              }}
              containerStyle={{
                padding: 0,
                width: 300,
                height: 200,
                borderRadius: "8px",
                backgroundColor: "#B4A8E0",
                border: "1px solid #B4A8E0",
                padding: "24px",
                display: "flex",
                flex: 1,
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <Text style={{ marginBottom: 10, color: "white" }}>
                {rowData.title}
              </Text>
              <Text max>{rowData?.subtitle}</Text>
              <Text numberOfLines={2} style={dailyPracticeStyles.description}>
                {rowData?.description}
              </Text>
              <TouchableOpacity style={dailyPracticeStyles.button}>
                <Text style={dailyPracticeStyles.buttonText}>View Now</Text>
              </TouchableOpacity>
            </Card>
          );
        }}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

const mindfulCheckinStyles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fdedbf",
    marginLeft: 12,
    marginRight: 12,
    marginTop: 40,
    border: "1px solid #fdedbf",
    borderRadius: "8px",
    padding: "16px",
  },
  title: {
    color: "#2a8dbd",
    fontSize: 30,
  },
  buttonContainer: {
    marginTop: 30,
    width: 150,
    height: 50,
    marginLeft: "auto",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 40,
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 8,
    marginLeft: "auto",
    marginRight: 0,
    marginBottom: 0,
    backgroundColor: "#FFD8E3",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
const MindfulCheckinEmojiContainer = () => {
  const onEmojiPress = (emojiId) => {
    // handle emoji selection here
    console.log("Selected emoji: ", emojiId);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={mindfulCheckinEmojiStyles.button}
      onPress={() => onEmojiPress(item.id)}
    >
      <MaterialCommunityIcons size={80} name={item.name} color={item.color} />
    </TouchableOpacity>
  );

  return (
    <View style={mindfulCheckinStyles.container}>
      <View style={mindfulCheckinStyles.headerContainer}>
        <Text style={mindfulCheckinStyles.title}>Mindful Checkin</Text>
        <MaterialCommunityIcons size={40} name="reminder" color={"#B4A8E0"} />
      </View>
      <FlatList
        data={emojiData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
      />
    </View>
  );
};

const mindfulCheckinEmojiStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    width: 80,
    height: 80,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

const emojiData = [
  { id: "angry", name: "emoticon-angry", color: "#B71C1C" },
  { id: "sad", name: "emoticon-sad", color: "#1E88E5" },
  { id: "neutral", name: "emoticon-neutral", color: "#6D4C41" },
  { id: "confused", name: "emoticon-confused", color: "#F57F17" },
  { id: "relaxed", name: "emoticon-cool", color: "#00BCD4" },
  { id: "pleased", name: "emoticon-happy", color: "#8BC34A" },
  { id: "happy", name: "emoticon-excited", color: "#FDD835" },
  { id: "elated", name: "emoticon-happy", color: "#CDDC39" },
];

const QUERY_COLLECTION = gql`
  {
    courseCollection {
      items {
        title
      }
    }
  }
`;

const QUERY_MANTRAS = gql`
  {
    dailyMantrasCollection {
      items {
        sutraSanskrit
        sutraNumber
        sutraTranslation
      }
    }
  }
`;

const Weather = () => {
  const { data, loading } = useQuery(QUERY_COLLECTION);

  console.log(data);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MINDFLOWER</Text>
      <View style={styles.headerContainer}>
        <View style={styles.headerIconContainer}>
          <MaterialCommunityIcons
            size={80}
            name="weather-sunny"
            color={"#fff"}
          />
        </View>
        <View style={styles.gridContainer}>
          <PracticeContainer />
        </View>
      </View>
      <DailyPracticeContainer />
      <MindfulCheckinEmojiContainer />
    </View>
  );
};

export default function HomeScreen() {
  return (
    <View style={styles.mainContainer}>
      <Weather />
    </View>
  );
}
