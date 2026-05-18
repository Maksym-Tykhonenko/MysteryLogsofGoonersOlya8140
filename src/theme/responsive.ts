import {useWindowDimensions} from 'react-native';

export function useResponsive() {
  const {height, width} = useWindowDimensions();
  const narrow = width < 370;
  const compactHeight = height < 760;
  const tinyHeight = height < 680;
  const compact = narrow || compactHeight;

  return {
    compact,
    compactHeight,
    narrow,
    tinyHeight,
    height,
    width,
  };
}
