import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {BackgroundScreen} from '../components/BackgroundScreen';
import {FeedbackBanner} from '../components/FeedbackBanner';
import {GlassCard} from '../components/GlassCard';
import {PrimaryButton} from '../components/PrimaryButton';
import {missingLetters} from '../data/games';
import {useResponsive} from '../theme/responsive';
import {colors} from '../theme/theme';

export function MissingLetterScreen() {
  const responsive = useResponsive();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const item = missingLetters[index];
  const correctLetter = item.word[item.missingIndex].toUpperCase();

  const submit = () => {
    if (!selected) {
      return;
    }

    setStatus(selected === correctLetter ? 'success' : 'error');
  };

  const next = () => {
    setIndex(current => (current + 1) % missingLetters.length);
    setSelected(null);
    setStatus(null);
  };

  const tryAgain = () => {
    setSelected(null);
    setStatus(null);
  };

  const visibleLetter = (letter: string, letterIndex: number) => {
    if (letterIndex !== item.missingIndex) {
      return letter.toUpperCase();
    }

    if (status === 'success') {
      return correctLetter;
    }

    return selected ?? '';
  };

  const letterBoxStyle = (letterIndex: number) => {
    if (letterIndex !== item.missingIndex) {
      return styles.letterBox;
    }

    if (status === 'success') {
      return [styles.letterBox, styles.correctBox];
    }

    if (status === 'error') {
      return [styles.letterBox, styles.errorBox];
    }

    if (selected) {
      return [styles.letterBox, styles.selectedBox];
    }

    return [styles.letterBox, styles.emptyBox];
  };

  return (
    <BackgroundScreen withTabPadding>
      <Text
        style={[styles.screenTitle, responsive.compact && styles.screenTitleCompact]}>
        Missing letter
      </Text>

      <GlassCard style={[styles.wordCard, responsive.compact && styles.wordCardCompact]}>
        <Text style={styles.cardTitle}>Fill in the missing letter</Text>
        <View style={styles.wordRow}>
          {item.word.split('').map((letter, letterIndex) => (
            <View
              key={`${letter}-${letterIndex}`}
              style={[
                letterBoxStyle(letterIndex),
                responsive.narrow && styles.letterBoxNarrow,
              ]}>
              <Text
                style={[
                  styles.letterText,
                  responsive.narrow && styles.letterTextNarrow,
                ]}>
                {visibleLetter(letter, letterIndex)}
              </Text>
            </View>
          ))}
        </View>
      </GlassCard>

      {!status && (
        <GlassCard
          style={[styles.choiceCard, responsive.compact && styles.choiceCardCompact]}>
          <Text style={styles.choiceTitle}>Select a letter</Text>
          <View style={styles.choiceRow}>
            {item.choices.map(choice => {
              const active = selected === choice;

              return (
                <Pressable
                  accessibilityRole="button"
                  key={choice}
                  onPress={() => setSelected(choice)}
                  style={[
                    styles.choice,
                    responsive.narrow && styles.choiceNarrow,
                    active && styles.selectedChoice,
                  ]}>
                  <Text style={styles.choiceText}>{choice}</Text>
                </Pressable>
              );
            })}
          </View>
        </GlassCard>
      )}

      {status && (
        <FeedbackBanner
          type={status}
          message={
            status === 'success'
              ? 'Correct! Well done'
              : `The missing letter was "${correctLetter}"`
          }
        />
      )}

      {!status ? (
        <PrimaryButton
          disabled={!selected}
          onPress={submit}
          title="Confirm selection"
          style={styles.button}
        />
      ) : (
        <View style={styles.actions}>
          <PrimaryButton onPress={next} title="Next word" />
          {status === 'error' && (
            <PrimaryButton onPress={tryAgain} title="Try again" />
          )}
        </View>
      )}
    </BackgroundScreen>
  );
}

const styles = StyleSheet.create({
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
  wordCard: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginBottom: 14,
  },
  wordCardCompact: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginBottom: 10,
  },
  cardTitle: {
    color: colors.white,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 16,
  },
  wordRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  letterBox: {
    width: 40,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(55, 47, 43, 0.86)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterBoxNarrow: {
    width: 35,
    height: 43,
  },
  emptyBox: {
    backgroundColor: colors.gold,
  },
  selectedBox: {
    backgroundColor: colors.orange,
  },
  correctBox: {
    backgroundColor: '#4c982d',
  },
  errorBox: {
    backgroundColor: colors.red,
  },
  letterText: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
  },
  letterTextNarrow: {
    fontSize: 19,
  },
  choiceCard: {
    padding: 18,
    marginBottom: 20,
  },
  choiceCardCompact: {
    padding: 14,
    marginBottom: 14,
  },
  choiceTitle: {
    color: colors.white,
    fontSize: 19,
    fontWeight: '900',
    marginBottom: 14,
  },
  choiceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  choice: {
    minWidth: 50,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(57, 45, 43, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  choiceNarrow: {
    minWidth: 44,
    height: 44,
    paddingHorizontal: 10,
  },
  selectedChoice: {
    backgroundColor: colors.orange,
  },
  choiceText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '900',
  },
  button: {
    marginHorizontal: 18,
  },
  actions: {
    gap: 14,
    marginHorizontal: 18,
    marginTop: 14,
  },
});
