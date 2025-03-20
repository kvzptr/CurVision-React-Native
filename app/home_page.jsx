import React, { useEffect, useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native'; 
import { useNavigation } from '@react-navigation/native'; 

const Homepage = () => {
  const navigation = useNavigation();
  const horizontalScrollView = useRef(null);
  const scrollSpeed = 2;

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (horizontalScrollView.current) {
        horizontalScrollView.current.scrollTo({
          x: horizontalScrollView.current.contentOffset.x + scrollSpeed,
          animated: true,
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.relativeContainer}>
        <Image
          style={styles.logo}
          source={require('./assets/images/logo.png')}
        />
        <Text style={styles.welcomeText}>Welcome</Text>

        <ion-icon name="notifications-outline"></ion-icon>
        
        <View style={styles.textAndAnimationContainer}>
          <Text style={styles.exploreText}>Explore more with Curvision</Text>
          <LottieView
            source={require('./assets/car_animation.json')}
            autoPlay
            loop
            style={styles.lottieAnimation}
          />
        </View>
      </View>

      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => navigateTo('HistoryPage')}>
          <Image
            style={styles.image}
            source={require('./assets/images/ha.png')} 
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('EmergencyPage')}>
          <Image
            style={styles.image}
            source={require('./assets/images/ec.png')} 
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('VehiclesPage')}>
          <Image
            style={styles.image}
            source={require('./assets/images/va.png')} 
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
            source={require('./assets/images/n1.png')} 
          />
          <Image
            style={styles.newsImage}
            source={require('./assets/images/n2.png')} 
          />
          <Image
            style={styles.newsImage}
            source={require('./assets/images/n3.png')} 
          />
          <Image
            style={styles.newsImage}
            source={require('./assets/images/n4.png')} 
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  relativeContainer: {
    height: 266,
    backgroundColor: '#ececec', // Replace with actual background color
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: 20,
  },
  welcomeText: {
    marginTop: 35,
    fontSize: 24,
    color: 'white',
  },
  textAndAnimationContainer: {
    marginTop: 80,
    alignItems: 'center',
  },
  exploreText: {
    fontSize: 28,
    color: 'white',
  },
  lottieAnimation: {
    width: 300,
    height: 300,
    marginTop: -70,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#ececec', // Replace with actual background color
    height: 200,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 140,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  newsSection: {
    padding: 20,
    backgroundColor: '#ececec', // Replace with actual background color
  },
  newsText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 12,
    color: 'black',
    position: 'absolute',
    right: 20,
    top: 20,
  },
  scrollViewContainer: {
    flexDirection: 'row',
  },
  newsImage: {
    width: 140,
    height: 180,
    marginRight: 15,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#ececec', // Replace with actual background color
    paddingVertical: 10,
  },
  navIcon: {
    width: 25,
    height: 25,
    marginHorizontal: 30,
  },
});

export default Homepage;
