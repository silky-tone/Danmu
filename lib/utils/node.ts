// utils/node.ts;

import { isArray, isObject, isString } from './object.ts';

// TODO: 样式处理
function handlerStyle(style: string | Record<string, string>) {
  if (isString(style)) return style;
  return Object.keys(style).reduce((prev: string[], curr) => {
    prev.push(`${curr}:${style[curr]};`);
    return prev;
  }, []).join('');
}

// TODO: class处理
function handlerClass(className: string | Array<string> | Record<string, boolean>) {
  if (isArray(className)) return className.filter(Boolean).join(' ');
  if (isObject(className) && !isString(className)) {
    return Object.keys(className).reduce((prev: string[], curr) => {
      if (className[curr]) prev.push(curr);
      return prev;
    }, []).join(' ');
  }
  return className;
}

// TODO: 绑定事件
function handlerBindOn(dom: HTMLElement, on: Record<string, Function>) {
  for (const [key, value] of Object.entries(on)) {
    // @ts-ignore
    dom.addEventListener(key, value);
  }
}

// TODO: 创建 dom
export function VNode(tag: string, props: Record<string, any> = {}, children: Array<string | HTMLElement> = []) {
  const dom = document.createElement(tag);
  // TODO: 处理 props
  for (const [key, value] of Object.entries(props)) {
    if (key === 'style') {
      dom.style.cssText = handlerStyle(value);
    } else if (key === 'class') {
      dom.className = handlerClass(value);
    } else if (key === 'on') {
      handlerBindOn(dom, value);
    } else {
      dom.setAttribute(key, value);
    }
  }
  // TODO: 处理子元素
  if (children.length) {
    const newChildren = children.map(child => {
      if (isString(child)) return document.createTextNode(child);
      return child;
    });
    // TODO:  2020-10-21 实现该方法
    dom.replaceChildren(...newChildren);
  }
  //
  return dom;
}
