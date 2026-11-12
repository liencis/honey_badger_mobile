import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  Stack,
  ThemeProvider,
  useRouter,
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

// import AppTabs from "@/components/app-tabs";

SplashScreen.preventAutoHideAsync();

export default function StackLayout() {
  const colorScheme = useColorScheme();
  const [mainPlayer, setMainPlayer] = useState({
    name: "",
    imageUri: null,
    score: 0,
    victories: 0,
    gamesPlayed: 0,
  });
  const router = useRouter();

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

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack />
    </ThemeProvider>
  );
}

// export default function TabLayout() {
//   const colorScheme = useColorScheme();
//   return (
//     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//       <AnimatedSplashOverlay />
//       <AppTabs />
//     </ThemeProvider>
//   );
// }
