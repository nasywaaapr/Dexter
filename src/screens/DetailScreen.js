import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import Text from "../components/CustomText";
import { supabase } from "../lib/supabase";
import { saveToHistory } from "../utils/historyHelper";

export default function Detail({ route, navigation }) {
  const { id } = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      const { data: result, error } = await supabase
        .from("materi_belajar")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      setData(result);
      if (result) {
        await saveToHistory(result);
      }
    } catch (error) {
      console.error("Error fetching detail:", error);
      alert("Gagal memuat detail materi");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#88A2FF" />
        <Text style={{ marginTop: 10 }}>Memuat detail...</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text>Data tidak ditemukan</Text>
      </View>
    );
  }

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

          <Image
  source={{ uri: data.image_url }}
  style={styles.detailImg}
  resizeMode="contain"
/>

          <Text style={{ textAlign: "center", marginBottom: 20 }}>{data.label}</Text>

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