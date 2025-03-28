// utils/index.ts;

export * from './object';
export * from './node';

// TODO: 获取时间
export const getTime = () => window.performance?.now() || Date.now();
