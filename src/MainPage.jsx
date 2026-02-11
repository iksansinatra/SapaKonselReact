import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  BackHandler,
  Animated,
  ToastAndroid,
  Dimensions
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import HomeScreen from './HomeScreen';
import NewsScreen from './NewsScreen';
import ReportScreen from './ReportScreen';
import ProfileScreen from './ProfileScreen';

const TABS = [
  { key: 'Home', icon: 'house' },
  { key: 'News', icon: 'newspaper' },
  { key: 'Report', icon: 'file-lines' },
  { key: 'Profile', icon: 'user' },
];

export default function MainPage() {
  const insets = useSafeAreaInsets();
  const scales = useRef(
    TABS.map(() => new Animated.Value(1))
  ).current;
  const [activeTab, setActiveTab] = useState('Home');
  // const indicator = useRef(new Animated.Value(0)).current;
  const changeTab = (tab, index) => {
    // animateIndicator(index);
    setActiveTab(tab);

    scales.forEach((scale, i) => {
      Animated.spring(scale, {
        toValue: i === index ? 1.15 : 1,
        useNativeDriver: true,
        damping: 12,
        stiffness: 120,
      }).start();
    });
  };

  const backPressCount = useRef(0);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (activeTab !== 'Home') {
          changeTab('Home', 0);
          return true;
        }

        if (backPressCount.current === 0) {
          backPressCount.current = 1;
          ToastAndroid.show(
            'Press back again to exit',
            ToastAndroid.SHORT
          );

          setTimeout(() => {
            backPressCount.current = 0;
          }, 2000);

          return true;
        }

        BackHandler.exitApp();
        return true;
      }
    );

    return () => subscription.remove();
  }, [activeTab]);


  const [tabWidth, setTabWidth] = useState(
    Dimensions.get('window').width / TABS.length
  );

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({ window }) => {
      setTabWidth(window.width / TABS.length);
    });
    return () => sub.remove();
  }, []);

  // const animateIndicator = index => {
  //   Animated.spring(indicator, {
  //     toValue: index,
  //     useNativeDriver: true,
  //   }).start();
  // };

  const renderScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen />;
      case 'News':
        return <NewsScreen />;
      case 'Report':
        return <ReportScreen />;
      case 'Profile':
        return <ProfileScreen />;
      default:
        return null;
    }
  };

  // const translateX = Animated.multiply(indicator, tabWidth);
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>{renderScreen()}</View>

      {/* Bottom Tab Bar */}
      <View style={{ paddingHorizontal: 5 }}>
      <View
        style={[
          styles.tabBar,
          {
            paddingBottom: insets.bottom,
            height: 50 + insets.bottom,
          },
        ]}
      >
        {/* Animated Indicator */}
        {/* <Animated.View
            style={[
                styles.indicator,
                {
                width: tabWidth,
                transform: [{ translateX }],
                },
            ]}
        /> */}

        {TABS.map((tab, index) => {
          const isActive = activeTab === tab.key;
          const icon = isActive
            ? ['fas', tab.icon]
            : ['far', tab.icon];

          return (
            <Pressable
              key={tab.key}
              onPress={() => changeTab(tab.key, index)}
              style={styles.tabItem}
            >
              <Animated.View
                style={[
                  styles.iconWrapper,
                  isActive && styles.iconActiveShadow,
                  { transform: [{ scale: scales[index] }] },
                ]}
              >
                <FontAwesomeIcon
                  icon={icon}
                  size={20}
                  color={isActive ? '#5F33E1' : '#999'}
                />
              </Animated.View>
            </Pressable>
          );
        })}
      </View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#EEE9FF',

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',

    borderTopWidth: 1,
    borderColor: '#e5e5f0',
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // indicator: {
  //   position: 'absolute',
  //   top: 0,
  //   height: 2,
  //   backgroundColor: '#5F33E1',
  // },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconActiveShadow: {
    elevation: 5,
    
    shadowColor: '#5F33E1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },


});
