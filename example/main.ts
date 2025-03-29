import { Barrage, TextBarrage } from '../lib';

const barrage = new Barrage('#barrage', {
  trackSplit: 10,
});

const input = document.querySelector<HTMLInputElement>('#input')!;
const submit = document.querySelector<HTMLButtonElement>('#submit')!;

submit.addEventListener('click', onSubmit);

function onSubmit() {
  const val = (input['value'] || '').trim();
  if (!val) return alert('请输入内容');
  barrage.push(new TextBarrage(val, 3));
}
