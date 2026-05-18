import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = 'gooners.onboarding.completed';
const SAVED_STORIES_KEY = 'gooners.saved.stories';
const SAVED_FACTS_KEY = 'gooners.saved.facts';
const RIDDLES_PROGRESS_KEY = 'gooners.riddles.progress';
const EXTRA_WORD_PROGRESS_KEY = 'gooners.extra-word.progress';

export type RiddlesProgress = {
  mode: 'home' | 'quiz' | 'result';
  levelIndex: number;
  questionIndex: number;
  score: number;
  selectedIndex: number | null;
  checked: boolean;
};

export type ExtraWordProgress = {
  mode: 'home' | 'quiz' | 'result';
  levelIndex: number;
  questionIndex: number;
  score: number;
  selectedIndex: number | null;
  checked: boolean;
};

const readStringArray = async (key: string) => {
  const raw = await AsyncStorage.getItem(key);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === 'string')
      : [];
  } catch {
    return [];
  }
};

const writeStringArray = (key: string, value: string[]) =>
  AsyncStorage.setItem(key, JSON.stringify(value));

const toggleId = async (key: string, id: string) => {
  const ids = await readStringArray(key);
  const next = ids.includes(id)
    ? ids.filter(savedId => savedId !== id)
    : [...ids, id];

  await writeStringArray(key, next);
  return next;
};

export const isOnboardingCompleted = async () =>
  (await AsyncStorage.getItem(ONBOARDING_KEY)) === 'true';

export const completeOnboarding = () =>
  AsyncStorage.setItem(ONBOARDING_KEY, 'true');

export const getSavedStories = () => readStringArray(SAVED_STORIES_KEY);

export const toggleSavedStory = (id: string) =>
  toggleId(SAVED_STORIES_KEY, id);

export const getSavedFacts = () => readStringArray(SAVED_FACTS_KEY);

export const toggleSavedFact = (id: string) => toggleId(SAVED_FACTS_KEY, id);

export const getRiddlesProgress = async () => {
  const raw = await AsyncStorage.getItem(RIDDLES_PROGRESS_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);

    if (
      parsed &&
      Number.isInteger(parsed.levelIndex) &&
      Number.isInteger(parsed.questionIndex) &&
      Number.isInteger(parsed.score) &&
      typeof parsed.checked === 'boolean' &&
      (parsed.selectedIndex === null || Number.isInteger(parsed.selectedIndex))
    ) {
      const mode =
        parsed.mode === 'home' ||
        parsed.mode === 'quiz' ||
        parsed.mode === 'result'
          ? parsed.mode
          : parsed.checked && parsed.questionIndex === 4
            ? 'result'
            : 'quiz';

      return {
        mode,
        levelIndex: parsed.levelIndex,
        questionIndex: parsed.questionIndex,
        score: parsed.score,
        selectedIndex: parsed.selectedIndex,
        checked: parsed.checked,
      } as RiddlesProgress;
    }

    return null;
  } catch {
    return null;
  }
};

export const saveRiddlesProgress = (progress: RiddlesProgress) =>
  AsyncStorage.setItem(RIDDLES_PROGRESS_KEY, JSON.stringify(progress));

export const getExtraWordProgress = async () => {
  const raw = await AsyncStorage.getItem(EXTRA_WORD_PROGRESS_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);

    if (
      parsed &&
      Number.isInteger(parsed.levelIndex) &&
      Number.isInteger(parsed.questionIndex) &&
      Number.isInteger(parsed.score) &&
      typeof parsed.checked === 'boolean' &&
      (parsed.selectedIndex === null || Number.isInteger(parsed.selectedIndex))
    ) {
      const mode =
        parsed.mode === 'home' ||
        parsed.mode === 'quiz' ||
        parsed.mode === 'result'
          ? parsed.mode
          : parsed.checked && parsed.questionIndex === 4
            ? 'result'
            : 'quiz';

      return {
        mode,
        levelIndex: parsed.levelIndex,
        questionIndex: parsed.questionIndex,
        score: parsed.score,
        selectedIndex: parsed.selectedIndex,
        checked: parsed.checked,
      } as ExtraWordProgress;
    }

    return null;
  } catch {
    return null;
  }
};

export const saveExtraWordProgress = (progress: ExtraWordProgress) =>
  AsyncStorage.setItem(EXTRA_WORD_PROGRESS_KEY, JSON.stringify(progress));
