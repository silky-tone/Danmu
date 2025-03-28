// utils/object.ts;

// TODO: 获取类型
export function getType(target: any): string {
  return Object.prototype.toString.call(target).slice(8, -1);
}

// TODO: 判断类型
export function isType(target: any, type: string): boolean {
  return getType(target).toLowerCase() === type.toLowerCase();
}

// TODO: 判断数组
export function isArray(target: any): target is Array<any> {
  return isType(target, 'array');
}

// TODO: 判断对象
export function isObject(target: any): target is Object {
  if (isFunction(target)) return false;
  return isType(target, 'object');
}

// TODO: 判断函数
export function isFunction(target: any): target is Function {
  return isType(target, 'function');
}

// TODO: 判断字符串
export function isString(target: any): target is string {
  return isType(target, 'string');
}

// TODO: 判断数字
export function isNumber(target: any): target is number {
  return isType(target, 'number');
}

// TODO: 判断布尔值
export function isBoolean(target: any): target is boolean {
  return isType(target, 'boolean');
}

// TODO: 判断空对象
export function isEmpty(target: any): boolean {
  if (['', null, undefined].includes(target)) return true;
  return (isArray(target) ? target : Object.keys(target)).length === 0;
}

// TODO: 合并对象
export function mergeObject(target: Record<string | number, any>, ...sources: Array<Record<string | number, any>>) {
  return sources.reduce((prev, curr) => {
    if (isEmpty(curr)) return prev;
    for (const [key, value] of Object.entries(curr)) {
      const prevValue = prev[key];
      if (isObject(value)) {
        if (isObject(prevValue)) {
          prev[key] = mergeObject(prevValue, value);
        } else {
          prev[key] = value;
        }
      } else {
        prev[key] = value;
      }
    }
    return prev;
  }, { ...target });
}
