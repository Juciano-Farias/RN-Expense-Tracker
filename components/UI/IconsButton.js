import { Pressable, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const IconsButton = ({ icon, size, color, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && stlyes.pressed}
    >
      <View style={stlyes.buttonContainer}>
        <Ionicons size={size} color={color} name={icon} />
      </View>
    </Pressable>
  );
};

export default IconsButton;

const stlyes = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 12,
  },
  pressed: {
    opacity: 0.75,
  },
});
