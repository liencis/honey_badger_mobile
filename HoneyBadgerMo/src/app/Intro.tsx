import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import PlayerImage from "../components/PlayerImage";

interface IntroProps {
  setMainPlayer: (player: any) => void;
  mainPlayer: {
    name: string;
    imageUri: string | null;
    score: number;
    victories: number;
    gamesPlayed: number;
  };
}

function Intro({ setMainPlayer, mainPlayer }: IntroProps) {
  const [name, setName] = useState("");
  const [playerImage, setPlayerImage] = useState<string | null>(null);
  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // Handle the selected image if needed
      console.log(result);
      setPlayerImage(result.assets[0].uri);
    } else {
      alert("Image selection was canceled.");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView keyboardDismissMode="on-drag">
        <Image
          source={require("../../assets/images/honey_badger_logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome to the App!</Text>
        <TextInput
          style={styles.input}
          placeholder="Player Name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.buttonText}>Pick your profile image</Text>

        <Pressable onPress={pickImage}>
          <PlayerImage
            selectedImageUri={playerImage}
            size="large"
            defaultImage={require("../../assets/images/image_default.png")}
          />
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => {
            setMainPlayer({ ...mainPlayer, name: name, imageUri: playerImage });
            router.push("/");
          }}
        >
          <Text style={styles.buttonText}>Save and Continue</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#ecb13b",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Intro;
