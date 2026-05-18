export type HintWord = {
  answer: string;
  hints: string[];
};

export type MissingLetterItem = {
  word: string;
  missingIndex: number;
  choices: string[];
};

export type Riddle = {
  question: string;
  options: string[];
  answerIndex: number;
};

export type ExtraWordItem = {
  title: string;
  words: string[];
  oddIndex: number;
};

export const hintWords: HintWord[] = [
  {answer: 'compass', hints: ['shows direction', 'has a needle', 'used at sea']},
  {answer: 'map', hints: ['paper with marks', 'helps you find a way', 'often old']},
  {answer: 'anchor', hints: ['drops into water', 'holds a ship', 'made of metal']},
  {answer: 'ocean', hints: ['large and deep', 'salty', 'has waves']},
  {answer: 'star', hints: ['visible at night', 'far away', 'shines']},
  {answer: 'path', hints: ['leads forward', 'has no shape', 'can be lost']},
  {answer: 'sail', hints: ['made of fabric', 'catches wind', 'used on ships']},
  {answer: 'island', hints: ['surrounded by water', 'you can land on it', 'sometimes empty']},
  {answer: 'chest', hints: ['closed box', 'hides things', 'often searched for']},
  {answer: 'horizon', hints: ['always ahead', 'impossible to reach', 'where sky meets sea']},
  {answer: 'wheel', hints: ['round', 'held by hands', 'controls direction']},
  {answer: 'wind', hints: ['invisible', 'moves sails', 'can be strong']},
  {answer: 'current', hints: ['water movement', 'pulls sideways', 'not always visible']},
  {answer: 'logbook', hints: ['has pages', 'used for writing', 'stores stories']},
  {answer: 'lighthouse', hints: ['shines from shore', 'tall structure', 'helps at night']},
  {answer: 'noise', hints: ['can be heard', 'no words', 'can be loud']},
  {answer: 'cabin', hints: ['part of a ship', 'inside space', 'used for living']},
  {answer: 'sand', hints: ['under your feet', 'soft and loose', 'found on shore']},
  {answer: 'ship', hints: ['moves on water', 'large', 'carries people']},
  {answer: 'key', hints: ['small', 'made of metal', 'opens things']},
];

export const missingLetters: MissingLetterItem[] = [
  {word: 'compass', missingIndex: 4, choices: ['O', 'A', 'E', 'U', 'I']},
  {word: 'map', missingIndex: 2, choices: ['P', 'T', 'S', 'R', 'L']},
  {word: 'anchor', missingIndex: 4, choices: ['O', 'I', 'E', 'U', 'A']},
  {word: 'ocean', missingIndex: 4, choices: ['N', 'R', 'T', 'L', 'S']},
  {word: 'star', missingIndex: 3, choices: ['R', 'N', 'L', 'T', 'D']},
  {word: 'path', missingIndex: 3, choices: ['H', 'T', 'S', 'N', 'R']},
  {word: 'sail', missingIndex: 3, choices: ['L', 'R', 'N', 'T', 'D']},
  {word: 'island', missingIndex: 4, choices: ['N', 'R', 'L', 'T', 'S']},
  {word: 'chest', missingIndex: 4, choices: ['T', 'D', 'R', 'L', 'N']},
  {word: 'horizon', missingIndex: 4, choices: ['Z', 'S', 'C', 'X', 'R']},
  {word: 'wheel', missingIndex: 4, choices: ['L', 'R', 'T', 'N', 'S']},
  {word: 'wind', missingIndex: 3, choices: ['D', 'T', 'R', 'L', 'S']},
  {word: 'current', missingIndex: 6, choices: ['T', 'D', 'R', 'N', 'S']},
  {word: 'logbook', missingIndex: 5, choices: ['O', 'A', 'E', 'U', 'I']},
  {word: 'lighthouse', missingIndex: 7, choices: ['U', 'O', 'A', 'I', 'E']},
  {word: 'noise', missingIndex: 4, choices: ['E', 'A', 'O', 'I', 'U']},
  {word: 'cabin', missingIndex: 4, choices: ['N', 'R', 'L', 'T', 'S']},
  {word: 'sand', missingIndex: 3, choices: ['D', 'T', 'R', 'L', 'S']},
  {word: 'ship', missingIndex: 3, choices: ['P', 'T', 'R', 'L', 'N']},
  {word: 'key', missingIndex: 2, choices: ['Y', 'S', 'T', 'R', 'L']},
];

