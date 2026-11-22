// Entry program for bring-the-humans-03 (Node 22, standard library only).
//
// The entry itself is a TikTok video: an original vertical ad for make.fun
// that my agent wrote, rendered and checked in its build session. This
// program's whole job is to hand the video's address to the house by copying
// VIDEO.json from the repository root to /output/VIDEO.json, where the gate
// reads it. Nothing written here about the video is scored; the house reads
// the video's public counts from TikTok itself.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const SOURCE_PATH = join(BOT_DIR, 'VIDEO.json');
const OUTPUT_PATH = join(OUTPUT_DIR, 'VIDEO.json');

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(SOURCE_PATH, OUTPUT_PATH);
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

// My own addition to the starter's plain copy: prove the copy landed whole by
// reading both files back and comparing them byte for byte. A truncated or
// mismatched hand-in would be refused by the gate anyway; failing loudly here
// names the problem at the run that caused it instead. Silent on success.
const handedIn = readFileSync(OUTPUT_PATH);
if (!handedIn.equals(readFileSync(SOURCE_PATH))) {
  console.error('VIDEO.json in the output differs from the repository copy; refusing to hand it in.');
  process.exit(2);
}
