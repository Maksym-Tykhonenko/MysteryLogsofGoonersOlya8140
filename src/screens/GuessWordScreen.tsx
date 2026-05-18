import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BackgroundScreen} from '../components/BackgroundScreen';
import {CompactKeyboard} from '../components/CompactKeyboard';
import {FeedbackBanner} from '../components/FeedbackBanner';
import {GlassCard} from '../components/GlassCard';
import {PrimaryButton} from '../components/PrimaryButton';
import {hintWords} from '../data/games';
import {useResponsive} from '../theme/responsive';
import {colors} from '../theme/theme';

export function GuessWordScreen() {
  const responsive = useResponsive();
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const item = hintWords[index];

  const submit = () => {
    const correct = answer.trim().toLowerCase() === item.answer;
    setStatus(correct ? 'success' : 'error');
  };

  const next = () => {
    setIndex(current => (current + 1) % hintWords.length);
    setAnswer('');
    setStatus(null);
  };

  const tryAgain = () => {
    setAnswer('');
    setStatus(null);
  };

  return (
    <BackgroundScreen withTabPadding>
      <View style={styles.content}>
        <Text
          style={[styles.screenTitle, responsive.compact && styles.screenTitleCompact]}>
          Guess the word
        </Text>

        <GlassCard style={[styles.card, responsive.compact && styles.cardCompact]}>
          <Text style={[styles.cardTitle, responsive.compact && styles.cardTitleCompact]}>
            Hints
          </Text>
          {item.hints.map((hint, hintIndex) => (
            <Text key={hint} style={[styles.hint, responsive.compact && styles.hintCompact]}>
              <Text style={styles.hintStrong}>Hint {hintIndex + 1}: </Text>
              {hint}
            </Text>
          ))}
        </GlassCard>

        {!status && (
          <GlassCard style={[styles.card, responsive.compact && styles.cardCompact]}>
            <Text style={styles.cardTitleSmall}>Your answer</Text>
            <View style={[styles.input, responsive.compact && styles.inputCompact]}>
              <Text style={[styles.inputText, !answer && styles.placeholder]}>
                {answer || 'Type your answer here...'}
              </Text>
            </View>
          </GlassCard>
        )}

        {!status && (
          <CompactKeyboard value={answer} onChange={setAnswer} maxLength={14} />
        )}

        {status && (
          <FeedbackBanner
            type={status}
            message={
              status === 'success'
                ? `Well done. The answer was: "${item.answer}"`
                : `Not quite. The answer was: "${item.answer}"`
            }
          />
        )}

        {!status ? (
          <PrimaryButton
            disabled={!answer.trim()}
            onPress={submit}
            title="Submit answer"
            style={styles.mainButton}
          />
        ) : (
          <View style={styles.actions}>
            <PrimaryButton onPress={next} title="Next word" />
            {status === 'error' && (
              <PrimaryButton onPress={tryAgain} title="Try again" />
            )}
          </View>
        )}
      </View>
    </BackgroundScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  screenTitle: {
    color: colors.cream,
    fontSize: 31,
    fontWeight: '900',
    marginBottom: 16,
  },
  screenTitleCompact: {
    fontSize: 27,
    marginBottom: 12,
  },
  card: {
    padding: 18,
    marginBottom: 14,
  },
  cardCompact: {
    padding: 14,
    marginBottom: 10,
  },
  cardTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 16,
  },
  cardTitleCompact: {
    fontSize: 20,
    marginBottom: 12,
  },
  cardTitleSmall: {
    color: colors.white,
    fontSize: 19,
    fontWeight: '900',
    marginBottom: 14,
  },
  hint: {
    color: colors.mutedCream,
    fontSize: 14,
    lineHeight: 26,
  },
  hintCompact: {
    fontSize: 13,
    lineHeight: 22,
  },
  hintStrong: {
    color: colors.white,
    fontWeight: '900',
  },
  input: {
    minHeight: 50,
    borderRadius: 8,
    backgroundColor: 'rgba(151, 92, 42, 0.78)',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  inputCompact: {
    minHeight: 44,
  },
  inputText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  placeholder: {
    color: 'rgba(255, 244, 208, 0.58)',
  },
  mainButton: {
    marginHorizontal: 18,
    marginTop: 0,
  },
  actions: {
    gap: 14,
    marginHorizontal: 18,
    marginTop: 14,
  },
});
