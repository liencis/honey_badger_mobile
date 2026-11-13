import * as Device from "expo-device";
import { Platform, ScrollView, StyleSheet } from "react-native";

import CellsGrid from "@/components/CellsGrid";
import PlayerImage from "@/components/PlayerImage";
import { ThemedText } from "@/components/themed-text";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import type { CellInfo } from "../setup/grid";
import { gameSetup, Level } from "../setup/grid";
import Intro from "./Intro";

function getDevMenuHint() {
  if (Platform.OS === "web") {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === "android" ? "cmd+m (or ctrl+m)" : "cmd+d";
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  const [mainPlayer, setMainPlayer] = useState({
    name: "",
    imageUri: null,
    score: 0,
    victories: 0,
    gamesPlayed: 0,
  });
  const [gameLevel, setGameLevel] = useState<
    (typeof Level)[keyof typeof Level]
  >(Level.easy);
  const [gameDimensions, setGameDimensions] = useState({ row: 15, col: 15 });
  const [game, beePlacement] = gameSetup(
    gameDimensions.row,
    gameDimensions.col,
    gameLevel,
  );
  const [cells, setCells] = useState<Map<number, CellInfo>>(game);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const router = useRouter();
  const [numBees, setNumBees] = useState(beePlacement.length);
  const [showWarning, setShowWarning] = useState(false);

  async function clearMobile() {
    await AsyncStorage.clear();
  }

  useEffect(() => {
    // clearMobile(); //This is for testing only, for clearing asyncStorage
    (async () => {
      try {
        const storedPlayer = await AsyncStorage.getItem("mainPlayer");
        if (storedPlayer) {
          setMainPlayer(JSON.parse(storedPlayer));
        }
      } catch (error) {
        console.error("Error fetching main player data:", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem("mainPlayer", JSON.stringify(mainPlayer));
      } catch (error) {
        console.error("Error saving main player data:", error);
      }
    })();
  }, [mainPlayer]);

  if (!mainPlayer.name) {
    return <Intro setMainPlayer={setMainPlayer} mainPlayer={mainPlayer} />;
  }

  return (
    <View style={styles.container}>
      {!mainPlayer.name ? (
        <Intro setMainPlayer={setMainPlayer} mainPlayer={mainPlayer} />
      ) : null}
      <Stack.Screen
        options={{
          title: "Honey Badger",
          headerBackButtonDisplayMode: "minimal",
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerLeft: () => (
            <FontAwesomeFreeSolid
              name="align-justify"
              size={21}
              color="#FAA31B"
            />
          ), //here will be drawer configured
          headerRight: () => (
            <Pressable onPress={() => router.push("/profile-settings")}>
              <PlayerImage
                selectedImageUri={mainPlayer.imageUri}
                size="small"
                defaultImage={require("../../assets/images/image_default.png")}
              />
            </Pressable>
          ),
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.scrollContainer}
        >
          <Text style={styles.title}>
            Welcome to Honey Badger {mainPlayer.name}!
          </Text>
          <CellsGrid
            cells={cells}
            row={gameDimensions.row}
            col={gameDimensions.col}
            setCell={setCells}
            setGameOver={setGameOver}
            setGameWon={setGameWon}
            setNumBees={setNumBees}
            setShowWarning={setShowWarning}
          />
        </ScrollView>
      </ScrollView>
    </View>
  );
  // return (
  //   <ThemedView style={styles.container}>
  //     <SafeAreaView style={styles.safeArea}>
  //       <ThemedView style={styles.heroSection}>
  //         <AnimatedIcon />
  //         <ThemedText type="title" style={styles.title}>
  //           Welcome Boo to&nbsp;Expo
  //         </ThemedText>
  //       </ThemedView>

  //       <ThemedText type="code" style={styles.code}>
  //         get started
  //       </ThemedText>

  //       <ThemedView type="backgroundElement" style={styles.stepContainer}>
  //         <HintRow
  //           title="Try editing"
  //           hint={<ThemedText type="code">src/app/index.tsx</ThemedText>}
  //         />
  //         <HintRow title="Dev tools" hint={getDevMenuHint()} />
  //         <HintRow
  //           title="Fresh start"
  //           hint={<ThemedText type="code">npm run reset-project</ThemedText>}
  //         />
  //       </ThemedView>

  //       {Platform.OS === "web" && <WebBadge />}
  //     </SafeAreaView>
  //   </ThemedView>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: "center",
  },
  code: {
    textTransform: "uppercase",
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
});
