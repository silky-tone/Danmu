// interface/barrageItem.ts

import { EventListener } from '../lib/listener';

// TODO: 弹幕事件
export type BarrageItemKey = 'create' | 'load' | 'move' | 'destroy';

// TODO: 弹幕接口
export interface BarrageItem {
  // TODO: 弹幕元素
  $el: HTMLElement;

  // TODO: 弹幕尺寸
  width: number;

  // TODO: 弹幕尺寸
  height: number;

  // TODO: 弹幕显示时长
  duration: number;

  // TODO: 销毁
  destroy(): void;

  on(key: BarrageItemKey, listener: EventListener<any>): void;

  off(key: BarrageItemKey, listener: EventListener<any>): void;

  once(key: BarrageItemKey, listener: EventListener<any>): void;
}
