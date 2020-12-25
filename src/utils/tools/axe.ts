import { isServer } from 'utils/common/is-server';

class Axe {
  get isAvailable() {
    return !isServer() && process.env.NODE_ENV === 'development';
  }

  private start = async () => {
    const React = (await import('react')).default;
    const ReactDOM = (await import('react-dom')).default;
    const axeCore = (await import('@axe-core/react')).default;
    const debounce = 1000;
    const config = {};

    axeCore(React, ReactDOM, debounce, config);
  };

  init = () => {
    if (this.isAvailable) {
      this.start();
    }
  };
}

export const axe = new Axe();
