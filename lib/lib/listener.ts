// lib/listener.ts;

// TODO: 监听器类型
export type EventListener<T> = (data: T) => void;

// TODO: 监听器
export class Listener<T = any> {
  // TODO: 事件
  private listener: Record<string, EventListener<T>[]> = {};

  // TODO: 监听
  public on(key: string, listener: EventListener<T>) {
    if (!this.listener[key]) {
      this.listener[key] = [];
    }
    this.listener[key].push(listener);
  }

  // TODO: 取消监听
  public off(key: string, listener: EventListener<T>) {
    if (!this.listener[key]) return;
    this.listener[key] = this.listener[key].filter((item) => {
      return item !== listener;
    });
  }

  // TODO: 触发
  public emit(key: string, data: T) {
    if (!this.listener[key]) return;
    this.listener[key].forEach((item) => {
      item(data);
    });
  }

  // TODO: 监听一次
  public once(key: string, listener: EventListener<T>) {
    const onceListener = (data: T) => {
      this.off(key, onceListener);
      listener(data);
    };
    this.on(key, onceListener);
  }

  // TODO: 清空
  public clear() {
    this.listener = {};
  }
}
