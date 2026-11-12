import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

function ProfileSettings() {
  return (
    <View style={style.container}>
      <Stack.Screen
        options={{
          title: "Profile Settings",
          headerBackButtonDisplayMode: "minimal",
          headerStyle: {
            backgroundColor: "#ffffff",
          },
        }}
      />
      <Text style={style.pText}>Profile settings</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  pText: {
    textAlign: "center",
  },
});

export default ProfileSettings;
