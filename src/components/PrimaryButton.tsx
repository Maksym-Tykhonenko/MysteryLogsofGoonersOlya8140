import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import {colors, metrics} from '../theme/theme';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'outline' | 'green';
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({
  title,
  onPress,
  disabled = false,
  variant = 'primary',
  style,
}: PrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}>
      <Text style={[styles.text, disabled && styles.disabledText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 54,
    borderRadius: metrics.cardRadius,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    borderWidth: 1,
  },
  primary: {
    backgroundColor: colors.orange,
    borderColor: 'rgba(255, 198, 128, 0.42)',
  },
  outline: {
    backgroundColor: 'rgba(79, 25, 16, 0.7)',
    borderColor: colors.borderBright,
  },
  green: {
    backgroundColor: colors.green,
    borderColor: 'rgba(145, 255, 145, 0.28)',
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    transform: [{scale: 0.98}],
  },
  text: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center',
  },
  disabledText: {
    color: 'rgba(255, 255, 255, 0.65)',
  },
});