export const riddles: Riddle[] = [
  {question: 'I always point the way, even when everything around you is lost. I never speak, but many trust me to find their path.', options: ['map', 'compass', 'wind', 'road'], answerIndex: 1},
  {question: 'I fall into the water but help you stay in one place. Without me, a ship can drift far away.', options: ['rope', 'sail', 'anchor', 'mast'], answerIndex: 2},
  {question: 'I am vast and deep, and I can be calm or dangerous. Many travel across me, but few truly understand me.', options: ['river', 'ocean', 'lake', 'cloud'], answerIndex: 1},
  {question: 'You can see me at night shining from far away. Sailors once used me to guide their journeys across the sea.', options: ['moon', 'star', 'fire', 'lamp'], answerIndex: 1},
  {question: 'I am made of fabric, but I can move something much bigger than myself. When the wind touches me, I come alive.', options: ['rope', 'sail', 'flag', 'net'], answerIndex: 1},
  {question: 'I am land, but water surrounds me from every side. Some are full of life, while others are empty and silent.', options: ['beach', 'island', 'port', 'cliff'], answerIndex: 1},
  {question: 'I stay closed most of the time, hiding something valuable inside. Many search for me, hoping to find what I protect.', options: ['bag', 'chest', 'box', 'barrel'], answerIndex: 1},
  {question: 'You can always see me ahead, but you can never reach me. I exist where the sky and sea seem to meet.', options: ['path', 'horizon', 'cloud', 'wind'], answerIndex: 1},
  {question: 'I stand tall near the shore and shine when it is dark. I help travelers find their way safely home.', options: ['tower', 'lighthouse', 'fire', 'beacon'], answerIndex: 1},
  {question: 'You cannot see me, but you can feel my power. I move sails, waves, and sometimes entire storms.', options: ['current', 'wind', 'shadow', 'light'], answerIndex: 1},
  {question: 'I rise and fall again and again, never staying still. I can be gentle or strong, depending on the sea.', options: ['rope', 'wave', 'mast', 'deck'], answerIndex: 1},
  {question: 'I carry people and goods across the water. Without me, long sea journeys would be impossible.', options: ['raft', 'ship', 'bridge', 'island'], answerIndex: 1},
  {question: 'I hold stories, but I do not speak them aloud. My pages remember things long after they happen.', options: ['map', 'journal', 'note', 'sign'], answerIndex: 1},
  {question: 'The more of me there is, the less you can see. I cover everything and make the world unclear.', options: ['night', 'fog', 'rain', 'smoke'], answerIndex: 1},
  {question: 'I move through water, pulling things quietly in one direction. You may not notice me, but I can change your path.', options: ['wave', 'current', 'wind', 'tide'], answerIndex: 1},
  {question: 'I am strong and often tied, but I am not alive. I help connect and hold things together.', options: ['chain', 'rope', 'anchor', 'hook'], answerIndex: 1},
  {question: 'I can open something important, but I am small and easy to lose. Without me, some things stay locked forever.', options: ['lock', 'key', 'map', 'chest'], answerIndex: 1},
  {question: 'I shine without heat and guide those who look up. I am always there, even when you cannot see me.', options: ['moon', 'star', 'fire', 'light'], answerIndex: 1},
  {question: 'I am hidden below and often dark and quiet. Many things are stored inside me during long journeys.', options: ['cabin', 'hold', 'deck', 'hull'], answerIndex: 1},
  {question: 'I show you where to go without speaking a word. If you know how to read me, you will never be truly lost.', options: ['sign', 'map', 'star', 'path'], answerIndex: 1},
  {question: 'I am stretched above the deck and catch the wind before the ship begins to move.', options: ['sail', 'anchor', 'stone', 'coin'], answerIndex: 0},
  {question: 'I am a written record of a voyage. Captains keep me so days at sea are not forgotten.', options: ['logbook', 'bucket', 'lantern', 'rope'], answerIndex: 0},
  {question: 'I am the tall wooden pole that holds the sails high above the deck.', options: ['mast', 'chest', 'reef', 'sand'], answerIndex: 0},
  {question: 'I am the room where sailors sleep, plan, or hide from a storm.', options: ['cabin', 'cloud', 'beach', 'hook'], answerIndex: 0},
  {question: 'I am the flat place on a ship where the crew walks and works.', options: ['deck', 'cave', 'hill', 'forest'], answerIndex: 0},
  {question: 'I am a wall of rock near the sea, dangerous when waves push a ship too close.', options: ['cliff', 'blanket', 'candle', 'basket'], answerIndex: 0},
  {question: 'I am a shallow line of rock below the water, hard to notice until it is too late.', options: ['reef', 'road', 'room', 'bell'], answerIndex: 0},
  {question: 'I am a place where ships rest near land and sailors can return safely.', options: ['port', 'valley', 'roof', 'garden'], answerIndex: 0},
  {question: 'I am the part of a ship that touches the water and keeps everything afloat.', options: ['hull', 'ladder', 'window', 'bridge'], answerIndex: 0},
  {question: 'I am a small boat used when the main ship cannot reach the shore.', options: ['dinghy', 'helmet', 'mirror', 'ladle'], answerIndex: 0},
  {question: 'I am a sign raised high so others can recognize a ship from far away.', options: ['flag', 'spoon', 'chair', 'stone'], answerIndex: 0},
  {question: 'I am a place of broken waves and white foam when the sea hits hidden rocks.', options: ['surf', 'dust', 'paper', 'field'], answerIndex: 0},
  {question: 'I am the path a ship follows across the water, even when no line is drawn.', options: ['course', 'pocket', 'circle', 'pillow'], answerIndex: 0},
  {question: 'I am a tool with a glass face that helps sailors see far things closer.', options: ['spyglass', 'hammer', 'needle', 'drum'], answerIndex: 0},
  {question: 'I am the heavy chain or rope that connects the ship to its anchor.', options: ['cable', 'feather', 'button', 'branch'], answerIndex: 0},
  {question: 'I am a sudden strong wind that can change a calm voyage into danger.', options: ['gust', 'coin', 'door', 'brush'], answerIndex: 0},
  {question: 'I am water that rises and falls because the moon pulls at the sea.', options: ['tide', 'flame', 'dust', 'wall'], answerIndex: 0},
  {question: 'I am a narrow water path between two pieces of land.', options: ['channel', 'chimney', 'market', 'pencil'], answerIndex: 0},
  {question: 'I am a safe place in rough weather where a ship can wait near shore.', options: ['harbor', 'ladder', 'garden', 'tower'], answerIndex: 0},
  {question: 'I am a bright tool carried at night when the deck becomes too dark.', options: ['lantern', 'basket', 'blanket', 'helmet'], answerIndex: 0},
  {question: 'I am a mark on a map that warns sailors about danger in the water.', options: ['symbol', 'pillow', 'apple', 'fork'], answerIndex: 0},
  {question: 'I am the front part of a ship, first to cut through waves.', options: ['bow', 'shoe', 'bell', 'gate'], answerIndex: 0},
  {question: 'I am the back part of a ship where the wake trails behind.', options: ['stern', 'crown', 'shell', 'desk'], answerIndex: 0},
  {question: 'I am a round window in a ship cabin, made to face the sea.', options: ['porthole', 'notebook', 'pocket', 'handle'], answerIndex: 0},
  {question: 'I am a hidden place where treasure or supplies can be kept away from sight.', options: ['stash', 'flower', 'ladder', 'plate'], answerIndex: 0},
  {question: 'I am a dangerous place where ships break apart and leave wood floating behind.', options: ['wreck', 'stable', 'kitchen', 'corner'], answerIndex: 0},
  {question: 'I am the foam line a moving ship leaves in the water behind it.', options: ['wake', 'leaf', 'shadow', 'stone'], answerIndex: 0},
  {question: 'I am a command to turn the ship away from danger before it is too late.', options: ['veer', 'sleep', 'fold', 'paint'], answerIndex: 0},
  {question: 'I am the careful skill of guiding a ship by stars, maps, and instruments.', options: ['navigation', 'painting', 'cooking', 'running'], answerIndex: 0},
  {question: 'I am the place where a crew works together to control ropes and sails.', options: ['rigging', 'library', 'cupboard', 'garden'], answerIndex: 0},
];

