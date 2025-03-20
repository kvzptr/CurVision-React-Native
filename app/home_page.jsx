import React, { useEffect, useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native'; 
import { useNavigation } from '@react-navigation/native'; 
import { Ionicons } from '@expo/vector-icons';
import BackgroundSVG from '../components/BackgroundSVG';

const Homepage = () => {
  const navigation = useNavigation();
  const horizontalScrollView = useRef(null);

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.relativeContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/images/logo.png')}
        />
        <Text style={styles.welcomeText}>Welcome</Text>

        <Ionicons name="notifications-outline" size={30} color="white" marginTop={35}  />
      </View>

      <View style={styles.textAndAnimationContainer}>
          <Text style={styles.exploreText}>Explore more with</Text>
          <Text style={styles.curVisionText}>CurVision</Text>
          <LottieView
            source={require('../assets/car_animation.json')}
            autoPlay
            loop
            style={styles.lottieAnimation}
          />
        </View>

      <BackgroundSVG style={styles.backgroundSVG} />

      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => navigateTo('HistoryPage')}>
          <Image
            style={styles.image}
            source={require('../assets/images/ha.png')} 
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('EmergencyPage')}>
          <Image
            style={styles.image}
            source={require('../assets/images/ec.png')} 
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('VehiclesPage')}>
          <Image
            style={styles.image}
            source={require('../assets/images/va.png')} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.newsSection}>
        <Text style={styles.newsText}>News</Text>
        <Text style={styles.seeAllText}>See All</Text>
        <ScrollView
          ref={horizontalScrollView}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <Image
            style={styles.newsImage}
            source={require('../assets/images/n1.png')} 
          />
          <Image
            style={styles.newsImage}
            source={require('../assets/images/n2.png')} 
          />
          <Image
            style={styles.newsImage}
            source={require('../assets/images/n3.png')} 
          />
          <Image
            style={styles.newsImage}
            source={require('../assets/images/n4.png')} 
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'transparent',
    position: 'relative',
  },
  backgroundSVG: {
    position: 'absolute', // Position the SVG absolutely
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  relativeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 0,
    height: 100,
    backgroundColor: '#800000',
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: 35,
  },
  welcomeText: {
    marginTop: 35,
    fontSize: 24,
    color: 'white',
    marginRight: 20,
  },
  textAndAnimationContainer: {
    paddingTop: 20,
    backgroundColor: '#800000',
    marginTop: 0,
    marginBottom: 0,
    alignItems: 'center',
  },
  exploreText: {
    fontSize: 28,
    color: 'white',
  },
  curVisionText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'gold',
  },
  lottieAnimation: {
    width: 300,
    height: 300,
    marginTop: -40,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    background: 'transparent', 
    height: 200,
    alignItems: 'center',
    marginTop: -350,
  },
  image: {
    width: 120,
    height: 140,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  newsSection: {
    marginTop: 15,
    padding: 0,
    background: 'transparent',
  },
  newsText: {
    marginLeft: 20,
    fontSize: 25,
    fontWeight: 'bold',
    top: -10,
  },
  seeAllText: {
    fontSize: 12,
    color: 'black',
    position: 'absolute',
    right: 20,
    top: 3,
  },
  scrollViewContainer: {
    flexDirection: 'row',
    background: 'transparent',
  },
  newsImage: {
    width: 140,
    height: 180,
    marginRight: 15,
  },
});

export default Homepage;
