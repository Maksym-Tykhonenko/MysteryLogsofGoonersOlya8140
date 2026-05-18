import React from 'react';
import {Pressable, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {colors, metrics} from '../theme/theme';

type SegmentControlProps<T extends string> = {
  options: {label: string; value: T}[];
  value: T;
  onChange: (value: T) => void;
};

export function SegmentControl<T extends string>({
  options,
  value,
  onChange,
}: SegmentControlProps<T>) {
  const {height, width} = useWindowDimensions();
  const compact = height < 760 || width < 370;

  return (
    <View style={[styles.root, compact && styles.rootCompact]}>
      {options.map(option => {
        const active = option.value === value;

        return (
          <Pressable
            accessibilityRole="button"
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[styles.item, active && styles.active]}>
            <Text
              style={[
                styles.text,
                compact && styles.textCompact,
                active && styles.activeText,
              ]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    minHeight: 64,
    borderRadius: metrics.cardRadius + 4,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(41, 12, 11, 0.62)',
    padding: 5,
    flexDirection: 'row',
    gap: 6,
  },
  rootCompact: {
    minHeight: 54,
    padding: 4,
    gap: 4,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: metrics.cardRadius,
    paddingHorizontal: 10,
  },
  active: {
    backgroundColor: colors.orangeDark,
    borderColor: colors.borderBright,
    borderWidth: 1,
  },
  text: {
    color: 'rgba(255, 244, 208, 0.56)',
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
  textCompact: {
    fontSize: 13,
  },
  activeText: {
    color: colors.white,
  },
});
