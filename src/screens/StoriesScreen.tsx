import React, {useCallback, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {images} from '../assets';
import {BackgroundScreen} from '../components/BackgroundScreen';
import {GlassCard} from '../components/GlassCard';
import {SegmentControl} from '../components/SegmentControl';
import {CharacterId, characters, findCharacter, stories, Story} from '../data/stories';
import {StoriesStackParamList} from '../navigation/types';
import {getSavedStories} from '../storage/persistence';
import {useResponsive} from '../theme/responsive';
import {colors} from '../theme/theme';

type Mode = 'all' | 'saved';

export function StoriesScreen() {
  const responsive = useResponsive();
  const navigation =
    useNavigation<NativeStackNavigationProp<StoriesStackParamList>>();
  const [mode, setMode] = useState<Mode>('all');
  const [character, setCharacter] = useState<CharacterId>('nate');
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

  const profile = findCharacter(character);
  const visibleStories =
    mode === 'saved'
      ? stories.filter(story => savedIds.includes(story.id))
      : stories.filter(story => story.authorId === character);

  const openStory = (storyId: string) => {
    navigation.navigate('StoryDetail', {storyId});
  };

  return (
    <BackgroundScreen withTabPadding>
      <Text
        style={[styles.screenTitle, responsive.compact && styles.screenTitleCompact]}>
        Stories
      </Text>

      <SegmentControl<Mode>
        options={[
          {label: 'All stories', value: 'all'},
          {label: 'Saved', value: 'saved'},
        ]}
        value={mode}
        onChange={setMode}
      />

      {mode === 'all' && (
        <>
          <SegmentControl<CharacterId>
            options={characters.map(item => ({
              label: item.shortName,
              value: item.id,
            }))}
            value={character}
            onChange={setCharacter}
          />

          <GlassCard
            style={[
              styles.profileCard,
              responsive.compact && styles.profileCardCompact,
            ]}>
            <Image
              source={profile.avatar}
              resizeMode="contain"
              style={[
                styles.profileImage,
                responsive.compact && styles.profileImageCompact,
              ]}
            />
            <View style={styles.profileText}>
              <Text style={styles.profileName}>{profile.name}</Text>
              <Text style={styles.profileDescription}>{profile.description}</Text>
            </View>
          </GlassCard>
        </>
      )}

      {visibleStories.length === 0 ? (
        <View style={styles.emptyState}>
          <Image
            source={images.onboardingBookmark}
            resizeMode="contain"
            style={styles.emptyImage}
          />
          <Text style={styles.emptyText}>
            No saved stories yet. Tap save on any story to add it here.
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {visibleStories.map(story => (
            <StoryCard key={story.id} story={story} onPress={openStory} />
          ))}
        </View>
      )}
    </BackgroundScreen>
  );
}

function StoryCard({
  story,
  onPress,
}: {
  story: Story;
  onPress: (storyId: string) => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress(story.id)}
      style={({pressed}) => [styles.storyCardPress, pressed && styles.pressed]}>
      <GlassCard style={styles.storyCard}>
        <View style={styles.storyCopy}>
          <Text style={styles.storyTitle}>{story.title}</Text>
          <Text style={styles.storySummary}>{story.summary}</Text>
        </View>
        <View style={styles.arrow}>
          <Text style={styles.arrowText}>›</Text>
        </View>
      </GlassCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screenTitle: {
    color: colors.cream,
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 12,
  },
  screenTitleCompact: {
    fontSize: 22,
    marginBottom: 10,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 132,
    paddingHorizontal: 14,
    marginTop: 12,
    marginBottom: 12,
  },
  profileCardCompact: {
    minHeight: 112,
    paddingHorizontal: 12,
    marginTop: 10,
    marginBottom: 10,
  },
  profileImage: {
    width: 88,
    height: 118,
    marginRight: 12,
  },
  profileImageCompact: {
    width: 72,
    height: 100,
  },
  profileText: {
    flex: 1,
  },
  profileName: {
    color: colors.cream,
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 8,
  },
  profileDescription: {
    color: colors.mutedCream,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
  },
  list: {
    gap: 12,
    marginTop: 12,
  },
  storyCardPress: {
    borderRadius: 8,
  },
  storyCard: {
    minHeight: 78,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  storyCopy: {
    flex: 1,
    paddingRight: 12,
  },
  storyTitle: {
    color: colors.cream,
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 6,
  },
  storySummary: {
    color: colors.mutedCream,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '700',
  },
  arrow: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.orangeDark,
  },
  arrowText: {
    color: colors.white,
    fontSize: 26,
    lineHeight: 28,
    fontWeight: '900',
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
  pressed: {
    opacity: 0.82,
  },
});
