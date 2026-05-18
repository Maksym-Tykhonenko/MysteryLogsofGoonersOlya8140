export type PirateFact = {
  id: string;
  text: string;
};

const factTexts = [
  'Pirates were not always criminals - many started as sailors or soldiers.',
  'Many pirate crews had their own set of rules, similar to a code.',
  'Captains were often chosen by the crew, not assigned.',
  'Loot was usually shared among all crew members.',
  'Injured pirates could receive extra shares for lost limbs.',
  "Pirates didn't always attack - sometimes they avoided danger.",
  "They didn't always raise the black flag immediately - sometimes they used deception first.",
  'Pirates wore jewelry not just for style, but as emergency value they could carry.',
  'Music was common on ships to keep morale high.',
  'Some pirates were highly educated and skilled in navigation.',
  'Pirates often switched ships if they found a better one.',
  'Not all pirates were men - women also sailed as pirates.',
  'Many pirate legends are exaggerated or fictional.',
  'Pirates used signals and gestures to communicate over distance.',
  'They understood ocean currents and used them to move faster.',
  'Some pirates worked as private hunters for ships under contracts.',
  'Every crew member had a specific role on board.',
  'Fear was often their main weapon, not force.',
  'Pirates often attacked at night or in fog.',
  'They treated injuries directly on board with basic methods.',
  'Ships could be repaired even in the middle of the sea.',
  'Pirates sometimes left marks or symbols in certain places.',
  'They could navigate using stars without tools.',
  'Some items were hidden not as treasure, but to reduce weight.',
  'Pirate ships were often faster than military ships.',
  'Pirates sometimes changed their appearance to avoid recognition.',
  'They could stay at sea for very long periods without returning to land.',
  'Pirates sometimes cooperated instead of fighting each other.',
  'Stories about cursed places often came from pirate tales.',
  'The most dangerous thing for pirates was often other people, not the sea.',
];

export const pirateFacts: PirateFact[] = factTexts.map((text, index) => ({
  id: `fact-${index + 1}`,
  text,
}));
