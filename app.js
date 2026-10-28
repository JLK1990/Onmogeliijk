const $ = (id) => document.getElementById(id);
let cards = [];
let current = null;
let remaining = [];
let lastQuestion = null;
const questionRounds = new Map();
const pick = (items) => items[Math.floor(Math.random() * items.length)];

function showCard() {
  const options = cards.filter((card) => card !== current);
  current = pick(options.length ? options : cards);
  const round = questionRounds.get(current.id) || { remaining: [...current.questions], lastQuestion: null };
  remaining = round.remaining;
  lastQuestion = round.lastQuestion;
  $('status').textContent = '';
  $('card-label').hidden = !['placeholder', 'trial'].includes(current.status);
  $('card-image').src = current.image;
  $('card-image').alt = current.alt;
  $('card-number').textContent = `${String(cards.indexOf(current) + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
  $('intro').hidden = true;
  $('experience').hidden = false;
  $('question-panel').hidden = true;
  $('question').textContent = '';
  $('reveal').hidden = false;
  $('reveal').focus({ preventScroll: true });
}
function showQuestion() {
  if (!remaining.length) remaining = [...current.questions];
  const options = remaining.filter((question) => question !== lastQuestion);
  const question = pick(options.length ? options : remaining);
  remaining.splice(remaining.indexOf(question), 1);
  lastQuestion = question;
  questionRounds.set(current.id, { remaining, lastQuestion });
  $('question').textContent = question;
  $('reveal').hidden = true;
  $('question-panel').hidden = false;
  $('another').hidden = current.questions.length < 2;
  $('question').focus({ preventScroll: true });
}
$('start').addEventListener('click', showCard);
$('next').addEventListener('click', showCard);
$('reveal').addEventListener('click', showQuestion);
$('another').addEventListener('click', showQuestion);
$('card-image').addEventListener('error', () => {
  $('status').textContent = 'Het beeld kon niet worden geladen. Probeer de pagina opnieuw te laden.';
});
async function init() {
  try {
    const response = await fetch(new URL('./data/cards.json', import.meta.url));
    if (!response.ok) throw new Error('Kaarten niet beschikbaar');
    cards = await response.json();
    if (!Array.isArray(cards) || !cards.length || !cards.every((card) =>
      typeof card.id === 'string' && typeof card.image === 'string' &&
      typeof card.alt === 'string' && card.alt.trim() && Array.isArray(card.questions) &&
      card.questions.length && card.questions.every((q) => typeof q === 'string' && q.trim()) &&
      new Set(card.questions).size === card.questions.length)) throw new Error('Ongeldige kaarten');
    if (new Set(cards.map((card) => card.id)).size !== cards.length) throw new Error('Dubbele kaart-id');
    $('start').disabled = false;
    $('status').textContent = '';
  } catch {
    $('status').textContent = 'De kaarten konden niet worden geladen. Probeer de pagina opnieuw te laden.';
  }
}
init();
