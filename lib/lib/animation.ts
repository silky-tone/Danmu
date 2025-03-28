// lib/animation.ts;

import { Listener } from './listener';
import { getTime } from '../utils';

// TODO: 帧动画 - 方法
export const AnimationFrame = (function(win: any) {
  return window['requestAnimationFrame'] ||
    win['webkitRequestAnimationFrame'] ||
    win['mozRequestAnimationFrame'] ||
    win['oRequestAnimationFrame'] ||
    win['msRequestAnimationFrame'] ||
    (function() {
      let leftTime: number = 0;
      return function(callback: (timestamp: number) => void) {
        win.setTimeout(() => {
          callback(getTime() - leftTime);
        }, 1000 / 6);
      };
    })();
})(window) as ((func: (timestamp: number) => void) => void);

// TODO: 帧动画 - 类
export class Animation {
  // TODO: 帧
  private count: number = 0;

  // TODO: 限制帧数
  private __limit: number = 0;

  // TODO: 状态
  private status: boolean = false;

  // TODO: 上一次的时间
  private last = { fps: 0, records: 0 };

  // TODO: 监听器
  private listener: Listener<number> = new Listener();

  // TODO: 限制帧数
  get limit() {
    return this['__limit'];
  }

  // TODO: 限制帧数
  set limit(value: number) {
    if (isNaN(value)) throw new Error('FPS must be a number');
    if ([Infinity, -Infinity].includes(value)) throw new Error('FPS cannot be Infinity, set it to 0 if you need to remove the restriction');
    this['__limit'] = value;
  }

  constructor(limitFPS = 0) {
    this.limit = limitFPS;
    this.status = false;
  }

  private getFps() {
    const time = getTime();
    if (this.last.fps) {
      this.count += 1;
      if ((time - this.last.fps) > 1000) {
        this.listener.emit('FPS', this.count);
        this.last.fps = time;
        this.count = 1;
      }
    } else {
      this.count = 1;
      this.last.fps = time;
    }
  }

  // TODO: 实时帧数
  private getRecords() {
    const time = getTime();
    if (this.last && this.last.records !== time) {
      const fps = 1000 / (time - this.last.records);
      this.listener.emit('RealTimeFPS', parseFloat(fps.toFixed(1)));
    }
    this.last.records = time;
  }

  // TODO: 绑定事件
  public on(key: 'FPS' | 'RealTimeFPS', listener: (fps: number) => void) {
    if (!['FPS', 'RealTimeFPS'].includes(key)) throw new Error('Invalid listener type');
    this.listener.on(key, listener);
  }

  // TODO: 解绑事件
  public off(key: 'FPS' | 'RealTimeFPS', listener: (fps: number) => void) {
    if (!['FPS', 'RealTimeFPS'].includes(key)) throw new Error('Invalid listener type');
    this.listener.off(key, listener);
  }

  // TODO: 开始
  public run(listener: (timestamp: number) => void) {
    this.status = true;
    let last = getTime();
    const newListener = (timestamp: number = 0) => {
      if (!this.status) return;
      this.getFps();
      this.getRecords();
      if (this.limit) {
        AnimationFrame(newListener);
        const interval = 1000 / this.limit;
        setTimeout(() => listener(timestamp), interval - (getTime() - last) % interval);
      } else {
        listener(timestamp);
        AnimationFrame(newListener);
      }
    };
    AnimationFrame(newListener);
  }

  // TODO: 暂停，阻止下一帧的运行
  public stop() {
    this.status = false;
  }
}
