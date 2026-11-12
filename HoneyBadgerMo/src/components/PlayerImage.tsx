import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

interface PlayerImageProps {
  selectedImageUri: string | null;
  size: "small" | "large";
  defaultImage: ImageSourcePropType;
}

export default function PlayerImage({
  selectedImageUri,
  size,
  defaultImage,
}: PlayerImageProps) {
  const imageSource = selectedImageUri
    ? { uri: selectedImageUri }
    : defaultImage;

  return (
    <View
      style={
        size === "large" ? styles.imageContainer : styles.imageContainerSmall
      }
    >
      <Image source={imageSource} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#faa31b",
  },
  imageContainerSmall: {
    width: 39,
    height: 39,
    borderRadius: 100,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#faa31b",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderText: {
    color: "#888",
    fontSize: 16,
  },
});
