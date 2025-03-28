import { BarrageItem } from '../interface';

export abstract class BarrageBase<T extends HTMLElement> implements BarrageItem {
  protected readonly $el: T;
  abstract readonly duration: number;

  get height(): number {
    return this.$el.offsetHeight;
  }

  get width(): number {
    return this.$el.offsetWidth;
  }

  protected constructor(el: T) {
    this.$el = el;
  }
}
