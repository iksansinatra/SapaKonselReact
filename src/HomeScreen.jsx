import React, { useEffect, useRef, useState }  from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const { width } = Dimensions.get('window');
const DATA = [1, 2, 3, 4, 5];

const SIDE_PADDING = 22.5;
const CARD_SPACING = 10;
const CARD_WIDTH = width - SIDE_PADDING * 2;
const SNAP_INTERVAL = CARD_WIDTH + CARD_SPACING;

export default function HomeScreen() {
  const scrollRef = useRef(null);
  const autoScrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    startAutoScroll();
    return stopAutoScroll;
  }, []);

  const startAutoScroll = () => {
    stopAutoScroll();
    autoScrollRef.current = setInterval(() => {
      setActiveIndex(prev => {
        const next = (prev + 1) % DATA.length;
        scrollRef.current?.scrollTo({
          x: next * SNAP_INTERVAL,
          animated: true,
        });
        return next;
      });
    }, 5000);
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/images/bg.png')} resizeMode="cover" style={styles.bgImage}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profilHeader}>
            <View style={styles.backPicture}>
              <ImageBackground source={require('./assets/images/pict.png')} style={styles.profilImage} />
            </View>
            <View>
              <Text style={styles.profilText}>
                Hello!
              </Text>
              <Text style={styles.profilName}>
                Iksan Sinatra
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notif}>
            <FontAwesomeIcon icon={["fab", "whatsapp"]} color='#5F33E1' size={27.5} />
          </TouchableOpacity>
        </View>
        <View style={styles.carouselWrapper}>
          <Animated.ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={SNAP_INTERVAL}
            decelerationRate={0.98}
            contentContainerStyle={{ paddingHorizontal: SIDE_PADDING }}
            style={{ height: 175 }}
            onScrollBeginDrag={stopAutoScroll}
            onMomentumScrollEnd={e => {
              const index = Math.round(
                e.nativeEvent.contentOffset.x / SNAP_INTERVAL
              );
              setActiveIndex(index);
              startAutoScroll();
            }}

            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
          >

            {DATA.map((item, index) => {
              const inputRange = [
                (index - 1) * SNAP_INTERVAL,
                index * SNAP_INTERVAL,
                (index + 1) * SNAP_INTERVAL,
              ];

              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.96, 1, 0.96],
                extrapolate: 'clamp',
              });

              return (
                <TouchableOpacity key={item} activeOpacity={0.9}>
                  <Animated.View
                    style={[
                      styles.card,
                      {
                        transform: [{ scale }],
                        marginRight: CARD_SPACING,
                      },
                    ]}
                  >
                    <ImageBackground
                      source={require('./assets/images/info.png')}
                      style={styles.cardImageBg}
                      imageStyle={styles.cardImage}
                    />
                  </Animated.View>
                </TouchableOpacity>
              );
            })}
          </Animated.ScrollView>
          <View style={styles.dotsContainer}>
            {DATA.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  activeIndex === index && styles.activeDot,
                ]}
              />
            ))}
          </View>
        </View>
        <View style={styles.serviceContainer}>
          <Text style={styles.profilName}>
            Layanan
          </Text>
          <View style={styles.serviceMenu}>
            <View style={[styles.serviceItem, {width: '30%'}]}>
              <View style={styles.imgContainer}>
                <ImageBackground source={require('./assets/images/kids.png')} style={styles.serviceImage} />
              </View>
              <Text style={styles.serviceText}>
                Anak
              </Text>
            </View>
            <View style={[styles.serviceItem, {width: '30%'}]}>
              {/* <Image source={require('./assets/images/stop.png')} style={styles.serviceImage} /> */}
              <Text style={styles.serviceText}>
                Laporan
              </Text>
            </View>
            <View style={[styles.serviceItem, {width: '30%'}]}>
              {/* <Image source={require('./assets/images/women.png')} style={styles.serviceImage} /> */}
              <Text style={styles.serviceText}>
                Perempuan
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    paddingHorizontal: 22.5,
  },
  scrollContent: {
    alignItems: 'center',
  },
  header: {
    paddingTop: 25,
    paddingBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  profilHeader: {
    flexDirection: "row",
    alignItems: 'center',
  },
  backPicture: {
    borderRadius: 50/2,
    width: 50,
    height: 50,
    marginRight: 15,
    overflow: 'hidden'
  },
  profilImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  profilText: {
    fontSize: 15,
    color: "#24252C"
  },
  profilName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#24252C"
  },
  notif: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#EEE9FF",
    width: 45,
    height: 45,
    borderRadius: 45/2,
    padding: 10,
  },
  carouselWrapper: {
    marginHorizontal: -SIDE_PADDING,
    height: 195,
  },
  card: {
    width: CARD_WIDTH,
    height: 175,
    borderRadius: 25,
    overflow: 'hidden',
  },
  cardImageBg: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 15,
  },
  cardImage: {
    borderRadius: 25,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 7.5,
    height: 7.5,
    borderRadius: 3.75,
    backgroundColor: '#EEE9FF',
    marginHorizontal: 3.75,
  },
  activeDot: {
    width: 15,
    backgroundColor: '#5F33E1',
  },
  serviceContainer: {
    marginTop: 20,
    width: '100%',
  },
  serviceMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  serviceItem: {
    backgroundColor: '#5F33E1',
    width: '30%',
    alignItems: 'center',
    borderRadius: 25,
    padding: 10,
  },
  imgContainer: {
    backgroundColor: '#6e6e6eff',
    width: "auto",
    height: "auto",
  },
  serviceImage: {
    width: '100%',
    height: '50',
  },
  serviceText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff"
  }
});
