import React, {useCallback, useState} from 'react';
import {Pressable, Share, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BackgroundScreen} from '../components/BackgroundScreen';
import {GlassCard} from '../components/GlassCard';
import {PrimaryButton} from '../components/PrimaryButton';
import {findCharacter, findStory} from '../data/stories';
import {StoriesStackParamList} from '../navigation/types';
import {getSavedStories, toggleSavedStory} from '../storage/persistence';
import {colors} from '../theme/theme';

type Props = NativeStackScreenProps<StoriesStackParamList, 'StoryDetail'>;

export function StoryDetailScreen({navigation, route}: Props) {
  const story = findStory(route.params.storyId);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      getSavedStories().then(ids => {
        if (active) {
          setSavedIds(ids);
        }
      });

      return () => {
        active = false;
      };
    }, []),
  );

  if (!story) {
    return (
      <BackgroundScreen withTabPadding>
        <Text style={styles.screenTitle}>Stories</Text>
        <GlassCard style={styles.article}>
          <Text style={styles.paragraph}>Story not found.</Text>
        </GlassCard>
      </BackgroundScreen>
    );
  }

  const author = findCharacter(story.authorId);
  const saved = savedIds.includes(story.id);

  const toggleSave = async () => {
    const next = await toggleSavedStory(story.id);
    setSavedIds(next);
  };

  const shareStory = () => {
    Share.share({
      title: story.title,
      message: `${story.title}\n\n${story.paragraphs.join('\n\n')}`,
    });
  };

  return (
    <BackgroundScreen withTabPadding>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>
        <Text style={styles.screenTitle}>Stories</Text>
        <View style={styles.authorPill}>
          <Text style={styles.authorPillText}>{author.name}</Text>
        </View>
      </View>

      <GlassCard style={styles.article}>
        <Text style={styles.title}>{story.title}</Text>
        {story.paragraphs.map((paragraph, index) => (
          <Text key={`${story.id}-${index}`} style={styles.paragraph}>
            {paragraph}
          </Text>
        ))}

        <View style={styles.actions}>
          <PrimaryButton
            title={saved ? 'Remove' : 'Save'}
            onPress={toggleSave}
            variant="outline"
            style={styles.actionButton}
          />
          <PrimaryButton
            title="Share"
            onPress={shareStory}
            variant="green"
            style={styles.actionButton}
          />
        </View>
      </GlassCard>
    </BackgroundScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 34,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backButton: {
    width: 28,
    height: 34,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backText: {
    color: colors.white,
    fontSize: 32,
    lineHeight: 34,
  },
  screenTitle: {
    color: colors.cream,
    fontSize: 24,
    fontWeight: '900',
    flex: 1,
  },
  authorPill: {
    maxWidth: 112,
    minHeight: 27,
    borderRadius: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gold,
    borderWidth: 1,
    borderColor: 'rgba(255, 245, 152, 0.55)',
  },
  authorPillText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '900',
  },
  article: {
    padding: 16,
  },
  title: {
    color: colors.cream,
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 12,
  },
  paragraph: {
    color: colors.mutedCream,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700',
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    minHeight: 44,
  },
});
