import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {images} from '../assets';
import {BackgroundScreen} from '../components/BackgroundScreen';
import {GlassCard} from '../components/GlassCard';
import {PrimaryButton} from '../components/PrimaryButton';
import {extraWords} from '../data/games';
import {
  getExtraWordProgress,
  saveExtraWordProgress,
} from '../storage/persistence';
import {useResponsive} from '../theme/responsive';
import {colors} from '../theme/theme';

type ExtraWordMode = 'home' | 'quiz' | 'result';

const questionsPerLevel = 5;
const passScore = 4;
const extraWordLevels = Array.from(
  {length: Math.floor(extraWords.length / questionsPerLevel)},
  (_, index) =>
    extraWords.slice(
      index * questionsPerLevel,
      index * questionsPerLevel + questionsPerLevel,
    ),
);

export function ExtraWordScreen() {
  const responsive = useResponsive();
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<ExtraWordMode>('home');
  const [levelIndex, setLevelIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const level = extraWordLevels[levelIndex] ?? extraWordLevels[0];
  const item = level[questionIndex] ?? level[0];
  const passed = score >= passScore;
  const levelFinished = checked && questionIndex === questionsPerLevel - 1;
  const hasProgress =
    !levelFinished && (questionIndex > 0 || score > 0 || selected !== null);

  useEffect(() => {
    let active = true;

    getExtraWordProgress().then(progress => {
      if (!active) {
        return;
      }

      if (progress) {
        const nextLevel = Math.max(
          0,
          Math.min(progress.levelIndex, extraWordLevels.length - 1),
        );
        const nextQuestion = Math.max(
          0,
          Math.min(progress.questionIndex, questionsPerLevel - 1),
        );
        const nextSelected =
          progress.selectedIndex !== null &&
          progress.selectedIndex >= 0 &&
          progress.selectedIndex <= 3
            ? progress.selectedIndex
            : null;
        const nextChecked = progress.checked && nextSelected !== null;

        setMode(progress.mode);
        setLevelIndex(nextLevel);
        setQuestionIndex(nextQuestion);
        setScore(Math.max(0, Math.min(progress.score, questionsPerLevel)));
        setSelected(nextSelected);
        setChecked(nextChecked);
      }

      setReady(true);
    });

    return () => {
      active = false;
    };
  }, []);

  const persist = (
    nextMode: ExtraWordMode,
    nextLevelIndex: number,
    nextQuestionIndex: number,
    nextScore: number,
    nextSelected: number | null,
    nextChecked: boolean,
  ) =>
    saveExtraWordProgress({
      mode: nextMode,
      levelIndex: nextLevelIndex,
      questionIndex: nextQuestionIndex,
      score: nextScore,
      selectedIndex: nextSelected,
      checked: nextChecked,
    });

  const openHome = () => {
    setMode('home');
    persist('home', levelIndex, questionIndex, score, selected, checked);
  };

  const startLevel = () => {
    if (levelFinished) {
      setQuestionIndex(0);
      setScore(0);
      setSelected(null);
      setChecked(false);
      setMode('quiz');
      persist('quiz', levelIndex, 0, 0, null, false);
      return;
    }

    setMode('quiz');
    persist('quiz', levelIndex, questionIndex, score, selected, checked);
  };

  const chooseWord = (wordIndex: number) => {
    setSelected(wordIndex);
    persist('quiz', levelIndex, questionIndex, score, wordIndex, false);
  };

  const submit = () => {
    if (selected === null) {
      return;
    }

    const nextScore = score + (selected === item.oddIndex ? 1 : 0);
    const completed = questionIndex === questionsPerLevel - 1;
    const nextMode: ExtraWordMode = completed ? 'result' : 'quiz';

    setScore(nextScore);
    setChecked(true);
    setMode(nextMode);
    persist(nextMode, levelIndex, questionIndex, nextScore, selected, true);
  };

  const nextQuestion = () => {
    const nextIndex = questionIndex + 1;

    setQuestionIndex(nextIndex);
    setSelected(null);
    setChecked(false);
    persist('quiz', levelIndex, nextIndex, score, null, false);
  };

  const retryLevel = () => {
    setMode('quiz');
    setQuestionIndex(0);
    setScore(0);
    setSelected(null);
    setChecked(false);
    persist('quiz', levelIndex, 0, 0, null, false);
  };

  const nextLevel = () => {
    const nextIndex = (levelIndex + 1) % extraWordLevels.length;

    setMode('quiz');
    setLevelIndex(nextIndex);
    setQuestionIndex(0);
    setScore(0);
    setSelected(null);
    setChecked(false);
    persist('quiz', nextIndex, 0, 0, null, false);
  };

  const tileStyle = (wordIndex: number) => {
    if (!checked && selected === wordIndex) {
      return [styles.tile, styles.selectedTile];
    }

    if (checked && wordIndex === item.oddIndex) {
      return [styles.tile, styles.correctTile];
    }

    if (checked && selected === wordIndex && selected !== item.oddIndex) {
      return [styles.tile, styles.errorTile];
    }

    return styles.tile;
  };

  if (!ready) {
    return (
      <BackgroundScreen withTabPadding>
        <Text
          style={[styles.screenTitle, responsive.compact && styles.screenTitleCompact]}>
          Extra word
        </Text>
      </BackgroundScreen>
    );
  }

  if (mode === 'home') {
    return (
      <BackgroundScreen withTabPadding>
        <Text
          style={[styles.screenTitle, responsive.compact && styles.screenTitleCompact]}>
          Extra word
        </Text>

        <GlassCard
          style={[styles.levelCard, responsive.compact && styles.levelCardCompact]}>
          <Image
            source={images.characterNate}
            resizeMode="contain"
            style={[
              styles.levelImage,
              responsive.compact && styles.levelImageCompact,
            ]}
          />
          <Text style={styles.levelLabel}>Level {levelIndex + 1}</Text>
          <Text
            style={[styles.levelTitle, responsive.compact && styles.levelTitleCompact]}>
            Which word does not belong to this group?
          </Text>
          <Text
            style={[
              styles.levelTextLarge,
              responsive.compact && styles.levelTextLargeCompact,
            ]}>
            Each round has four words. Three belong together. Tap the word that
            does not fit.
          </Text>
          <View style={styles.goalRow}>
            <Text style={styles.goalText}>Goal</Text>
            <Text style={styles.goalValue}>4/5 correct</Text>
          </View>
          <ProgressDots
            active={questionIndex}
            compact={responsive.narrow}
            total={questionsPerLevel}
          />
        </GlassCard>

        <PrimaryButton
          onPress={startLevel}
          title={hasProgress ? 'Continue' : 'Start level'}
          style={styles.button}
        />
      </BackgroundScreen>
    );
  }

  if (mode === 'result') {
    return (
      <BackgroundScreen withTabPadding>
        <View style={styles.header}>
          <Text
            style={[
              styles.screenTitle,
              responsive.compact && styles.screenTitleCompact,
            ]}>
            Extra word
          </Text>
          <View style={styles.levelPill}>
            <Text style={styles.levelText}>Level {levelIndex + 1}</Text>
          </View>
        </View>

        <GlassCard
          style={[
            styles.resultCard,
            responsive.compact && styles.resultCardCompact,
            passed ? styles.resultSuccess : styles.resultError,
          ]}>
          <Text style={styles.resultIcon}>{passed ? '✓' : '×'}</Text>
          <Text style={styles.resultTitle}>
            {passed ? 'Level completed' : 'Try again'}
          </Text>
          <Text style={styles.resultText}>Correct answers: {score}/5</Text>
        </GlassCard>

        <View style={styles.resultActions}>
          <PrimaryButton title="Home" onPress={openHome} variant="outline" />
          <PrimaryButton
            title={passed ? 'Next level' : 'Try again'}
            onPress={passed ? nextLevel : retryLevel}
          />
        </View>
      </BackgroundScreen>
    );
  }

  return (
    <BackgroundScreen withTabPadding>
      <View style={styles.header}>
        <Text
          style={[styles.screenTitle, responsive.compact && styles.screenTitleCompact]}>
          Extra word
        </Text>
        <View style={styles.levelPill}>
          <Text style={styles.levelText}>Level {levelIndex + 1}</Text>
        </View>
      </View>

      <GlassCard
        style={[styles.introCard, responsive.compact && styles.introCardCompact]}>
        <Image
          source={images.characterNate}
          resizeMode="contain"
          style={[styles.nate, responsive.compact && styles.nateCompact]}
        />
        <View style={styles.introCopy}>
          <Text style={styles.questionCount}>
            Level {levelIndex + 1} · Group {questionIndex + 1}/5
          </Text>
          <Text style={styles.groupTitle}>Group: {item.title}</Text>
          <Text
            style={[styles.introTitle, responsive.compact && styles.introTitleCompact]}>
            Which word does not belong to this group?
          </Text>
          <Text style={styles.introText}>
            One word breaks the group. Choose it.
          </Text>
        </View>
      </GlassCard>

      <View
        style={[
          styles.progressPanel,
          responsive.narrow && styles.progressPanelNarrow,
        ]}>
        <ProgressDots
          active={questionIndex}
          compact={responsive.narrow}
          total={questionsPerLevel}
        />
        <Text style={styles.scoreText}>Score {score}/5</Text>
      </View>

      <View style={styles.grid}>
        {item.words.map((word, wordIndex) => (
          <Pressable
            accessibilityRole="button"
            disabled={checked}
            key={`${item.title}-${word}`}
            onPress={() => chooseWord(wordIndex)}
            style={[
              tileStyle(wordIndex),
              responsive.compact && styles.tileCompact,
            ]}>
            <View
              style={[
                styles.tileBadge,
                responsive.compact && styles.tileBadgeCompact,
              ]}>
              <Text
                style={[
                  styles.tileBadgeText,
                  responsive.compact && styles.tileBadgeTextCompact,
                ]}>
                {wordIndex + 1}
              </Text>
            </View>
            <Text
              style={[styles.tileText, responsive.compact && styles.tileTextCompact]}>
              {word.toUpperCase()}
            </Text>
          </Pressable>
        ))}
      </View>

      <PrimaryButton
        disabled={!checked && selected === null}
        onPress={checked ? nextQuestion : submit}
        title={checked ? 'Next question' : 'Confirm selection'}
        style={styles.button}
      />
    </BackgroundScreen>
  );
}

function ProgressDots({
  active,
  compact,
  total,
}: {
  active: number;
  compact: boolean;
  total: number;
}) {
  return (
    <View style={styles.dots}>
      {Array.from({length: total}, (_, index) => (
        <View
          key={`dot-${index}`}
          style={[
            styles.dot,
            compact && styles.dotCompact,
            index <= active && styles.dotActive,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
    gap: 12,
  },
  screenTitle: {
    color: colors.cream,
    fontSize: 31,
    fontWeight: '900',
    flex: 1,
  },
  screenTitleCompact: {
    fontSize: 27,
  },
  levelPill: {
    minHeight: 34,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderBright,
    backgroundColor: 'rgba(183, 155, 18, 0.82)',
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '900',
  },
  levelCard: {
    minHeight: 370,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
    paddingVertical: 22,
    marginBottom: 18,
  },
  levelCardCompact: {
    minHeight: 300,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 14,
  },
  levelImage: {
    width: 118,
    height: 158,
    marginBottom: 8,
  },
  levelImageCompact: {
    width: 92,
    height: 122,
    marginBottom: 4,
  },
  levelLabel: {
    color: colors.gold,
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 6,
  },
  levelTitle: {
    color: colors.cream,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 12,
  },
  levelTitleCompact: {
    fontSize: 23,
    lineHeight: 28,
    marginBottom: 8,
  },
  levelTextLarge: {
    color: colors.mutedCream,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 18,
  },
  levelTextLargeCompact: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  goalRow: {
    minHeight: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(151, 92, 42, 0.42)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  goalText: {
    color: colors.mutedCream,
    fontSize: 14,
    fontWeight: '800',
  },
  goalValue: {
    color: colors.cream,
    fontSize: 15,
    fontWeight: '900',
  },
  introCard: {
    minHeight: 148,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginBottom: 24,
  },
  introCardCompact: {
    minHeight: 126,
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  nate: {
    width: 96,
    height: 132,
    marginRight: 16,
  },
  nateCompact: {
    width: 76,
    height: 108,
    marginRight: 12,
  },
  introCopy: {
    flex: 1,
  },
  questionCount: {
    color: 'rgba(255, 244, 208, 0.62)',
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 8,
  },
  groupTitle: {
    color: colors.gold,
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 8,
  },
  introTitle: {
    color: colors.cream,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '900',
    marginBottom: 10,
  },
  introTitleCompact: {
    fontSize: 17,
    lineHeight: 21,
    marginBottom: 6,
  },
  introText: {
    color: colors.mutedCream,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  progressPanel: {
    minHeight: 42,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(42, 13, 12, 0.48)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  progressPanelNarrow: {
    paddingHorizontal: 10,
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 28,
    height: 7,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 244, 208, 0.22)',
  },
  dotCompact: {
    width: 22,
  },
  dotActive: {
    backgroundColor: colors.orange,
  },
  scoreText: {
    color: colors.mutedCream,
    fontSize: 13,
    fontWeight: '900',
  },
  tile: {
    width: '47.5%',
    minHeight: 120,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panelStrong,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  tileCompact: {
    minHeight: 98,
    borderRadius: 14,
    padding: 8,
  },
  selectedTile: {
    backgroundColor: 'rgba(194, 95, 22, 0.78)',
  },
  correctTile: {
    backgroundColor: 'rgba(82, 111, 26, 0.86)',
    borderColor: 'rgba(118, 255, 92, 0.3)',
  },
  errorTile: {
    backgroundColor: 'rgba(98, 16, 13, 0.84)',
    borderColor: 'rgba(255, 93, 72, 0.42)',
  },
  tileBadge: {
    minWidth: 42,
    height: 42,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(47, 44, 43, 0.86)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  tileBadgeCompact: {
    minWidth: 36,
    height: 36,
    marginBottom: 10,
  },
  tileBadgeText: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
  },
  tileBadgeTextCompact: {
    fontSize: 19,
  },
  tileText: {
    color: colors.cream,
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '900',
    textAlign: 'center',
  },
  tileTextCompact: {
    fontSize: 15,
    lineHeight: 20,
  },
  resultCard: {
    minHeight: 270,
    padding: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  resultCardCompact: {
    minHeight: 220,
    padding: 18,
  },
  resultSuccess: {
    backgroundColor: 'rgba(28, 114, 27, 0.72)',
    borderColor: 'rgba(118, 255, 92, 0.38)',
  },
  resultError: {
    backgroundColor: 'rgba(140, 30, 22, 0.76)',
    borderColor: 'rgba(255, 93, 72, 0.4)',
  },
  resultIcon: {
    color: colors.white,
    fontSize: 54,
    lineHeight: 60,
    fontWeight: '900',
    marginBottom: 14,
  },
  resultTitle: {
    color: colors.white,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 12,
  },
  resultText: {
    color: colors.cream,
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
  resultActions: {
    gap: 14,
    marginHorizontal: 18,
  },
  button: {
    marginHorizontal: 20,
    marginTop: 16,
  },
});
