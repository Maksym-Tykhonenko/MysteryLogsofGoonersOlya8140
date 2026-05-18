import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, metrics} from '../theme/theme';

const tabIcons: Record<string, string> = {
  StoriesTab: '📖',
  GuessWord: '💡',
  MissingLetter: '🔤',
  Riddles: '🧩',
  ExtraWord: '🔎',
  Facts: '📜',
};

export function CustomTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const compact = width < 370;
  const bottom = metrics.tabBottomOffset + (Platform.OS === 'ios' ? insets.bottom : 0);
  const bottomStyle = React.useMemo(() => ({bottom}), [bottom]);

  return (
    <View
      style={[
        styles.root,
        compact && styles.rootCompact,
        bottomStyle,
      ]}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const options = descriptors[route.key].options;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <Pressable
            accessibilityLabel={options.tabBarAccessibilityLabel}
            accessibilityRole="button"
            accessibilityState={focused ? {selected: true} : {}}
            key={route.key}
            onPress={onPress}
            style={[styles.item, compact && styles.itemCompact]}>
            <View
              style={[
                styles.iconWrap,
                compact && styles.iconWrapCompact,
                focused && styles.iconActive,
              ]}>
              <Text style={[styles.icon, compact && styles.iconCompact]}>
                {tabIcons[route.name]}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: 16,
    right: 16,
    height: metrics.tabHeight,
    borderRadius: metrics.cardRadius,
    borderWidth: 1,
    borderColor: 'rgba(255, 205, 151, 0.48)',
    backgroundColor: 'rgba(194, 88, 17, 0.94)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: colors.shadow,
    shadowOpacity: 0.36,
    shadowRadius: 18,
    shadowOffset: {width: 0, height: 10},
    elevation: 10,
  },
  rootCompact: {
    left: 10,
    right: 10,
    height: 58,
  },
  item: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemCompact: {
    width: 44,
    height: 48,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: metrics.cardRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapCompact: {
    width: 36,
    height: 36,
  },
  iconActive: {
    backgroundColor: 'rgba(255, 236, 202, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.45)',
  },
  icon: {
    fontSize: 22,
    lineHeight: 28,
  },
  iconCompact: {
    fontSize: 19,
    lineHeight: 24,
  },
});
