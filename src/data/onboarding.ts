import {ImageSourcePropType} from 'react-native';
import {images} from '../assets';

export type OnboardingSlide = {
  image: ImageSourcePropType;
  title: string;
  text: string;
  button: string;
};

export const onboardingSlides: OnboardingSlide[] = [
  {
    image: images.onboardingTeam,
    title: 'Stories from the team of Gooners',
    text: 'Explore adventures with the characters. Each one tells their own story - with a different mood and style.',
    button: 'Next',
  },
  {
    image: images.onboardingPuzzle,
    title: 'Words and clues',
    text: 'Guess words from clues and restore missing letters. Simple tasks that make you think.',
    button: 'Continue',
  },
  {
    image: images.onboardingCompass,
    title: 'Riddles and associations',
    text: 'Choose the correct answers and find the missing ones. Look at things from a different angle.',
    button: 'Okay',
  },
  {
    image: images.onboardingScroll,
    title: 'Interesting facts',
    text: 'Learn new things about life at sea and adventures. Short facts that are easy to read.',
    button: 'Good!',
  },
  {
    image: images.onboardingBookmark,
    title: 'Keep the important',
    text: 'Keep stories and facts separate. Come back to them anytime.',
    button: 'Get started',
  },
];
