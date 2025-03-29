// core/barrage.ts

import { BarrageItem, BarrageOptions } from '../interface';
import { mergeObject } from '../utils';
import { Tracks } from '../lib';

// TODO: 弹幕管理
export class Barrage {
  private readonly tracks: Tracks;
  private readonly $el: HTMLElement;
  private readonly opt: Record<string | number, any>;

  // TODO: 移动区
  private moveTracks: BarrageItem[] = [];

  // TODO: 等待区
  private waitTracks: BarrageItem[] = [];

  constructor(element: HTMLElement | string, options?: Partial<BarrageOptions>) {
    this.opt = mergeObject({}, options || {});
    this.$el = this.createElement(element);
    this.tracks = new Tracks({
      ...this.opt,
      width: this.$el.clientWidth,
      height: this.$el.clientHeight,
    });
  }

  createElement(element: HTMLElement | string) {
    const el = (() => {
      if (typeof element === 'string') {
        const el = document.querySelector<HTMLElement>(element);
        if (!el) throw new Error('element not found');
        return el;
      } else {
        return element;
      }
    })();
    //
    el.innerHTML = '';
    el.style.width = '100%';
    el.style.height = '100%';
    el.style.overflow = 'hidden';
    el.style.userSelect = 'none';
    el.style.position = 'relative';
    el.style.pointerEvents = 'none';
    //
    return el;
  }

  push(item: BarrageItem): void {
    const el = item.$el;
    //
    el.style.transform = `translateX(0)`;
    el.style.willChange = 'transform';
    el.style.position = 'absolute';
    el.style.left = '100%';
    el.style.top = '0';
    // TODO: 将弹幕挂载到等待区
    this.$el.appendChild(item.$el);
    //
    if (this.tracks.findAvailableTracks(item.height)) {
      this.moveTracks.push(item);
    } else {
      this.waitTracks.push(item);
    }
  }
}
