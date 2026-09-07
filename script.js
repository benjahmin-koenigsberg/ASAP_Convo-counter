const STORAGE_KEY = 'asapConversationCounterV1';
const categories = ['meatEater','vegetarian','vegan','receptive','committed'];
const dietKeys = new Set(['meatEater','vegetarian','vegan']);
const labels = { meatEater:'Meat Eater', vegetarian:'Vegetarian', vegan:'Vegan', receptive:'Receptive', committed:'Committed to Go Vegan' };

function freshState(){ return { counts:{meatEater:0,vegetarian:0,vegan:0,receptive:0,committed:0}, history:[], campus:'', person:'' }; }
function load(){ try { return {...freshState(), ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')}; } catch { return freshState(); } }
let state = load();

function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

// function total(){ return state.counts.meatEater + state.counts.vegetarian + state.counts.vegan; }

function total(){
  return state.counts.meatEater
    + state.counts.vegetarian
    + state.counts.vegan
    + state.counts.receptive

function render(){
  categories.forEach(k => document.getElementById(k+'Count').textContent = state.counts[k] || 0);
  document.getElementById('totalCount').textContent = total();
  document.getElementById('campusInput').value = state.campus || '';
  document.getElementById('personInput').value = state.person || '';
  document.getElementById('undoBtn').disabled = state.history.length === 0;
}
function tap(key){
  state.counts[key] = (state.counts[key] || 0) + 1;
  state.history.push({key, at:new Date().toISOString()});
  save(); render();
  if (navigator.vibrate) navigator.vibrate(20);
}

document.querySelectorAll('.counter').forEach(btn => btn.addEventListener('click', () => tap(btn.dataset.key)));
document.getElementById('undoBtn').addEventListener('click', () => {
  const last = state.history.pop(); if (!last) return;
  state.counts[last.key] = Math.max(0, (state.counts[last.key] || 0) - 1); save(); render();
});
document.getElementById('resetBtn').addEventListener('click', () => {
  if (!confirm('Reset all counts and tap history?')) return;
  const campus = state.campus, person = state.person; state = freshState(); state.campus=campus; state.person=person; save(); render();
});
['campusInput','personInput'].forEach(id => document.getElementById(id).addEventListener('input', e => {
  state[id === 'campusInput' ? 'campus' : 'person'] = e.target.value; save();
}));

document.getElementById('exportBtn').addEventListener('click', () => {
  const rows = [['Date','Campus','Outreach Person','Total Conversations','Meat Eater','Vegetarian','Vegan','Receptive','Committed to Go Vegan'],
    [new Date().toLocaleDateString(), state.campus, state.person, total(), ...categories.map(k => state.counts[k])]];
  const csv = rows.map(r => r.map(v => '"'+String(v ?? '').replaceAll('"','""')+'"').join(',')).join('\n');
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8'}); const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download='asap-conversation-counts-'+new Date().toISOString().slice(0,10)+'.csv'; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

document.getElementById('dateLabel').textContent = new Date().toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'});
render();
