#!/usr/bin/env node
/**
 * Blocks reintroduction of obfuscated malware in critical config files.
 * Run via: npm run verify:config-security
 */
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');

const WATCHED_FILES = ['postcss.config.mjs', 'next.config.ts', 'eslint.config.mjs'];

const MAX_BYTES = {
  'postcss.config.mjs': 1126,
  'eslint.config.mjs': 1393,
  'next.config.ts': 255,
};

const FORBIDDEN_PATTERNS = [
  // Known supply-chain payload signature (e.g. global['!'] = require).
  { name: 'global malware marker', regex: /global\s*\[\s*['"]!['"]\s*\]/ },
  // Hex-named identifiers from JS obfuscators (_0x1a2b, etc.).
  { name: 'hex obfuscation', regex: /_0x[0-9a-f]{4,}/i },
  // Runtime execution of arbitrary strings; never needed in config files.
  { name: 'eval()', regex: /\beval\s*\(/ },
  // Same risk as eval: builds and runs code from a string at runtime.
  { name: 'Function constructor', regex: /new\s+Function\s*\(/ },
  // Decodes hidden payloads byte-by-byte instead of plain string literals.
  { name: 'fromCharCode obfuscation', regex: /fromCharCode/ },
];

const POSTCSS_REQUIRED = ['export default', '@tailwindcss/postcss'];

function fail(message) {
  console.error(`\n[config-security] ${message}\n`);
  process.exit(1);
}

function verifyFile(relativePath) {
  const absolutePath = path.join(ROOT, relativePath);

  if (!fs.existsSync(absolutePath)) {
    fail(`Missing watched file: ${relativePath}`);
  }

  const content = fs.readFileSync(absolutePath, 'utf8');
  const size = Buffer.byteLength(content, 'utf8');
  const maxBytes = MAX_BYTES[relativePath];

  if (maxBytes && size > maxBytes) {
    fail(`${relativePath} is ${size} bytes (max ${maxBytes}). Possible injected payload.`);
  }

  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.regex.test(content)) {
      fail(`${relativePath} matched forbidden pattern: ${pattern.name}`);
    }
  }

  if (relativePath === 'postcss.config.mjs') {
    for (const snippet of POSTCSS_REQUIRED) {
      if (!content.includes(snippet)) {
        fail(`${relativePath} must include "${snippet}"`);
      }
    }

    if (/export\s+default[\s\S]*export\s+default/.test(content)) {
      fail(`${relativePath} contains duplicate export default blocks`);
    }
  }

  console.log(`\x1b[32m[config-security] OK ${relativePath} (${size} bytes)\x1b[0m`);
}

for (const file of WATCHED_FILES) {
  verifyFile(file);
}

console.log('\x1b[32m[config-security] All watched config files passed.\x1b[0m');
