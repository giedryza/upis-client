import { APP } from 'config/app';
import { isServer } from 'tools/common';

class Axe {
  private get isAvailable() {
    return !isServer() && APP.env === 'development';
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
