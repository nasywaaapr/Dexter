// src/screens/SplashScreen.js
import React, { useEffect, useRef } from "react";
import { View, Image, StyleSheet, Animated, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function SplashScreen({ onFinish }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1.8)).current;
  const moveY = useRef(new Animated.Value(40)).current;

  const textOpacity = useRef(new Animated.Value(0)).current;
  const textMoveX = useRef(new Animated.Value(30)).current;
  const bubbleOpacity = useRef(new Animated.Value(0)).current;
  const finalScreenOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // 1. Logo zoom in dari besar ke normal
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(moveY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),

      Animated.delay(400),

      // 2. Logo zoom out ke kecil (pindah ke kiri)
      Animated.timing(scale, {
        toValue: 0.55,
        duration: 500,
        useNativeDriver: true,
      }),

      Animated.delay(300),

      // 3. Bubbles dan text muncul
      Animated.parallel([
        Animated.timing(bubbleOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(textMoveX, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),

      Animated.delay(900),

      // 4. Fade out logo, text, bubbles
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(bubbleOpacity, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(finalScreenOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),

      Animated.delay(800),

      // 5. Fade out layar biru dongker
      Animated.timing(finalScreenOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Panggil callback onFinish setelah animasi selesai
      if (onFinish) {
        onFinish();
      }
    });
  }, []);

  return (
    <View style={styles.splashContainer}>
      {/* Background bubbles */}
      <Animated.Image
        source={require("../../assets/images/splash.png")}
        style={[styles.bubbles, { opacity: bubbleOpacity }]}
        resizeMode="cover"
      />

      {/* Logo Dexter */}
      <Animated.Image
        source={require("../../assets/images/logo.png")}
        style={[
          styles.logo,
          {
            opacity: opacity,
            transform: [
              { scale: scale },
              { translateY: moveY },
              { 
                translateX: scale.interpolate({
                  inputRange: [0.55, 1.8],
                  outputRange: [-120, 0],
                })
              },
            ],
          },
        ]}
        resizeMode="contain"
      />

      {/* Text Dexter */}
      <Animated.Image
        source={require("../../assets/images/name.png")}
        style={[
          styles.text,
          {
            opacity: textOpacity,
            transform: [{ translateX: textMoveX }],
          },
        ]}
        resizeMode="contain"
      />

      {/* Layar biru dongker akhir */}
      <Animated.View
        style={[
          styles.finalScreen,
          { opacity: finalScreenOpacity }
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: "#88A2FF",
    justifyContent: "center",
    alignItems: "center",
  },
  bubbles: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 250,
    height: 250,
    position: "absolute",
  },
  text: {
    width: 200,
    height: 70,
    position: "absolute",
    left: width / 2 + -30,
  },
  finalScreen: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#2B438D",
    zIndex: 10,
  },
});