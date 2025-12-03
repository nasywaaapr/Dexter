import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { detailData } from "../lib/detailData";

export default function Detail({ route, navigation }) {
  const { id } = route.params;
  const data = detailData[id];

  // Mapping image secara static
  const imageMap = {
    computer: require("../../assets/images/computer.png"),
    mouse: require("../../assets/images/mouse.png"),
    CPU: require("../../assets/images/cpu.png"),
    Headset: require("../../assets/images/headset.png"),
    SSD: require("../../assets/images/ssd.png"),
    Keyboard: require("../../assets/images/keyboard.png"),
    Proyektor: require("../../assets/images/proyektor.png"),
    Printer: require("../../assets/images/printer.png"),
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={{ fontSize: 22, color: "#fff" }}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Mode Belajar</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.box}>
          <Text style={styles.detailTitle}>Informasi Detail</Text>

          <Image source={imageMap[id]} style={styles.detailImg} resizeMode="contain" />
          <Text style={{ textAlign: "center", marginBottom: 20 }}>{id}</Text>

          {/* PENGERTIAN */}
          <View style={[styles.section, { backgroundColor: "#DDEBFF" }]}>
            <Text style={styles.sectionTitle}>Pengertian</Text>
            <Text style={styles.sectionText}>{data.pengertian}</Text>
          </View>

          {/* FUNGSI */}
          <View style={[styles.section, { backgroundColor: "#C9B8FF" }]}>
            <Text style={styles.sectionTitle}>Fungsi</Text>
            <Text style={styles.sectionText}>{data.fungsi}</Text>
          </View>

          {/* CONTOH */}
          <View style={[styles.section, { backgroundColor: "#92A8FF" }]}>
            <Text style={styles.sectionTitle}>Contoh Penggunaan</Text>
            <Text style={styles.sectionText}>{data.contoh}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#88A2FF",
    height: 100,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    alignItems: "center",
  },
  backBtn: {
    position: "absolute",
    left: 15,
    top: Constants.statusBarHeight + 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 25,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  box: {
    margin: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    elevation: 3,
  },
  detailTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailImg: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 10,
  },
  section: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  sectionText: {
    lineHeight: 20,
  },
});