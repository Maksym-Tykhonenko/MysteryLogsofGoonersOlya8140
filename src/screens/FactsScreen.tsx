import React, {useCallback, useState} from 'react';
import {Image, Share, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {images} from '../assets';
import {BackgroundScreen} from '../components/BackgroundScreen';
import {GlassCard} from '../components/GlassCard';
import {PrimaryButton} from '../components/PrimaryButton';
import {SegmentControl} from '../components/SegmentControl';
import {PirateFact, pirateFacts} from '../data/facts';
import {getSavedFacts, toggleSavedFact} from '../storage/persistence';
import {useResponsive} from '../theme/responsive';
import {colors} from '../theme/theme';

type Mode = 'all' | 'saved';

export function FactsScreen() {
  const responsive = useResponsive();
  const [mode, setMode] = useState<Mode>('all');
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      getSavedFacts().then(ids => {
        if (active) {
          setSavedIds(ids);
        }
      });

      return () => {
        active = false;
      };
    }, []),
  );

  const visibleFacts =
    mode === 'saved'
      ? pirateFacts.filter(fact => savedIds.includes(fact.id))
      : pirateFacts;

  const toggleSave = async (factId: string) => {
    const next = await toggleSavedFact(factId);
    setSavedIds(next);
  };

  const shareFact = (fact: PirateFact) => {
    Share.share({
      title: 'Pirate fact',
      message: fact.text,
    });
  };

  return (
    <BackgroundScreen withTabPadding>
      <Text
        style={[styles.screenTitle, responsive.compact && styles.screenTitleCompact]}>
        Pirate facts
      </Text>

      <SegmentControl<Mode>
        options={[
          {label: 'All facts', value: 'all'},
          {label: 'Saved', value: 'saved'},
        ]}
        value={mode}
        onChange={setMode}
      />

      {visibleFacts.length === 0 ? (
        <View style={styles.emptyState}>
          <Image
            source={images.onboardingBookmark}
            resizeMode="contain"
            style={styles.emptyImage}
          />
          <Text style={styles.emptyText}>
            No saved facts yet. Tap save on any fact to add it here.
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {visibleFacts.map(fact => {
            const saved = savedIds.includes(fact.id);

            return (
              <GlassCard
                key={fact.id}
                style={[styles.factCard, responsive.compact && styles.factCardCompact]}>
                <Text
                  style={[styles.factTitle, responsive.compact && styles.factTitleCompact]}>
                  Fact
                </Text>
                <View style={[styles.rule, responsive.compact && styles.ruleCompact]} />
                <Text
                  style={[styles.factText, responsive.compact && styles.factTextCompact]}>
                  {fact.text}
                </Text>
                <View style={[styles.actions, responsive.narrow && styles.actionsNarrow]}>
                  <PrimaryButton
                    title={saved ? 'Remove' : 'Save'}
                    onPress={() => toggleSave(fact.id)}
                    variant="outline"
                    style={styles.actionButton}
                  />
                  <PrimaryButton
                    title="Share"
                    onPress={() => shareFact(fact)}
                    variant="green"
                    style={styles.actionButton}
                  />
                </View>
              </GlassCard>
            );
          })}
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
    marginBottom: 18,
  },
  screenTitleCompact: {
    fontSize: 27,
    marginBottom: 12,
  },
  list: {
    gap: 16,
    marginTop: 16,
  },
  factCard: {
    minHeight: 188,
    padding: 16,
    backgroundColor: 'rgba(75, 50, 8, 0.72)',
  },
  factCardCompact: {
    minHeight: 150,
    padding: 14,
  },
  factTitle: {
    color: colors.cream,
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 10,
  },
  factTitleCompact: {
    fontSize: 21,
    marginBottom: 8,
  },
  rule: {
    width: 144,
    height: 1,
    backgroundColor: 'rgba(255, 244, 208, 0.75)',
    marginBottom: 18,
  },
  ruleCompact: {
    marginBottom: 12,
  },
  factText: {
    color: colors.cream,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '700',
  },
  factTextCompact: {
    fontSize: 14,
    lineHeight: 19,
  },
  actions: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 18,
  },
  actionsNarrow: {
    gap: 10,
  },
  actionButton: {
    minHeight: 42,
    minWidth: 74,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 86,
  },
  emptyImage: {
    width: 104,
    height: 168,
    marginBottom: 20,
  },
  emptyText: {
    color: colors.mutedCream,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '800',
    textAlign: 'center',
    maxWidth: 260,
  },
});
