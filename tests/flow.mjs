import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
const source = (await readFile(new URL('../app.js', import.meta.url), 'utf8')).replace("new URL('./data/cards.json', import.meta.url)", "'cards.json'");
const cards = JSON.parse(await readFile(new URL('../data/cards.json', import.meta.url)));
async function setup(fail = false) {
  const elements = new Map();
  const context = vm.createContext({
    document: { getElementById(id) {
      if (!elements.has(id)) elements.set(id, { hidden: ['experience', 'question-panel'].includes(id), disabled: id === 'start', textContent: '', handlers: {}, addEventListener(event, fn) { this.handlers[event] = fn; }, focus() { this.focused = true; } });
      return elements.get(id);
    } },
    fetch: async () => ({ ok: !fail, json: async () => structuredClone(cards) }), URL,
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
  for (let round = 0; round < 30; round++) {
    assert.equal(el('question-panel').hidden, true);
    assert.equal(el('reveal').hidden, false);
    const image = el('card-image').src;
    const card = cards.find((c) => c.image === image);
    const seen = new Set();
    click('reveal');
    assert.equal(el('reveal').hidden, true);
    assert.equal(el('question-panel').hidden, false);
    for (let q = 0; q < card.questions.length; q++) {
      if (q) click('another');
      const question = el('question').textContent;
      assert.ok(card.questions.includes(question));
      assert.ok(!seen.has(question));
      seen.add(question);
    }
    const last = el('question').textContent;
    click('another');
    assert.notEqual(el('question').textContent, last);
    click('next');
    assert.notEqual(el('card-image').src, image);
  }
});
test('failed card load leaves start unavailable and explains failure', async () => {
  const { el } = await setup(true);
  assert.equal(el('start').disabled, true);
  assert.match(el('status').textContent, /niet worden geladen/);
});
test('all three original placeholders exist and have accessible descriptions', async () => {
  assert.equal(cards.length, 3);
  assert.equal(new Set(cards.map((c) => c.id)).size, 3);
  for (const card of cards) {
    assert.ok(card.alt.startsWith('Tijdelijke illustratie:'));
    assert.match(await readFile(new URL(`../${card.image}`, import.meta.url), 'utf8'), /<svg/);
  }
});
