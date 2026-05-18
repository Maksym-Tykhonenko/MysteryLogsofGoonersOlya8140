import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import {colors, metrics} from '../theme/theme';

type CompactKeyboardProps = {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  style?: StyleProp<ViewStyle>;
};

const rows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
];

export function CompactKeyboard({
  value,
  onChange,
  maxLength = 14,
  style,
}: CompactKeyboardProps) {
  const {height, width} = useWindowDimensions();
  const compact = height < 760 || width < 370;

  const pressKey = (key: string) => {
    if (key === 'backspace') {
      onChange(value.slice(0, -1));
      return;
    }

    if (value.length < maxLength) {
      onChange(`${value}${key}`);
    }
  };

  return (
    <View style={[styles.root, compact && styles.rootCompact, style]}>
      {rows.map((row, rowIndex) => (
        <View
          key={`row-${rowIndex}`}
          style={[
            styles.row,
            compact && styles.rowCompact,
            rowIndex === 1 && (compact ? styles.middleRowCompact : styles.middleRow),
            rowIndex === 2 && (compact ? styles.bottomRowCompact : styles.bottomRow),
          ]}>
          {row.map(key => {
            const backspace = key === 'backspace';

            return (
              <Pressable
                accessibilityRole="button"
                key={key}
                onPress={() => pressKey(key)}
                style={({pressed}) => [
                  styles.key,
                  compact && styles.keyCompact,
                  backspace && styles.backspace,
                  pressed && styles.pressed,
                ]}>
                <Text
                  style={[
                    styles.keyText,
                    compact && styles.keyTextCompact,
                    backspace && styles.backspaceText,
                  ]}>
                  {backspace ? '⌫' : key.toUpperCase()}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderRadius: metrics.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(42, 13, 12, 0.72)',
    paddingHorizontal: 8,
    paddingVertical: 9,
    gap: 7,
    marginBottom: 12,
  },
  rootCompact: {
    paddingHorizontal: 6,
    paddingVertical: 7,
    gap: 5,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  rowCompact: {
    gap: 3,
  },
  middleRow: {
    paddingHorizontal: 14,
  },
  middleRowCompact: {
    paddingHorizontal: 8,
  },
  bottomRow: {
    paddingHorizontal: 30,
  },
  bottomRowCompact: {
    paddingHorizontal: 18,
  },
  key: {
    flex: 1,
    height: 34,
    minWidth: 0,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 198, 128, 0.28)',
    backgroundColor: 'rgba(151, 92, 42, 0.86)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyCompact: {
    height: 30,
    borderRadius: 7,
  },
  backspace: {
    flex: 1.35,
    backgroundColor: 'rgba(103, 40, 25, 0.92)',
  },
  pressed: {
    backgroundColor: colors.orange,
    transform: [{scale: 0.96}],
  },
  keyText: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '900',
  },
  keyTextCompact: {
    fontSize: 12,
    lineHeight: 16,
  },
  backspaceText: {
    fontSize: 18,
    lineHeight: 22,
  },
});
