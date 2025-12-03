import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Constants from "expo-constants";

export default function ModeBelajarScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const items = [
    { label: "computer", color: "#88A2FF", img: require("../../assets/images/computer.png"), textColor: "#fff" },
    { label: "mouse", color: "#2B438D", img: require("../../assets/images/mouse.png"), textColor: "#fff" },
    { label: "CPU", color: "#2B438D", img: require("../../assets/images/cpu.png"), textColor: "#fff" },
    { label: "Headset", color: "#FFBCF9", img: require("../../assets/images/headset.png"), textColor: "#fff" },
    { label: "SSD", color: "#88A2FF", img: require("../../assets/images/ssd.png"), textColor: "#fff" },
    { label: "Keyboard", color: "#2B438D", img: require("../../assets/images/keyboard.png"), textColor: "#fff" },
    { label: "Proyektor", color: "#2B438D", img: require("../../assets/images/proyektor.png"), textColor: "#fff" },
    { label: "Printer", color: "#FFBCF9", img: require("../../assets/images/printer.png"), textColor: "#fff" }
  ];

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={[styles.header, { paddingTop: Constants.statusBarHeight + 10 }]}>
        <Text style={styles.title}>Mode Belajar</Text>
      </View>

      {/* GRID + SCROLL */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.grid,
          { paddingBottom: insets.bottom + 120 } // 🔥 agar tidak ketutup navbar
        ]}
      >
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: item.color }]}
            onPress={() => navigation.navigate("Detail", { id: item.label })}
            activeOpacity={0.8}
          >
            <Image source={item.img} style={styles.image} resizeMode="contain" />
            <Text style={[styles.label, { color: item.textColor }]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    backgroundColor: "#88A2FF",
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },

  grid: {
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "47%",
    height: 150,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },

  image: { width: 70, height: 70, marginBottom: 12 },

  label: { fontSize: 16, fontWeight: "700", textTransform: "capitalize" },
});
