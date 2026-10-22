import * as Device from "expo-device";
import { Platform, StyleSheet } from "react-native";

import PlayerImage from "@/components/PlayerImage";
import { ThemedText } from "@/components/themed-text";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
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

  useEffect(() => {
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
      <Text style={styles.title}>
        Welcome to Honey Badger {mainPlayer.name}!
      </Text>
      <PlayerImage
        selectedImageUri={mainPlayer.imageUri}
        size="small"
        defaultImage={require("../../assets/images/image_default.png")}
      />
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
    flexDirection: "row",
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
});
