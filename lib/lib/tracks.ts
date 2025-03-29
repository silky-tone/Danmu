// lib/tracks.ts

import { TracksOptions } from '../interface';

// TODO: 轨道管理
export class Tracks {
  private readonly gap: number;
  private readonly tracks: number;
  private readonly trackSize: number;
  private readonly size: { width: number; height: number };
  private occupied: Array<{ start: number, end: number }[]>;

  constructor({ width, height, trackSize = 20, tracks = undefined, gap = 0 }: TracksOptions) {
    this.size = { width, height };
    this.gap = gap || 0;
    if (tracks !== undefined) {
      this.tracks = tracks;
      this.trackSize = Math.round((height - (tracks - 1) * gap) / tracks);
    } else {
      this.trackSize = trackSize;
      this.tracks = Math.max(Math.floor((height + gap) / (trackSize + gap)), 1);
    }
    this.occupied = Array.from({ length: this.tracks }).map(() => []);
  }

  // TODO: 轨道转像素
  trackToPx(track: number): number {
    return track * (this.trackSize + this.gap);
  }

  // TODO: 清理
  prune(time?: number) {
    time = time || Date.now();
    this.occupied.forEach((track, index) => {
      this.occupied[index] = track.filter(({ end }) => end > time!);
    });
  }

  // TODO: 检查
  check(height: number): undefined | { index: number; count: number; } {
    const currentTime = Date.now();
    this.prune(currentTime);
    //
    const { tracks, trackSize, gap } = this;
    const count = Math.ceil(height / (trackSize + gap));
    if (tracks < count) return undefined;

    // TODO: 窗口滑动
    for (let index = 0, len = tracks - count; index < len; index += 1) {
      let active = 0;
      for (let i = 0; i < count; i += 1) {
        const occupied = this.occupied[index + i];
        if (!occupied.length) {
          active += 1;
        } else if (occupied[occupied.length - 1].end < currentTime) {
          active += 1;
        } else {
          index += i;
          active = 0;
          break;
        }
        if (active >= count) return { index, count };
      }
    }
    return undefined;
  }

  // TODO: 添加
  add(width: number, height: number, duration: number) {
    const track = this.check(height);
    if (!track) return false;
    //
    const start = Date.now();
    const delay = Math.ceil(width / (this.size.width / duration));
    const end = start + (duration + delay) * 1000;
    for (let i = 0; i < track.count; i++) {
      this.occupied[track.index + i].push({ start, end });
    }
    return true;
  }

  // TODO: 销毁
  destroy() {
    this.occupied = Array.from({ length: this.tracks }).map(() => []);
  }
}
