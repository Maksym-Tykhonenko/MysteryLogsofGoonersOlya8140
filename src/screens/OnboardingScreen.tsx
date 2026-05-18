import React, {useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BackgroundScreen} from '../components/BackgroundScreen';
import {GlassCard} from '../components/GlassCard';
import {PrimaryButton} from '../components/PrimaryButton';
import {onboardingSlides} from '../data/onboarding';
import {RootStackParamList} from '../navigation/types';
import {completeOnboarding} from '../storage/persistence';
import {colors} from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export function OnboardingScreen({navigation}: Props) {
  const [index, setIndex] = useState(0);
  const {height, width} = useWindowDimensions();
  const compact = height < 760 || width < 370;
  const slide = onboardingSlides[index];
  const isLast = index === onboardingSlides.length - 1;
  const imageHeight = Math.max(120, Math.min(height * (compact ? 0.27 : 0.34), 270));

  const finish = async () => {
    await completeOnboarding();
    navigation.replace('Main');
  };

  const next = () => {
    if (isLast) {
      finish();
      return;
    }

    setIndex(current => current + 1);
  };

  return (
    <BackgroundScreen
      contentContainerStyle={styles.content}
      scroll
      withTabPadding={false}>
      <View style={[styles.foreground, compact && styles.foregroundCompact]}>
        <View style={[styles.imageArea, compact && styles.imageAreaCompact]}>
          <Image
            source={slide.image}
            resizeMode="contain"
            style={[
              styles.image,
              compact && styles.imageCompact,
              {height: imageHeight},
            ]}
          />
        </View>

        <GlassCard style={[styles.card, compact && styles.cardCompact]}>
          <Text style={[styles.title, compact && styles.titleCompact]}>
            {slide.title}
          </Text>
          <Text style={[styles.text, compact && styles.textCompact]}>{slide.text}</Text>
        </GlassCard>

        <PrimaryButton title={slide.button} onPress={next} style={styles.button} />

        <Pressable accessibilityRole="button" onPress={finish} style={styles.skip}>
          <Text style={styles.skipText}>Skip introduction</Text>
        </Pressable>
      </View>
    </BackgroundScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  foreground: {
    transform: [{translateY: -40}],
  },
  foregroundCompact: {
    transform: [{translateY: -24}],
  },
  imageArea: {
    minHeight: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageAreaCompact: {
    minHeight: 150,
    marginBottom: 8,
  },
  image: {
    width: '92%',
    transform: [{translateY: -30}],
  },
  imageCompact: {
    width: '88%',
    transform: [{translateY: -18}],
  },
  card: {
    paddingHorizontal: 22,
    paddingVertical: 22,
    marginBottom: 18,
  },
  cardCompact: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
  },
  title: {
    color: colors.cream,
    fontSize: 23,
    lineHeight: 28,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 14,
  },
  titleCompact: {
    fontSize: 20,
    lineHeight: 24,
    marginBottom: 10,
  },
  text: {
    color: colors.mutedCream,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  textCompact: {
    fontSize: 13,
    lineHeight: 18,
  },
  button: {
    marginHorizontal: 18,
  },
  skip: {
    minHeight: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  skipText: {
    color: 'rgba(255, 244, 208, 0.6)',
    fontSize: 13,
    fontWeight: '800',
  },
});