export const extraWords: ExtraWordItem[] = [
  {title: 'Sea tools', words: ['anchor', 'compass', 'sail', 'pencil'], oddIndex: 3},
  {title: 'Things in the sky', words: ['star', 'moon', 'cloud', 'chest'], oddIndex: 3},
  {title: 'Ship parts', words: ['deck', 'mast', 'cabin', 'forest'], oddIndex: 3},
  {title: 'Water words', words: ['wave', 'current', 'ocean', 'candle'], oddIndex: 3},
  {title: 'Navigation', words: ['map', 'path', 'compass', 'apple'], oddIndex: 3},
  {title: 'Hidden objects', words: ['key', 'chest', 'lock', 'sunset'], oddIndex: 3},
  {title: 'Shore places', words: ['island', 'beach', 'lighthouse', 'blanket'], oddIndex: 3},
  {title: 'Storm signs', words: ['fog', 'wind', 'rain', 'journal'], oddIndex: 3},
  {title: 'Ship movement', words: ['sail', 'drift', 'turn', 'pillow'], oddIndex: 3},
  {title: 'Map details', words: ['route', 'mark', 'line', 'hammer'], oddIndex: 3},
  {title: 'Night guides', words: ['star', 'moon', 'lantern', 'barrel'], oddIndex: 3},
  {title: 'Sea danger', words: ['reef', 'storm', 'rocks', 'button'], oddIndex: 3},
  {title: 'Storage', words: ['hold', 'chest', 'cabin', 'cloud'], oddIndex: 3},
  {title: 'Metal items', words: ['key', 'anchor', 'chain', 'paper'], oddIndex: 3},
  {title: 'Soft shore', words: ['sand', 'beach', 'shore', 'needle'], oddIndex: 3},
  {title: 'Ship places', words: ['deck', 'hold', 'cabin', 'garden'], oddIndex: 3},
  {title: 'Weather', words: ['fog', 'rain', 'wind', 'coin'], oddIndex: 3},
  {title: 'Directions', words: ['north', 'east', 'west', 'rope'], oddIndex: 3},
  {title: 'Writing', words: ['journal', 'logbook', 'note', 'mast'], oddIndex: 3},
  {title: 'Open and close', words: ['key', 'lock', 'door', 'wave'], oddIndex: 3},
  {title: 'Sea surface', words: ['wave', 'foam', 'wake', 'chair'], oddIndex: 3},
  {title: 'Ship shapes', words: ['bow', 'stern', 'hull', 'flower'], oddIndex: 3},
  {title: 'Light', words: ['lamp', 'beacon', 'star', 'sand'], oddIndex: 3},
  {title: 'Tools', words: ['rope', 'hook', 'knife', 'cloud'], oddIndex: 3},
  {title: 'Travel', words: ['ship', 'boat', 'raft', 'mirror'], oddIndex: 3},
  {title: 'Treasure signs', words: ['gold', 'coin', 'gem', 'rain'], oddIndex: 3},
  {title: 'Quiet places', words: ['cave', 'cabin', 'hold', 'sail'], oddIndex: 3},
  {title: 'Sounds', words: ['noise', 'whisper', 'echo', 'anchor'], oddIndex: 3},
  {title: 'Harbor words', words: ['port', 'dock', 'pier', 'star'], oddIndex: 3},
  {title: 'Water paths', words: ['course', 'channel', 'current', 'book'], oddIndex: 3},
  {title: 'Tall things', words: ['mast', 'tower', 'cliff', 'coin'], oddIndex: 3},
  {title: 'Round things', words: ['wheel', 'coin', 'compass', 'path'], oddIndex: 3},
  {title: 'Old things', words: ['map', 'key', 'scroll', 'storm'], oddIndex: 3},
  {title: 'Crew work', words: ['steer', 'row', 'tie', 'sleep'], oddIndex: 3},
  {title: 'Found below', words: ['hold', 'reef', 'wreck', 'star'], oddIndex: 3},
  {title: 'Seen ahead', words: ['horizon', 'path', 'shore', 'chest'], oddIndex: 3},
  {title: 'Bad weather', words: ['storm', 'fog', 'gust', 'paper'], oddIndex: 3},
  {title: 'Navigation tools', words: ['map', 'compass', 'spyglass', 'barrel'], oddIndex: 3},
  {title: 'Ship materials', words: ['wood', 'rope', 'cloth', 'moon'], oddIndex: 3},
  {title: 'Hidden marks', words: ['scratch', 'symbol', 'sign', 'ocean'], oddIndex: 3},
  {title: 'Safe places', words: ['harbor', 'port', 'island', 'candle'], oddIndex: 3},
  {title: 'Water motion', words: ['tide', 'wave', 'current', 'key'], oddIndex: 3},
  {title: 'Small metal', words: ['coin', 'key', 'hook', 'fog'], oddIndex: 3},
  {title: 'Story items', words: ['journal', 'map', 'scroll', 'anchor'], oddIndex: 3},
  {title: 'Boat parts', words: ['sail', 'deck', 'hull', 'apple'], oddIndex: 3},
  {title: 'Danger signs', words: ['rocks', 'reef', 'wreck', 'note'], oddIndex: 3},
  {title: 'Places to land', words: ['beach', 'island', 'shore', 'lantern'], oddIndex: 3},
  {title: 'Control', words: ['wheel', 'rudder', 'course', 'sand'], oddIndex: 3},
  {title: 'Dark places', words: ['cave', 'hold', 'night', 'sail'], oddIndex: 3},
  {title: 'Sea clues', words: ['track', 'mark', 'signal', 'flower'], oddIndex: 3},
];
