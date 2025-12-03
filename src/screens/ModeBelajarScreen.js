import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Text from "../components/CustomText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { supabase } from "../lib/supabase"; // sesuaikan path

export default function ModeBelajarScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMateri();
  }, []);

  const fetchMateri = async () => {
    try {
      const { data, error } = await supabase
        .from("materi_belajar")
        .select("*")
        .order("urutan", { ascending: true });

      if (error) throw error;

      setItems(data || []);
    } catch (error) {
      console.error("Error fetching materi:", error);
      alert("Gagal memuat data materi");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#88A2FF" />
        <Text style={{ marginTop: 10 }}>Memuat materi...</Text>
      </View>
    );
  }

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
          { paddingBottom: insets.bottom + 120 }
        ]}
      >
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.card, { backgroundColor: item.color }]}
            onPress={() => navigation.navigate("Detail", { id: item.id })}
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: item.image_url }}
              style={styles.image}
              resizeMode="contain"
            />

            <Text style={[styles.label, { color: item.text_color }]}>
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