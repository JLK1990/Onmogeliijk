import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
const source = (await readFile(new URL('../app.js', import.meta.url), 'utf8')).replace("new URL('./data/cards.json', import.meta.url)", "'cards.json'");
const cards = JSON.parse(await readFile(new URL('../data/cards.json', import.meta.url)));
async function setup(fail = false, fixture = cards) {
  const elements = new Map();
  const context = vm.createContext({
    document: { getElementById(id) {
      if (!elements.has(id)) elements.set(id, { hidden: ['experience', 'question-panel'].includes(id), disabled: id === 'start', textContent: '', handlers: {}, addEventListener(event, fn) { this.handlers[event] = fn; }, focus() { this.focused = true; } });
      return elements.get(id);
    } },
    fetch: async () => ({ ok: !fail, json: async () => structuredClone(fixture) }), URL,
  });
  vm.runInContext(source, context);
  await new Promise(setImmediate);
  const el = (id) => elements.get(id);
  const click = (id) => el(id).handlers.click();
  return { el, click };
}
test('complete flow, non-repeating cards and question rounds', async () => {
  const { el, click } = await setup();
  assert.equal(el('start').disabled, false);
  click('start');
  assert.equal(el('intro').hidden, true);
  assert.equal(el('experience').hidden, false);
  const history = new Map();
  function record(card, question) {
    let seen = history.get(card.id) || new Set();
    if (seen.size === card.questions.length) seen = new Set();
    assert.ok(!seen.has(question), "question repeated before all questions were used");
    seen.add(question);
    history.set(card.id, seen);
  }
  for (let round = 0; round < 30; round++) {
    assert.equal(el('question-panel').hidden, true);
    assert.equal(el('reveal').hidden, false);
    const image = el('card-image').src;
    const card = cards.find((c) => c.image === image);
    click('reveal');
    assert.equal(el('reveal').hidden, true);
    assert.equal(el('question-panel').hidden, false);
    for (let q = 0; q < card.questions.length; q++) {
      if (q) click('another');
      const question = el('question').textContent;
      assert.ok(card.questions.includes(question));
      record(card, question);
    }
    const last = el('question').textContent;
    click('another');
    assert.notEqual(el('question').textContent, last);
    record(card, el('question').textContent);
    click('next');
    assert.notEqual(el('card-image').src, image);
  }
});
test('failed card load leaves start unavailable and explains failure', async () => {
  const { el } = await setup(true);
  assert.equal(el('start').disabled, true);
  assert.match(el('status').textContent, /niet worden geladen/);
});
test('all fifteen artworks are valid WebP files with accessible descriptions', async () => {
  assert.equal(cards.length, 15);
  assert.equal(new Set(cards.map((c) => c.id)).size, 15);
  for (const card of cards) {
    assert.ok(['trial', 'approved'].includes(card.status));
    assert.ok(card.alt.length > 40);
    assert.match(card.source, /AI-gegenereerd/);
    const bytes = await readFile(new URL(`../${card.image}`, import.meta.url));
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
    assert.ok(bytes.length < 500_000, 'image must stay below 500 KB');
  }
});

test('rejects external and ambiguous image paths before enabling the app', async () => {
  const unsafePaths = [
    'https://example.com/photo.webp', '//example.com/photo.webp',
    'data:image/svg+xml,<svg/>', 'javascript:alert(1)',
    '/assets/photo.webp', '../assets/photo.webp', 'assets/../photo.webp',
    'assets/sub/photo.webp', 'assets/%2e%2e/photo.webp',
    'assets/photo.webp?tracking=1', 'assets/photo.webp#fragment',
    'assets/photo%2ewebp', 'assets/photo.html', 'assets/photo.webp/extra',
    'assets/\\photo.webp', ' assets/photo.webp', 'assets/photo.webp\n',
  ];
  for (const image of unsafePaths) {
    const fixture = structuredClone(cards);
    fixture[0].image = image;
    const { el } = await setup(false, fixture);
    assert.equal(el('start').disabled, true, JSON.stringify(image));
    assert.match(el('status').textContent, /niet worden geladen/);
  }
});
