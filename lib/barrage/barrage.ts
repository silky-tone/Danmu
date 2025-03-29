// barrage/barrage.ts

import { BarrageItem } from '../interface';
import { Listener } from '../lib';

// TODO: 弹幕基类
export abstract class BarrageBase<T extends HTMLElement> implements BarrageItem {
  abstract readonly duration: number;
  protected readonly listener: Listener;

  get height(): number {
    return this.$el.offsetHeight;
  }

  get width(): number {
    return this.$el.offsetWidth;
  }

  readonly $el: T;

  protected constructor(el: T) {
    this.$el = el;
    this.listener = new Listener();
  }

  destroy() {
    this.$el.remove();
  }

  on(key: string, listener: (data: any) => void) {
    this.listener.on(key, listener);
  }

  off(key: string, listener: (data: any) => void) {
    this.listener.off(key, listener);
  }

  once(key: string, listener: (data: any) => void) {
    this.listener.once(key, listener);
  }
}
