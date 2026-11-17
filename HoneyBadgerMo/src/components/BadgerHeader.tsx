import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

interface BadgerHeaderProps {
  mainPlayerName: String;
  score: number;
  numBees: number;
}

function BadgerHeader({ mainPlayerName, score, numBees }: BadgerHeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.playerScoreContainer}>
        <View style={styles.playerScoreLeft}>
          <View>
            <Text style={styles.textL}>Player: {mainPlayerName}</Text>
            <Svg width="128" height="45" viewBox="0 0 128 45" fill="#FAA31B">
              <Path d="M0 0H128.768L102.768 45H0V0Z" />
            </Svg>
          </View>
          <View>
            <Text style={styles.textL}>Score: {score}</Text>
            <Svg width="128" height="45" viewBox="0 0 128 45" fill="#FAA31B">
              <Path d="M0 45H128.768L102.768 0H0V45Z" />
            </Svg>
          </View>
        </View>
        <Pressable
          style={styles.headerButton}
          onPress={() => console.log("Header pressed")}
        >
          <Image
            source={require("../../assets/images/honey_badger_logo.png")}
            style={styles.headerImage}
          />
        </Pressable>
        <View style={styles.playerScoreRight}>
          <View>
            <Text style={styles.textR}>Player:</Text>
            <Svg width="128" height="45" viewBox="0 0 128 45" fill="#FAA31B">
              <Path d="M128.768 0H0L26 45H128.768V0Z" />
            </Svg>
          </View>
          <View>
            <Text style={styles.textR}>Score:</Text>
            <Svg width="128" height="45" viewBox="0 0 128 45" fill="#FAA31B">
              <Path d="M128.768 45H0L26 0H128.768V45Z" />
            </Svg>
          </View>
        </View>
      </View>
      <View style={styles.beesTimeContainer}>
        <View style={styles.bees}>
          <Text style={styles.textL}>Bees: {numBees}</Text>
          <Svg width="188" height="31" viewBox="0 0 188 31" fill="#FAA31B">
            <Path d="M169.155 31H0V0H188.066L169.155 31Z" />
          </Svg>
        </View>
        <View style={styles.time}>
          <Text style={styles.textR}>Time:</Text>
          <Svg width="150" height="31" viewBox="0 0 150 31" fill="#FAA31B">
            <Path d="M150.499 31H0L17.9111 0H150.499V31Z" />
          </Svg>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    width: "90%",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    marginTop: 30,
  },
  beesTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 324,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 4,
  },
  playerScoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 324,
    marginLeft: "auto",
    marginRight: "auto",
  },
  headerButton: {
    alignSelf: "center",
    zIndex: 1,
  },
  headerImage: {
    width: 113,
    height: 97,
    resizeMode: "contain",
    marginLeft: "auto",
    marginRight: "auto",
  },
  playerScoreLeft: {
    height: 97,
    flexDirection: "column",
    justifyContent: "space-between",
    marginRight: -21,
  },
  playerScoreRight: {
    height: 97,
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: -21,
  },
  bees: {
    width: 188,
    height: 31,
    marginRight: -5,
  },
  time: {
    width: 150,
    height: 31,
    marginLeft: -5,
  },
  textL: {
    position: "absolute",
    color: "#ffffff",
    fontWeight: "bold",
    zIndex: 1,
    paddingTop: 6,
    paddingLeft: 8,
  },
  textR: {
    position: "absolute",
    color: "#ffffff",
    fontWeight: "bold",
    zIndex: 1,
    paddingTop: 6,
    paddingLeft: 23,
  },
});

export default BadgerHeader;
