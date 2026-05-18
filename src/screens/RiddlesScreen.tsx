import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {BackgroundScreen} from '../components/BackgroundScreen';
import {GlassCard} from '../components/GlassCard';
import {PrimaryButton} from '../components/PrimaryButton';
import {riddles} from '../data/games';
import {
  getRiddlesProgress,
  saveRiddlesProgress,
} from '../storage/persistence';
import {useResponsive} from '../theme/responsive';
import {colors} from '../theme/theme';

type RiddleMode = 'home' | 'quiz' | 'result';

const optionLetters = ['A', 'B', 'C', 'D'];
const questionsPerLevel = 5;
const passScore = 4;
const riddleLevels = Array.from(
  {length: Math.floor(riddles.length / questionsPerLevel)},
  (_, index) =>
    riddles.slice(
      index * questionsPerLevel,
      index * questionsPerLevel + questionsPerLevel,
    ),
);

export function RiddlesScreen() {
  const responsive = useResponsive();
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<RiddleMode>('home');
  const [levelIndex, setLevelIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const level = riddleLevels[levelIndex] ?? riddleLevels[0];
  const item = level[questionIndex] ?? level[0];
  const passed = score >= passScore;
  const levelFinished = checked && questionIndex === questionsPerLevel - 1;
  const hasProgress =
    !levelFinished && (questionIndex > 0 || score > 0 || selected !== null);

  useEffect(() => {
    let active = true;

    getRiddlesProgress().then(progress => {
      if (!active) {
        return;
      }

      if (progress) {
        const nextLevel = Math.max(
          0,
          Math.min(progress.levelIndex, riddleLevels.length - 1),
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
    nextMode: RiddleMode,
    nextLevelIndex: number,
    nextQuestionIndex: number,
    nextScore: number,
    nextSelected: number | null,
    nextChecked: boolean,
  ) =>
    saveRiddlesProgress({
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

  const chooseOption = (optionIndex: number) => {
    setSelected(optionIndex);
    persist('quiz', levelIndex, questionIndex, score, optionIndex, false);
  };

  const submit = () => {
    if (selected === null) {
      return;
    }

    const nextScore = score + (selected === item.answerIndex ? 1 : 0);
    const completed = questionIndex === questionsPerLevel - 1;
    const nextMode: RiddleMode = completed ? 'result' : 'quiz';

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
    const nextIndex = (levelIndex + 1) % riddleLevels.length;

    setMode('quiz');
    setLevelIndex(nextIndex);
    setQuestionIndex(0);
    setScore(0);
    setSelected(null);
    setChecked(false);
    persist('quiz', nextIndex, 0, 0, null, false);
  };

  const optionStyle = (optionIndex: number) => {
    if (!checked && selected === optionIndex) {
      return [styles.option, styles.selectedOption];
    }

    if (checked && optionIndex === item.answerIndex) {
      return [styles.option, styles.correctOption];
    }

    if (checked && selected === optionIndex && selected !== item.answerIndex) {
      return [styles.option, styles.errorOption];
    }

    return styles.option;
  };

  if (!ready) {
    return (
      <BackgroundScreen withTabPadding>
        <Text style={styles.screenTitle}>Riddles</Text>
      </BackgroundScreen>
    );
  }

  if (mode === 'home') {
    return (
      <BackgroundScreen withTabPadding>
        <View style={styles.header}>
          <Text
            style={[styles.screenTitle, responsive.compact && styles.screenTitleCompact]}>
            Riddles
          </Text>
          <View style={styles.levelPill}>
            <Text style={styles.levelText}>Level {levelIndex + 1}</Text>
          </View>
        </View>

        <GlassCard style={[styles.homeCard, responsive.compact && styles.homeCardCompact]}>
          <Text style={[styles.homeTitle, responsive.compact && styles.homeTitleCompact]}>
            Quiz home
          </Text>
          <Text style={[styles.homeText, responsive.compact && styles.homeTextCompact]}>
            Answer five riddles. Four correct answers open the next level.
          </Text>
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
            style={[styles.screenTitle, responsive.compact && styles.screenTitleCompact]}>
            Riddles
          </Text>
          <View style={styles.levelPill}>
            <Text style={styles.levelText}>Level {levelIndex + 1}</Text>
          </View>
        </View>

        <GlassCard
          style={[
            styles.resultScreenCard,
            responsive.compact && styles.resultScreenCardCompact,
            passed ? styles.resultSuccess : styles.resultError,
          ]}>
          <Text style={[styles.resultIcon, responsive.compact && styles.resultIconCompact]}>
            {passed ? '✓' : '×'}
          </Text>
          <Text
            style={[styles.resultTitle, responsive.compact && styles.resultTitleCompact]}>
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
          Riddles
        </Text>
        <View style={styles.levelPill}>
          <Text style={styles.levelText}>Level {levelIndex + 1}</Text>
        </View>
      </View>

      <GlassCard
        style={[styles.questionCard, responsive.compact && styles.questionCardCompact]}>
        <Text style={styles.questionCount}>Question {questionIndex + 1}/5</Text>
        <Text style={[styles.question, responsive.compact && styles.questionCompact]}>
          {item.question}
        </Text>
        <View style={[styles.rule, responsive.compact && styles.ruleCompact]} />
        <Text style={styles.helper}>Choose the best answer below</Text>
      </GlassCard>

      <View style={styles.options}>
        {item.options.map((option, optionIndex) => {
          const correct = checked && optionIndex === item.answerIndex;
          const wrong =
            checked && selected === optionIndex && selected !== item.answerIndex;

          return (
            <Pressable
              accessibilityRole="button"
              disabled={checked}
              key={option}
              onPress={() => chooseOption(optionIndex)}
              style={[
                optionStyle(optionIndex),
                responsive.compact && styles.optionCompact,
              ]}>
              <View
                style={[
                  styles.optionBadge,
                  responsive.compact && styles.optionBadgeCompact,
                ]}>
                <Text
                  style={[styles.badgeText, responsive.compact && styles.badgeTextCompact]}>
                  {optionLetters[optionIndex]}
                </Text>
              </View>
              <Text
                style={[styles.optionText, responsive.compact && styles.optionTextCompact]}>
                {option}
              </Text>
              {correct && <Text style={styles.correctMark}>✓</Text>}
              {wrong && <Text style={styles.wrongMark}>×</Text>}
            </Pressable>
          );
        })}
      </View>

      <PrimaryButton
        disabled={!checked && selected === null}
        onPress={checked ? nextQuestion : submit}
        title={checked ? 'Next question' : 'Submit answer'}
        style={styles.button}
      />
    </BackgroundScreen>
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
  homeCard: {
    padding: 20,
    marginBottom: 18,
  },
  homeCardCompact: {
    padding: 16,
    marginBottom: 14,
  },
  homeTitle: {
    color: colors.cream,
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 12,
  },
  homeTitleCompact: {
    fontSize: 22,
    marginBottom: 8,
  },
  homeText: {
    color: colors.mutedCream,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
  },
  homeTextCompact: {
    fontSize: 14,
    lineHeight: 19,
  },
  questionCard: {
    padding: 20,
    marginBottom: 14,
  },
  questionCardCompact: {
    padding: 16,
    marginBottom: 10,
  },
  questionCount: {
    color: 'rgba(255, 244, 208, 0.62)',
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 12,
  },
  question: {
    color: colors.cream,
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '700',
  },
  questionCompact: {
    fontSize: 15,
    lineHeight: 20,
  },
  rule: {
    width: 124,
    height: 1,
    backgroundColor: 'rgba(255, 244, 208, 0.72)',
    marginVertical: 16,
  },
  ruleCompact: {
    marginVertical: 12,
  },
  helper: {
    color: 'rgba(255, 244, 208, 0.5)',
    fontSize: 13,
    fontWeight: '700',
  },
  options: {
    gap: 12,
  },
  option: {
    minHeight: 66,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panelStrong,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 16,
  },
  optionCompact: {
    minHeight: 56,
    borderRadius: 12,
    paddingHorizontal: 10,
    gap: 10,
  },
  selectedOption: {
    backgroundColor: 'rgba(194, 95, 22, 0.78)',
  },
  correctOption: {
    backgroundColor: 'rgba(28, 114, 27, 0.72)',
    borderColor: 'rgba(118, 255, 92, 0.38)',
  },
  errorOption: {
    backgroundColor: 'rgba(140, 30, 22, 0.76)',
    borderColor: 'rgba(255, 93, 72, 0.4)',
  },
  optionBadge: {
    width: 52,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(47, 44, 43, 0.86)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionBadgeCompact: {
    width: 44,
    height: 40,
  },
  badgeText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '900',
  },
  badgeTextCompact: {
    fontSize: 18,
  },
  optionText: {
    flex: 1,
    color: colors.cream,
    fontSize: 19,
    fontWeight: '700',
  },
  optionTextCompact: {
    fontSize: 17,
  },
  correctMark: {
    color: '#64ff31',
    fontSize: 25,
    fontWeight: '900',
  },
  wrongMark: {
    color: '#ff271b',
    fontSize: 25,
    fontWeight: '900',
  },
  resultScreenCard: {
    minHeight: 270,
    padding: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  resultScreenCardCompact: {
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
  resultIconCompact: {
    fontSize: 46,
    lineHeight: 52,
    marginBottom: 10,
  },
  resultTitle: {
    color: colors.white,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 12,
  },
  resultTitleCompact: {
    fontSize: 23,
    lineHeight: 28,
    marginBottom: 8,
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
    marginHorizontal: 18,
    marginTop: 14,
  },
});
