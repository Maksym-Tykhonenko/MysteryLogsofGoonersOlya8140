import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {images} from '../assets';
import {colors} from '../theme/theme';
import {RootStackParamList} from '../navigation/types';
import {isOnboardingCompleted} from '../storage/persistence';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export function SplashScreen({navigation}: Props) {
  const swing = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(swing, {
          toValue: 1,
          duration: 820,
          useNativeDriver: true,
        }),
        Animated.timing(swing, {
          toValue: -1,
          duration: 1120,
          useNativeDriver: true,
        }),
        Animated.timing(swing, {
          toValue: 0,
          duration: 820,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    {/** 
    const timeout = setTimeout(async () => {
      const completed = await isOnboardingCompleted();
      navigation.replace(completed ? 'Main' : 'Onboarding');
    }, 5000);

    return () => {
      animation.stop();
      clearTimeout(timeout);
    };*/}
  }, [navigation, swing]);

  const rotate = swing.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-14deg', '14deg'],
  });

  return (
    <ImageBackground
      source={images.caveBackground}
      resizeMode="cover"
      style={styles.root}>
      <View style={styles.overlay} />
      <Animated.View style={[styles.wheelWrap, {transform: [{rotate}]}]}>
        <Image source={images.wheel} resizeMode="contain" style={styles.wheel} />
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
  },
  wheelWrap: {
    width: '72%',
    maxWidth: 330,
    aspectRatio: 1,
  },
  wheel: {
    width: '100%',
    height: '100%',
  },
});
