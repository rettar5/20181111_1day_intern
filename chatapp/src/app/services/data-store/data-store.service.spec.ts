import { TestBed } from '@angular/core/testing';

import { DataStoreService, LocalStorageKey } from './data-store.service';

describe('DataStoreService', () => {
  const str = Math.floor(Math.random() * 10000).toString();
  const obj = { str: str, ary: [ str ] };
  const lang = 'en';
  const strKey: LocalStorageKey = (LocalStorageKey.prefix + '.test.str') as LocalStorageKey;
  const objKey: LocalStorageKey = (LocalStorageKey.prefix + '.test.obj') as LocalStorageKey;

  beforeEach(() => TestBed.configureTestingModule({}));

  describe('setItem()', () => {
    it('文字列がローカルストレージに保存できること', () => {
      DataStoreService.setItem(strKey, str);
      expect(localStorage.getItem(strKey)).toBe(str);
    });

    it('オブジェクトがローカルストレージに保存できること', () => {
      DataStoreService.setItem(objKey, JSON.stringify(obj));
      expect(localStorage.getItem(objKey)).toBe(JSON.stringify(obj));
    });
  });

  describe('getItem()', () => {
    // TODO: ローカルストレージに保存された文字列が取得できること

    // TODO: ローカルストレージに保存されたオブジェクトが取得できること
  });

  describe('removeItem()', () => {
    // TODO: ローカルストレージに保存された文字列が削除できること

    // TODO: ローカルストレージに保存されたオブジェクトが削除できること
  });

  describe('clear()', () => {
    it('ローカルストレージに保存された文字列が削除できること', () => {
      DataStoreService.setItem(strKey, str);
      const step1st = DataStoreService.getItem(strKey);
      expect(step1st).toBe(str);
      DataStoreService.clear();
      const step2nd = DataStoreService.getItem(strKey);
      expect(step2nd).toBeNull();
    });

    it('ローカルストレージに保存されたオブジェクトが削除できること', () => {
      DataStoreService.setItem(objKey, JSON.stringify(obj));
      const step1st = DataStoreService.getItem(objKey);
      expect(step1st).toBe(JSON.stringify(obj));
      DataStoreService.clear();
      const step2nd = DataStoreService.getItem(objKey);
      expect(step2nd).toBeNull();
    });

    it('ローカルストレージのクリア時に、言語設定が削除されないこと', () => {
      DataStoreService.setItem(strKey, str);
      DataStoreService.setItem(LocalStorageKey.lang, lang);
      expect(DataStoreService.getItem(strKey)).toBe(str);
      expect(DataStoreService.getItem(LocalStorageKey.lang)).toBe(lang);

      DataStoreService.clear();
      expect(DataStoreService.getItem(strKey)).toBeNull();
      expect(DataStoreService.getItem(LocalStorageKey.lang)).toBe(lang);
    });
  });
});
