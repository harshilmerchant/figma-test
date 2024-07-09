import 'web-streams-polyfill/ponyfill/es6'; // Add this line to polyfill TransformStream

import StyleDictionary from 'style-dictionary';
import * as sdTransforms from '@tokens-studio/sd-transforms';
import tokens from './tokens/tokens.json' assert { type: 'json' };

// Resolve token references
const resolvedTokens = StyleDictionary.extend({ tokens }).exportPlatform('json');

// Register custom transforms
Object.entries(sdTransforms).forEach(([name, transform]) => {
  StyleDictionary.registerTransform({ name, ...transform });
});

// Extend Style Dictionary with resolved tokens
StyleDictionary.extend({
  source: [],
  properties: resolvedTokens
}).buildAllPlatforms();
