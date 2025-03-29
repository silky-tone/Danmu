// barrage/text.ts

import { BarrageBase } from './barrage.ts';
import { VNode } from '../utils';

// TODO: 文本弹幕
export class TextBarrage extends BarrageBase<HTMLDivElement> {
  readonly duration: number;

  constructor(text: string, duration = 3) {
    super(VNode('div', {
      class: 'var-barrage-item is-text',
      style: { display: 'inline-block' },
    }, [
      VNode('span', {}, [text]),
    ]) as HTMLDivElement);
    //
    this.duration = duration;
  }
}
