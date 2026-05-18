import {ImageSourcePropType} from 'react-native';
import {images} from '../assets';

export type CharacterId = 'nate' | 'leo' | 'kyle';

export type Character = {
  id: CharacterId;
  name: string;
  shortName: string;
  description: string;
  avatar: ImageSourcePropType;
};

export type Story = {
  id: string;
  authorId: CharacterId;
  title: string;
  summary: string;
  paragraphs: string[];
};

export const characters: Character[] = [
  {
    id: 'nate',
    name: 'Nate Flynn',
    shortName: 'Nate',
    description: "Hey, I'm Nate. If you're looking for calm stories with a bit of mystery - you're in the right place.",
    avatar: images.characterNate,
  },
  {
    id: 'leo',
    name: 'Leo Drake',
    shortName: 'Leo',
    description:
      'Hey, Leo here. My stories are a bit more lively - full of movement, moments, and unexpected turns.',
    avatar: images.characterLeo,
  },
  {
    id: 'kyle',
    name: 'Kyle Reeves',
    shortName: 'Kyle',
    description: "Hi, I'm Kyle. I notice details others usually miss. If you like stories that make you think - you'll find something interesting here.",
    avatar: images.characterKyle,
  },
];

export const stories: Story[] = [
  {
    id: 'nate-1',
    authorId: 'nate',
    title: 'The Shadow of an Old Lighthouse',
    summary: 'A silent tower, cold stone marks, and tracks that end in nothing.',
    paragraphs: [
      "I didn't immediately realize that this place was wrong. Lighthouses should shine, even when there's a storm or thick fog around. But this one was dark. We saw it from afar - tall, stony, silent. Leo immediately said it was a good idea to check it out. I didn't argue, but something inside told me: it's better not to climb here.",
      'When we got closer, the door was ajar. No traces of a struggle, no noise. Just silence, which was more oppressive than any scream. Inside, it smelled of old wood and sea salt. The stairs led up, but each step was too loud, as if someone was listening.',
      'Halfway through, I noticed strange scratches on the wall. Not random - as if someone was trying to mark something. A course? A warning? I ran my hand over it - the stone was cold, almost wet. Leo was already higher and yelling for me not to slow down.',
      'When we reached the top, there was no lamp. Just an old metal frame and windows through which a weak light came in. But the worst thing was the tracks. They led in circles. And ended... in nothing.',
      "That was the first time I thought: sometimes places disappear for a reason. And sometimes it's better not to ask why.",
    ],
  },
  {
    id: 'nate-2',
    authorId: 'nate',
    title: 'Map without north',
    summary: 'A yellowed map shows no direction, only a path that must be felt.',
    paragraphs: [
      'We found the map by accident. It was hidden between the pages of an old magazine that no one had read for years. It looked ordinary - yellowed paper, lines, marks. But there was one but: it did not have north on it.',
      'I turned it over several times, trying to figure out how to read it. Leo said it was just an old joke. But I could see that the dots on the map were not random. They formed a route - just not an ordinary one.',
      'We decided to check. We went out to sea, guided not by the compass, but by the map itself. Every turn seemed illogical. We were moving as if against common sense. But the further we went, the more the map fit reality.',
      'On the third day, we noticed an island that was not on any other map. Small, rocky, with strange rocks. When we stepped ashore, I realized: the map does not show the direction. It shows the path that you have to feel.',
      "And that's when the compass finally broke.",
      'I kept the map for myself. Not in order to go that way again. But to remember: not everything that is illogical is a mistake.',
    ],
  },
  {
    id: 'nate-3',
    authorId: 'nate',
    title: 'Voices under water',
    summary: 'A reef whispers at night, and one dive changes the whole crew.',
    paragraphs: [
      'The sea sometimes speaks. But not with words.',
      'We were anchored near an old reef when we first heard it. At first it seemed like it was just the sound of the waves. Then it seemed like someone was whispering. Leo laughed, said it was fatigue. I did not answer.',
      'At night the sound became clearer. Like voices. Incomprehensible, but persistent. They seemed to be calling down. One of the guys could not stand it anymore - he took a flashlight and dove in. We waited. A minute. Two. Five.',
      "He didn't come back.",
      'I looked into the water and realized: there was something there. But not something you could see. Something that did not want to be found. We dropped anchor right away. No talking.',
      'When we sailed away, the voices disappeared.',
      "Since then I've learned to listen to the sea more carefully. And sometimes not to listen at all.",
    ],
  },
  {
    id: 'nate-4',
    authorId: 'nate',
    title: 'The Island That Leaves No Trace',
    summary: 'The sand is clean, the water is calm, and every footprint vanishes.',
    paragraphs: [
      'This island was perfect. Too perfect.',
      'The sand is clean. The water is calm. No traces of people. We landed without hesitation. Leo immediately ran forward, as always. I was a little behind.',
      'The first thing I noticed was a strange thing: our tracks were disappearing. We were walking - and they just disappeared behind. As if they had never been there.',
      "I told the others about it. They didn't believe me right away. But when they checked - it was quiet. Very quiet.",
      'We decided to return to the boat. But the shore looked different. Not changed - just... different. As if we were looking in the wrong place.',
      'It took me a few minutes to find the right direction. And even longer - to convince the others to follow me.',
      'We got out. But when we looked back - the island was gone.',
      "I don't know what it was. But I know one thing: not all places want to be remembered.",
    ],
  },
  {
    id: 'nate-5',
    authorId: 'nate',
    title: 'Old key',
    summary: 'A rusty key opens more than locks, and not every door is worth knowing.',
    paragraphs: [
      'The key looked ordinary. Small, iron, a little rusty. I found it in the pocket of an old jacket that we picked up on an abandoned ship.',
      'At first I did not pay attention. But then I noticed: there were scratches on it. Not random - as if someone was constantly turning it in their hands.',
      'I carried it with me for several days. Just like that. Until I started to notice strange things. Doors that had previously been closed now opened. The locks seemed to give way.',
      'Once I found an old chest. Without a lock. But when I brought up the key - it came. And the chest opened.',
      'There was nothing inside.',
      "And then I realized: it's not about the key. It's about what it opens.",
      'I still carry it with me. But I rarely use it. Because sometimes it is better not to know what is behind the door.',
    ],
  },
  {
    id: 'leo-1',
    authorId: 'leo',
    title: 'Rushing into a storm',
    summary: 'A narrow passage between rocks turns fear into forward motion.',
    paragraphs: [
      "To be honest, I didn't plan on getting into that storm. But when you're already at sea and the wind suddenly changes direction, there's not much choice. Nate was shouting that we had to go around, but I saw something else: a narrow passage between the rocks, which could shorten the journey by almost a day.",
      'Yes, it looked like suicide. The waves were beating against the sides, the water was already overflowing over the edge, but the ship was holding on. I stood at the helm and did not think - I just felt where it was pulling me.',
      'The rocks appeared and disappeared in the fog like ghosts. Every turn was on the verge. Once we were thrown so hard that I was already sure: that is it. But the ship turned around, as if it knew this path better than me.',
      'When we broke out of that chaos, it became quiet. No wind, no waves. Just a flat sea and a clear sky.',
      "Nate said then that we were just lucky. I didn't argue. But deep down I knew it was not about luck. It was about the moment when you stop being afraid and just go forward.",
      "Sometimes that's enough.",
    ],
  },
  {
    id: 'leo-2',
    authorId: 'leo',
    title: "A chest that shouldn't have been opened",
    summary: 'A perfect chest in a ruined hold carries a story that refuses to end.',
    paragraphs: [
      'We found it at the bottom of the hold of an old ship. All the planks were rotten, everything was falling apart, but this chest was intact. It looked like no one had touched it for years.',
      'Of course, I opened it first.',
      'There was no gold inside. And that was already suspicious. Just some small things: a compass, a few coins, a piece of cloth and a small wooden figurine.',
      "Nate immediately said to close it and leave it alone. But you know how it works - if you open it, it's already interesting.",
      'We took our things. And everything was fine... the first day.',
      'Then the compass started spinning by itself. Without stopping. It was like something was searching. At night I heard footsteps in the hold. But when I went down, there was no one there.',
      'On the third day, one of the guys just disappeared. Without a trace.',
      'We put everything back. In the chest. We closed it. And left that ship.',
      "I don't like to leave things unfinished. But sometimes the smartest thing is not to finish the story.",
    ],
  },
  {
    id: 'leo-3',
    authorId: 'leo',
    title: 'Shadow Race',
    summary: 'A dark ship keeps distance perfectly until the channel forces a choice.',
    paragraphs: [
      'I always thought that the fastest in the team was me. Until that day.',
      'We were sailing along the coast when we noticed another ship. Dark, quiet, without a flag. It was not moving - but as we got closer, it started to go parallel.',
      'I gave it more speed. He did too.',
      'I changed course. He seemed to know where I was going to turn.',
      'It was not funny anymore. It was strange.',
      "We tried to break away for several hours. But he didn't lag behind. And he didn't come any closer. He just kept his distance.",
      'When the sun started to set, I decided to take a chance. A sharp turn into a narrow channel between the rocks. There you either pass or that is it.',
      'We passed.',
      'I looked back and the ship was gone.',
      "As if it didn't exist.",
      "Since then, I'm no longer sure that speed is always an advantage. Sometimes it's just a way to escape from something that will catch up with you anyway.",
    ],
  },
  {
    id: 'leo-4',
    authorId: 'leo',
    title: 'A night without wind',
    summary: 'A mirror-still sea hides a shadow too large to explain.',
    paragraphs: [
      'There are nights when the sea is still. Completely. Not a wave, not a sound. And that is... wrong.',
      'We hung in the middle of the water. The wind had disappeared. The sails were like dead. No one spoke, because even words sounded superfluous.',
      'I decided to check what was around. I got into a small boat and sailed a little further. Just to see if it was just our imagination.',
      'The water was like a mirror. I could see the ship behind me, as clear as day.',
      'And then I saw something else.',
      'Under the water.',
      'A shadow. Big. Too big.',
      'It did not move. It was just there.',
      'I came back faster than I had planned. I did not say anything. I just ordered the oars to be raised and moved.',
      'When the wind came, for the first time I was glad of its noise.',
      'Because silence is not always peace.',
    ],
  },
  {
    id: 'leo-5',
    authorId: 'leo',
    title: 'The Edge of the Map',
    summary: 'The sea continues where the map ends, but the horizon does not fit.',
    paragraphs: [
      "I've always wanted to get to the place where the map ends. Just to see what's there.",
      'And one day we did.',
      'The map just ended. No explanation. No markings.',
      "But the sea didn't end.",
      'We kept sailing. And the water began to change. The color, the movement, even the sound. It was like it was not the same sea anymore.',
      "Nate said to turn back. But I couldn't. Not after I'd gone this far.",
      'And then I saw the horizon.',
      'It was... wrong. Like it was broken. Like the world did not fit together there.',
      "I stood there and stared until I realized that some things weren't meant to be seen.",
      'We turned around.',
      "I don't regret getting there. But now I know that not everything that can be found has to be sought.",
    ],
  },
  {
    id: 'kyle-1',
    authorId: 'kyle',
    title: 'Course Accuracy',
    summary: 'A compass drift of a few degrees saves the ship from hidden wreckage.',
    paragraphs: [
      "I don't trust intuition when there's a calculation. The sea may seem calm, but there's always something under the surface - currents, depth, pressure changes. That day, everything looked perfect. Too perfect.",
      "We'd been sailing a steady course for hours. Nate hadn't said anything, Leo was relaxed. But the compass had begun to drift. Just a little. A few degrees.",
      'A trifle, you might say. But at a distance, it means an error of a mile.',
      'I checked again. Then again. The drift repeated. I changed course - and it disappeared. I turned back - and it reappeared.',
      'Then I realized: it was not the compass.',
      'We were sailing over something. Something that affected our direction.',
      'I forced the change of course, even though it took longer. Leo grumbled, but agreed.',
      'A few hours later, we saw the wreckage of the ship. They were floating where we were supposed to go.',
      "Sometimes the right decision is not what seems faster. It's what keeps you alive.",
    ],
  },
  {
    id: 'kyle-2',
    authorId: 'kyle',
    title: 'The closed door',
    summary: 'A cabin door has no lock, but everything about it says wait.',
    paragraphs: [
      'That ship was too clean. It was like it had been left yesterday. But the dust lay in an even layer, like evidence of time.',
      'I walked slowly. Every sound mattered. The boards creaked, but evenly. Nothing random.',
      'We found a cabin with a closed door. No lock. Just closed.',
      'Leo wanted to open it right away. I stopped him.',
      "An open door is a signal. Either they were not closed. Or they didn't want to be opened.",
      'I checked the hinges. Fresh scratches. So they had been opened. Recently.',
      'We entered carefully.',
      'Nothing special inside. A table, a chair, a map. But the air was different. Frozen.',
      'I walked over to the map. It was hand-drawn. And the route ended right there.',
      "I didn't say anything. I just walked out and closed the door behind me.",
      "Some places aren't about what's inside. It's about what's left there.",
    ],
  },
  {
    id: 'kyle-3',
    authorId: 'kyle',
    title: 'Repetition',
    summary: 'Eight steps in the night repeat until the pattern breaks.',
    paragraphs: [
      "I don't like things to repeat themselves for no reason.",
      "We were at anchor for the second night. And every time at three o'clock I heard the same sound. Footsteps. Even. Clear.",
      'I checked the deck. No one.',
      'The next night I stayed up waiting. And I heard them again. The same footsteps. In the same rhythm.',
      'I counted. Eight steps. Pause. Eight steps.',
      'I followed the sound. It led into the hold.',
      'When I got down, the sound was gone.',
      'But there were footprints on the floor. Eight.',
      'I checked everything. Nothing.',
      "On the third night, the sound didn't come back.",
      'This is the worst. When something changes without explanation.',
      "I don't like mysteries without structure. But sometimes they stick.",
    ],
  },
  {
    id: 'kyle-4',
    authorId: 'kyle',
    title: 'Horizon Line',
    summary: 'A tilted horizon proves that the course is not the problem.',
    paragraphs: [
      "The horizon is always flat. That's the rule. If it looks different, it's not the eyes that are the problem.",
      'We were going straight when I noticed the deviation. The line was slightly tilted. Almost imperceptibly.',
      "I didn't say anything right away. I just watched.",
      'An hour later, the tilt increased.',
      'I checked everything: course, wind, ship position. Everything was correct.',
      'So something else was wrong.',
      "I ordered a change of direction. Leo didn't understand why. But he trusted me.",
      'When we had gone far enough, the horizon became flat again.',
      'I turned and looked back.',
      "Where we were, the air seemed to be warping. It's like the space there is not quite right.",
      "I'm not trying to explain it.",
      "It's enough for me to know that sometimes the right path is the one that leads further away.",
    ],
  },
  {
    id: 'kyle-5',
    authorId: 'kyle',
    title: 'No signal',
    summary: 'A blocked radio frequency carries only one instruction: do not answer.',
    paragraphs: [
      'The radio has been silent for a day. This is not normal.',
      'I checked all the equipment. It worked. But the signal was not coming through.',
      'That means one thing: something is blocking it.',
      'I started checking the frequencies. One by one. And on one I heard a noise.',
      'Not a voice. Not words. Just a repetition.',
      'I recorded it. I listened to it several times.',
      'It was not a random sound. It was a signal. Encoded.',
      'I deciphered part of it.',
      '"Don\'t answer."',
      'I turned off the radio.',
      'Leo wanted to try again. I told him not to.',
      "Sometimes the problem isn't that you can't get through.",
      "It's that someone can answer.",
    ],
  },
];

export const findStory = (id: string) =>
  stories.find(story => story.id === id);

export const findCharacter = (id: CharacterId) =>
  characters.find(character => character.id === id) ?? characters[0];
