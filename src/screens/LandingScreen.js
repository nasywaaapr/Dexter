// src/screens/LandingScreen.js
import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  Dimensions, 
  ScrollView, 
  StyleSheet 
} from 'react-native';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    image: require('../../assets/images/ssd.png'),
    title: 'Hardware Detector',
  },
  {
    id: 2,
    image: require('../../assets/images/mouse.png'),
    title: 'Hardware Detector',
  },
  {
    id: 3,
    image: require('../../assets/images/cpu.png'),
    title: 'Hardware Detector',
  }
];

export default function LandingScreen({ onStart }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      setCurrentIndex(nextIndex); 
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]); 

  const scrollToIndex = (index) => {
    setCurrentIndex(index); 
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true
    });
  };

  return (
    <View style={styles.container}>
      
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {slides.map((slide) => (
          <View key={slide.id} style={styles.slide}>
            <View style={styles.imageContainer}>
              <Image 
                source={slide.image} 
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.title}>{slide.title}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => scrollToIndex(index)}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot
            ]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={onStart}>
        <Text style={styles.buttonText}>Masuk</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B438D',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 40,
  },

  scrollView: {
    flex: 1,
    width: width,
  },
  slide: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  imageContainer: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4A5568',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: '#2B438D',
    fontSize: 16,
    fontWeight: '600',
  },
});