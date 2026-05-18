import {Platform} from 'react-native';

export const colors = {
  cream: '#fff4d0',
  mutedCream: 'rgba(255, 244, 208, 0.72)',
  panel: 'rgba(52, 15, 13, 0.72)',
  panelStrong: 'rgba(76, 23, 15, 0.82)',
  panelSoft: 'rgba(87, 39, 25, 0.58)',
  orange: '#c95f16',
  orangeDark: '#a9480d',
  gold: '#b79b12',
  green: '#1b741f',
  red: '#9a2218',
  border: 'rgba(255, 183, 134, 0.34)',
  borderBright: 'rgba(255, 209, 153, 0.66)',
  shadow: 'rgba(0, 0, 0, 0.45)',
  white: '#ffffff',
  black: '#070306',
};

export const metrics = {
  screenPadding: 16,
  cardRadius: 8,
  tabHeight: 64,
  tabBottomOffset: Platform.OS === 'ios' ? 20 : 30,
  androidEdge: Platform.OS === 'android' ? 30 : 0,
};
