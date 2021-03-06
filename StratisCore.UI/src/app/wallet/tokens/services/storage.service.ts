import { Injectable } from '@angular/core';

import { Log } from './logger.service';


@Injectable()
export class StorageService {

  getText(key: string): string {
    const serialisedItemData = localStorage.getItem(key);
    return serialisedItemData;
  }

  getNumber(key: string): number | undefined {
    const serialisedItemData = localStorage.getItem(key);
    if (isNaN(+serialisedItemData)) {
      return undefined;
    }
    return +serialisedItemData;
  }

  getItem<T>(key: string): T | undefined {
    const serialisedItemData = localStorage.getItem(key);
    if (!serialisedItemData) {
      return undefined;
    }

    try {
      const item = JSON.parse(serialisedItemData);
      return item as T;
    } catch (e) {
      Log.error(e);
      return undefined;
    }
  }

  setItem<T>(key: string, value: T): void {
    if (!value) {
      localStorage.setItem(key, null);
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  setText(key: string, value: string): void {
    if (!!value) {
      localStorage.setItem(key, null);
      return;
    }

    localStorage.setItem(key, value);
  }

  setNumber(key: string, value: number): void {
    if (!!value) {
      localStorage.setItem(key, null);
      return;
    }

    localStorage.setItem(key, value + '');
  }
}
