import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
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
  View,
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
  const [inputStyle, setInputStyle] = useState(styles.input);
  const [buttonStyle, setButtonStyle] = useState(styles.button);

  const handleMouseEnter = () => {
    setButtonStyle(styles.buttonHover);
  };

  const handleMouseLeave = () => {
    setButtonStyle(styles.button);
  };

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
      <ScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <Image
          source={require("../../assets/images/honey_badger_logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome to the Game!</Text>
        <View style={styles.inputCardContainer}>
          <Text style={styles.labelText}>Enter your profile nickname</Text>
          <TextInput
            style={inputStyle}
            placeholder="Your Nickname"
            value={name}
            onChangeText={setName}
            onFocus={() => {
              setInputStyle(styles.inputFocused);
            }}
            onBlur={() => {
              setInputStyle(styles.input);
            }}
          />
        </View>

        <Pressable style={styles.profileContainer} onPress={pickImage}>
          <View style={styles.cardContainer}>
            <Text style={styles.pText}> Your picture:</Text>
            <PlayerImage
              selectedImageUri={playerImage}
              size="large"
              defaultImage={require("../../assets/images/image_default.png")}
            />
            <FontAwesomeFreeSolid
              name="wand-magic-sparkles"
              size={21}
              color="#ffffff"
            />
          </View>
        </Pressable>

        <Pressable
          style={buttonStyle}
          onPress={() => {
            if (!name) {
              alert("Your profile nickname must be provided.");
            } else {
              setMainPlayer({
                ...mainPlayer,
                name: name,
                imageUri: playerImage,
              });
              router.push("/");
            }
          }}
          onHoverIn={() => handleMouseEnter()}
          onHoverOut={() => handleMouseLeave()}
          onPressIn={() => handleMouseEnter()}
        >
          <Text style={styles.buttonText}>Start Game</Text>
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
    backgroundColor: "#f8bf6d",
    backgroundImage: "linear-gradient(to top, #faa31b, #ffffff)",
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
    resizeMode: "contain",
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  labelText: {
    width: "100%",
    fontSize: 12,
    margin: 5,
    alignSelf: "flex-start",
    color: "#fb9c03",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#fb9c03",
    borderWidth: 3,
    borderRadius: 8,
    paddingHorizontal: 10,
    alignSelf: "center",
    backgroundColor: "#f9d093",
    color: "#ffffff",
  },
  inputFocused: {
    width: "100%",
    height: 40,
    borderColor: "#faa31b",
    borderWidth: 3,
    borderRadius: 8,
    paddingHorizontal: 10,
    alignSelf: "center",
    backgroundColor: "#ffffff",
    color: "#aeadad",
    outlineColor: "#faa31b",
  },
  cardContainer: {
    flexDirection: "row",
    width: "100%",
    padding: 20,
    borderRadius: 8,
    backgroundColor: "#fdb43e",
    backgroundImage: "linear-gradient(to top, #faad32, #fbc978)",
    marginBottom: 20,
    alignSelf: "center",
  },
  inputCardContainer: {
    flexDirection: "column",
    width: "100%",
    padding: 20,
    // borderRadius: 8,
    // backgroundColor: "#fdb43e",
    // backgroundImage: "linear-gradient(to top, #fbb94d, #fbd592)",
    // marginBottom: 20,
    // alignSelf: "center",
  },
  pText: {
    width: "40%",
    fontSize: 16,
    margin: 10,
    alignSelf: "center",
    color: "#ffffff",
    fontWeight: "bold",
  },
  profileContainer: {
    alignSelf: "center",
  },
  buttonHover: {
    width: "90%",
    backgroundColor: "#ffd188",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
  },
  button: {
    width: "90%",
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
  },
  buttonText: {
    color: "#faa31b",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Intro;
