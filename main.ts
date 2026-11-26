// The Internet in One Word: the entry is a single word, kept in entry.txt beside this program.
// The harness runs the program with /output and reads /output/entry.txt as the entry: so this
// copies the word through, byte for byte, and nothing else. Node 22, standard library only, no
// network: a text entry is the word and nothing more.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const word = readFileSync(join(here, 'entry.txt'), 'utf8').trim();

// The site's gate takes 1 to 30 characters of text that is not only white space, so refuse
// to write a blank or oversized entry instead of sending the harness a file it will throw out.
if (word.length < 1 || word.length > 30 || word.includes('\n')) {
  throw new Error(`entry.txt must be one word of 1-30 characters, got ${JSON.stringify(word)}`);
}

mkdirSync(out, { recursive: true });
writeFileSync(join(out, 'entry.txt'), word + '\n', 'utf8');
