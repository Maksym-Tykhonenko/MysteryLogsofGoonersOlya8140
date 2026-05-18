import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, metrics} from '../theme/theme';

type FeedbackBannerProps = {
  type: 'success' | 'error';
  message: string;
};

export function FeedbackBanner({type, message}: FeedbackBannerProps) {
  const success = type === 'success';

  return (
    <View style={[styles.root, success ? styles.success : styles.error]}>
      <Text style={[styles.icon, success ? styles.successIcon : styles.errorIcon]}>
        {success ? '✓' : '×'}
      </Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    minHeight: 78,
    borderRadius: metrics.cardRadius,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  success: {
    backgroundColor: 'rgba(27, 116, 31, 0.72)',
    borderColor: 'rgba(109, 255, 89, 0.32)',
  },
  error: {
    backgroundColor: 'rgba(154, 34, 24, 0.72)',
    borderColor: 'rgba(255, 123, 102, 0.35)',
  },
  icon: {
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 38,
  },
  successIcon: {
    color: '#64ff31',
  },
  errorIcon: {
    color: '#ff271b',
  },
  text: {
    flex: 1,
    color: colors.white,
    fontSize: 15,
    fontWeight: '800',
  },
});
