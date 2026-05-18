import React, {PropsWithChildren} from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {images} from '../assets';
import {colors, metrics} from '../theme/theme';

type BackgroundScreenProps = PropsWithChildren<{
  scroll?: boolean;
  background?: ImageSourcePropType;
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  withTabPadding?: boolean;
}>;

export function BackgroundScreen({
  children,
  scroll = true,
  background = images.caveBackgroundBlur,
  contentContainerStyle,
  style,
  withTabPadding = false,
}: BackgroundScreenProps) {
  const insets = useSafeAreaInsets();
  const {height, width} = useWindowDimensions();
  const compact = height < 760 || width < 370;
  const topPadding = Math.max(insets.top, metrics.androidEdge);
  const bottomEdge = Platform.OS === 'android' ? 30 : 0;
  const tabPadding = withTabPadding
    ? metrics.tabHeight + metrics.tabBottomOffset + insets.bottom + 24
    : Math.max(insets.bottom, bottomEdge);

  const contentStyle = [
    styles.content,
    {
      paddingHorizontal: width < 370 ? 12 : metrics.screenPadding,
      paddingTop: topPadding + (compact ? 8 : 16),
      paddingBottom: tabPadding,
    },
    contentContainerStyle,
  ];

  return (
    <ImageBackground source={background} resizeMode="cover" style={styles.root}>
      <View style={styles.scrim} />
      {scroll ? (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={contentStyle}
          style={style}>
          {children}
        </ScrollView>
      ) : (
        <View style={[contentStyle, styles.flex, style]}>{children}</View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.black,
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.22)',
  },
  content: {
    paddingHorizontal: metrics.screenPadding,
  },
  flex: {
    flex: 1,
  },
});
